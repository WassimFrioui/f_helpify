'use client';

import { useEffect, useState } from 'react';
import { getClientBookings, deleteBooking } from '@/lib/bookings';

type Booking = {
  id: number;
  serviceTitle: string;
  providerName: string;
  bookingTime: string;
  status: string;
  additionalInfo: string;
};

export default function ClientBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    getClientBookings().then(setBookings);
    deleteBooking(1).then(() => {
      setBookings(prevBookings => prevBookings.filter(b => b.id !== 1));
    });
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Mes réservations</h1>
      <ul className="space-y-4">
        {bookings.map(b => (
          <li key={b.id} className="border p-4 rounded shadow-sm">
            <p><strong>Service :</strong> {b.serviceTitle}</p>
            <p><strong>Prestataire :</strong> {b.providerName}</p>
            <p><strong>Date :</strong> {new Date(b.bookingTime).toLocaleString()}</p>
            <p><strong>Statut :</strong> {b.status}</p>
            <p><strong>Infos :</strong> {b.additionalInfo}</p>
          </li>
        ))}

        {bookings.length === 0 && (
          <li className="text-center text-gray-500">Aucune réservation trouvée.</li>
        )}  

        {bookings.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
                deleteBooking(bookings[0].id).then(() => {
                  setBookings(prevBookings => prevBookings.filter(b => b.id !== bookings[0].id));
                });
              }
            }}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Supprimer la réservation
          </button>
        )}
        
      </ul>
    </div>
  );
}
