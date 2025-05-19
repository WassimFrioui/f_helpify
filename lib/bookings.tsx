// lib/bookings.ts
import api from './axios';

export async function createBooking(data: {
  serviceId: number;
  bookingTime: string; 
  additionalInfo: string;
}) {
  const res = await api.post('/bookings', data);
  return res.data;
}

export async function getClientBookings() {
  const res = await api.get('/bookings/client');
  return res.data;
}

export async function getProviderBookings() {
  const res = await api.get('/bookings/provider');
  return res.data;
}

export async function updateBookingStatus(id: number, status: string) {
  const res = await api.put(`/bookings/${id}/status`, { status });
  return res.data;
}


export async function deleteBooking(id: number) {
  const res = await api.delete(`/bookings/${id}`);
  return res.data;
}