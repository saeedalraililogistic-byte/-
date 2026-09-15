export interface Salon {
  _id: string;
  _creationTime: number;
  salonName: string;
  slug: string;
  city: string;
  district?: string;
  address?: string;
  description?: string;
  phone?: string;
  status: 'verified' | 'draft' | 'suspended' | string;
  averageRating?: number;
  totalReviews?: number;
  totalBookings?: number;
  isActive: boolean;
  ownerId?: string;
  acceptsOnlinePayment?: boolean;
}

export interface Service {
  _id: string;
  salonId: string;
  categoryId?: string;
  name: string;
  nameAr?: string;
  price: number;
  currency: string;
  durationMins: number;
  isActive: boolean;
  isAvailableOnline?: boolean;
  isHomeService?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  nameAr?: string;
  slug: string;
  icon?: string;
}

export interface Booking {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentEndTime?: string;
  customerId: string;
  salonId: string;
  serviceId: string;
  staffId?: string;
  status: 'completed' | 'confirmed' | 'payment_pending' | 'cancelled' | string;
  snapshot?: {
    salonName?: string;
    serviceName?: string;
    staffName?: string;
    totalAmount?: number;
    currency?: string;
    taxAmount?: number;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'salon_owner' | 'admin' | string;
  city?: string;
  isActive: boolean;
}

export interface Staff {
  _id: string;
  salonId: string;
  name: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
}

export interface Review {
  _id: string;
  salonId: string;
  rating: number;
  comment?: string;
  customerName?: string;
  _creationTime: number;
}
