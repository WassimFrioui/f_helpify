'use client';

import { useRouter } from 'next/navigation';

export default function BookButton({ serviceId }: { serviceId: number }) {
  const router = useRouter();

  const goToBooking = () => {
    router.push(`/bookings/new?service=${serviceId}`);
  };

  return (
    <button
      onClick={goToBooking}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Réserver ce service
    </button>
  );
}