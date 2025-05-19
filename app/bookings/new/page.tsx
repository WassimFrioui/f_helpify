'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createBooking } from '@/lib/bookings';

export default function NewBookingPage() {
  const searchParams = useSearchParams();
  const serviceId = Number(searchParams.get('service'));
  const router = useRouter();

  const [bookingTime, setBookingTime] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async () => {
    if (!bookingTime) {
      alert("Veuillez choisir une date");
      return;
    }

    try {
      await createBooking({
        serviceId,
        bookingTime,
        additionalInfo: info,
      });
      router.push('/bookings/client');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la réservation : " + err);
    }
  };

  if (!serviceId) return <div>Service non spécifié</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Réserver le service #{serviceId}</h1>
      <label className="block mb-2">Date et heure :</label>
      <input
        type="datetime-local"
        value={bookingTime}
        onChange={(e) => setBookingTime(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <label className="block mb-2">Informations supplémentaires :</label>
      <textarea
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white w-full py-2 rounded">
        Envoyer la demande
      </button>
    </div>
  );
}
