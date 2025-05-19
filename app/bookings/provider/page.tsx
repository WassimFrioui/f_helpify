'use client';

import { useEffect, useState } from 'react';
import { getProviderBookings, updateBookingStatus } from '@/lib/bookings';

type Booking = {
  id: number;
  serviceTitle: string;
  clientName: string;
  bookingTime: string;
  status: string;
  additionalInfo: string;
};

export default function ProviderBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    getProviderBookings().then(setBookings);
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await updateBookingStatus(id, status);
    const updated = await getProviderBookings();
    setBookings(updated);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Réservations reçues</h1>
      <ul className="space-y-4">
        {bookings.map(b => (
          <li key={b.id} className="border p-4 rounded shadow-sm">
            <p><strong>Client :</strong> {b.clientName}</p>
            <p><strong>Service :</strong> {b.serviceTitle}</p>
            <p><strong>Date :</strong> {new Date(b.bookingTime).toLocaleString()}</p>
            <p><strong>Statut :</strong> {b.status}</p>
            <p><strong>Infos :</strong> {b.additionalInfo}</p>

            {b.status === 'PENDING' && (
              <div className="mt-2 space-x-2">
                <button onClick={() => updateStatus(b.id, 'ACCEPTED')} className="bg-green-600 text-white px-3 py-1 rounded">Accepter</button>
                <button onClick={() => updateStatus(b.id, 'REJECTED')} className="bg-red-600 text-white px-3 py-1 rounded">Refuser</button>
              </div>
            )}
            {b.status === 'ACCEPTED' && (
              <button onClick={() => updateStatus(b.id, 'COMPLETED')} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Marquer comme terminé</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
