'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createService, uploadServiceFiles } from '@/lib/services';

export default function NewServicePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [emergencyAvailable, setEmergencyAvailable] = useState(false);
  const [equipment, setEquipment] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const service = await createService({ title, description, price, emergencyAvailable, equipment });
      const serviceId = service.id;

      if (files && files.length > 0) {
        await uploadServiceFiles(serviceId, Array.from(files));
      }

      router.push('/services/mine');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création du service : ' + err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Créer un service</h1>
      <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 mb-2" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 mb-2" />
      <input type="number" placeholder="Prix" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border p-2 mb-2" />
      <input placeholder="Équipement" value={equipment} onChange={e => setEquipment(e.target.value)} className="w-full border p-2 mb-2" />
      <label className="block mb-2">
        <input type="checkbox" checked={emergencyAvailable} onChange={e => setEmergencyAvailable(e.target.checked)} />
        {' '}Disponible en urgence
      </label>

      <label className="block mt-4 mb-2">Uploader images ou certificats :</label>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="mb-4" />

      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded w-full">Créer</button>
    </div>
  );
}
