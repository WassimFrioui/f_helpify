'use client';

import { useEffect, useState } from 'react';
import { getServiceById, getServiceImages } from '@/lib/services';
import BookButton from '@/components/BookButton';

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  emergencyAvailable: boolean;
  equipment: string;
  providerName: string;
  providerLocation: string;
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const serviceId = Number(params.id);

  const [service, setService] = useState<Service | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getServiceById(serviceId).then(setService);
    getServiceImages(serviceId).then(setImages).catch(() => {});
  }, [serviceId]);

  if (!service) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>

      {images.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Images / certificats :</h2>
          <div className="flex flex-wrap gap-4">
            {images.map((url, i) =>
              url.endsWith('.pdf') ? (
                <a key={i} href={`http://localhost:8080${url}`} target="_blank" className="text-blue-600 underline">
                  Voir PDF {i + 1}
                </a>
              ) : (
                <img
                  key={i}
                  src={`http://localhost:8080${url}`}
                  alt={`Image ${i}`}
                  className="w-48 h-48 object-cover rounded shadow"
                />
              )
            )}
          </div>
        </div>
      )}

      <div className="space-y-2 text-sm">
        <p><strong>Description :</strong> {service.description}</p>
        <p><strong>Prix :</strong> {service.price} €</p>
        <p><strong>Urgence :</strong> {service.emergencyAvailable ? 'Oui' : 'Non'}</p>
        <p><strong>Équipement :</strong> {service.equipment}</p>
        <p><strong>Prestataire :</strong> {service.providerName} ({service.providerLocation})</p>
      </div>

      <div className="mt-6">
        <BookButton serviceId={serviceId} />
      </div>
    </div>
  );
}
