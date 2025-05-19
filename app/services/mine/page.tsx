'use client';

import { useEffect, useState } from 'react';
import { getMyServices } from '@/lib/services';
import { useRouter } from 'next/navigation';

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  emergencyAvailable: boolean;
  equipment: string;
};

export default function MyServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyServices();
        setServices(data);
      } catch {
        alert('Erreur lors du chargement des services');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const goToEdit = (id: number) => {
    router.push(`/services/${id}/edit`);
  };

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Mes services</h1>
      {services.length === 0 ? (
        <p>Aucun service pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <li key={service.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{service.title}</h2>
              <p>{service.description}</p>
              <p><strong>Prix:</strong> {service.price} €</p>
              <p><strong>Urgence :</strong> {service.emergencyAvailable ? 'Oui' : 'Non'}</p>
              <p><strong>Équipement :</strong> {service.equipment}</p>
              <button
                onClick={() => goToEdit(service.id)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
              >
                Modifier
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
