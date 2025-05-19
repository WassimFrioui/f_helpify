'use client';

import { useEffect, useState } from 'react';
import { getFilteredServices } from '@/lib/services';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  emergencyAvailable: boolean;
  equipment: string;
  providerName: string;
  providerLocation: string;
  imageUrl?: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((v, k) => (params[k] = v));

    getFilteredServices(params).then(setServices);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = new URLSearchParams();

    const emergency = (form.elements.namedItem('emergency') as HTMLInputElement)?.checked;
    const location = (form.elements.namedItem('location') as HTMLInputElement)?.value;
    const minPrice = (form.elements.namedItem('minPrice') as HTMLInputElement)?.value;
    const maxPrice = (form.elements.namedItem('maxPrice') as HTMLInputElement)?.value;

    if (emergency) query.set('emergency', 'true');
    if (location) query.set('location', location);
    if (minPrice) query.set('minPrice', minPrice);
    if (maxPrice) query.set('maxPrice', maxPrice);

    router.push(`/services?${query.toString()}`);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tous les services disponibles</h1>

      <form onSubmit={handleSubmit} className="grid gap-2 md:grid-cols-4 mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="emergency" />
          Urgence
        </label>
        <input name="location" placeholder="Localisation" className="border p-2 rounded" />
        <input name="minPrice" type="number" placeholder="Prix min" className="border p-2 rounded" />
        <input name="maxPrice" type="number" placeholder="Prix max" className="border p-2 rounded" />
        <button type="submit" className="col-span-4 md:col-span-1 bg-blue-600 text-white rounded p-2">
          Rechercher
        </button>
      </form>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(service => (
          <li key={service.id} className="border rounded shadow-sm p-4">
            {service.imageUrl && (
              <img
                src={`http://localhost:8080${service.imageUrl}`}
                alt="Aperçu"
                className="w-full h-48 object-cover mb-3 rounded"
              />
            )}
            <h2 className="text-lg font-semibold mb-2">{service.title}</h2>
            <p className="text-sm mb-1"><strong>Prix :</strong> {service.price} €</p>
            <p className="text-sm mb-1"><strong>Urgence :</strong> {service.emergencyAvailable ? 'Oui' : 'Non'}</p>
            <p className="text-sm mb-1"><strong>Prestataire :</strong> {service.providerName} ({service.providerLocation})</p>
            <p className="text-sm mb-2"><strong>Équipement :</strong> {service.equipment}</p>
            <Link href={`/services/${service.id}`}>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Voir le service
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
