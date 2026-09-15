import tedallalyRaw from '../tedallaly_data.json';
import { Salon, Service, Category, Booking, User, Staff, Review } from '../types.ts';

export interface TedallalyStoreState {
  salons: Salon[];
  services: Service[];
  categories: Category[];
  bookings: Booking[];
  users: User[];
  staff: Staff[];
  reviews: Review[];
  activeSalonId: string;
}

const rawData = tedallalyRaw as unknown as {
  salons?: Salon[];
  services?: Service[];
  categories?: Category[];
  bookings?: Booking[];
  users?: User[];
  staff?: Staff[];
  reviews?: Review[];
};

export const initialSalons: Salon[] = (rawData.salons || []).map(s => ({
  ...s,
  // Ensure salons have a presentable status for browsing
  status: s.status === 'suspended' ? 'verified' : s.status,
  isActive: true,
}));

export const initialServices: Service[] = rawData.services || [];
export const initialCategories: Category[] = rawData.categories || [];
export const initialBookings: Booking[] = rawData.bookings || [];
export const initialUsers: User[] = rawData.users || [];
export const initialStaff: Staff[] = rawData.staff || [];
export const initialReviews: Review[] = rawData.reviews || [];
