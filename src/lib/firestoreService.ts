import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase.ts';
import { Salon, Service, Booking } from '../types.ts';

// Save or sync a booking to Firestore
export async function syncBookingToFirestore(booking: Booking): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', booking._id);
    await setDoc(bookingRef, {
      ...booking,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log(`Synced booking ${booking._id} to Firestore`);
  } catch (err) {
    console.error('Failed to sync booking to Firestore:', err);
  }
}

// Update booking status in Firestore
export async function updateBookingStatusInFirestore(bookingId: string, status: string): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error(`Failed to update booking ${bookingId} in Firestore:`, err);
  }
}

// Save or sync a new service to Firestore
export async function syncServiceToFirestore(service: Service): Promise<void> {
  try {
    const serviceRef = doc(db, 'services', service._id);
    await setDoc(serviceRef, {
      ...service,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log(`Synced service ${service._id} to Firestore`);
  } catch (err) {
    console.error('Failed to sync service to Firestore:', err);
  }
}

// Seed initial database collections into Firestore (Salons, Services, Bookings)
export async function seedInitialDataToFirestore(
  salons: Salon[], 
  services: Service[], 
  bookings: Booking[]
): Promise<{ success: boolean; count: number }> {
  try {
    let count = 0;

    // Seed salons
    for (const salon of salons) {
      await setDoc(doc(db, 'salons', salon._id), {
        ...salon,
        syncedAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    // Seed services
    for (const srv of services) {
      await setDoc(doc(db, 'services', srv._id), {
        ...srv,
        syncedAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    // Seed bookings
    for (const bkg of bookings) {
      await setDoc(doc(db, 'bookings', bkg._id), {
        ...bkg,
        syncedAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }

    return { success: true, count };
  } catch (err) {
    console.error('Error seeding data to Firestore:', err);
    throw err;
  }
}
