'use client';

import { useEffect, useState } from 'react';
import { getServiceById, updateService, uploadServiceFiles, getServiceImages } from '@/lib/services';
import { useRouter } from 'next/navigation';

export default function EditServicePage({ params }: { params: { id: string } }) {
  const serviceId = Number(params.id);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [emergencyAvailable, setEmergencyAvailable] = useState(false);
  const [equipment, setEquipment] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getServiceById(serviceId).then(data => {
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setEmergencyAvailable(data.emergencyAvailable);
      setEquipment(data.equipment);
    });

    getServiceImages(serviceId).then(setImages);
  }, [serviceId]);

  const handleUpdate = async () => {
    try {
      await updateService(serviceId, {
        title,
        description,
        price,
        emergencyAvailable,
        equipment
      });

      if (files && files.length > 0) {
        await uploadServiceFiles(serviceId, Array.from(files));
      }

      router.push('/services/mine');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour du service');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier le service #{serviceId}</h1>

      <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 mb-2" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 mb-2" />
      <input type="number" placeholder="Prix" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border p-2 mb-2" />
      <input placeholder="Équipement" value={equipment} onChange={e => setEquipment(e.target.value)} className="w-full border p-2 mb-2" />
      <label className="block mb-2">
        <input type="checkbox" checked={emergencyAvailable} onChange={e => setEmergencyAvailable(e.target.checked)} />
        {' '}Disponible en urgence
      </label>

      <div className="mt-4">
        <label className="block mb-1">Ajouter des fichiers :</label>
        <input type="file" multiple onChange={e => setFiles(e.target.files)} className="mb-2" />
      </div>

      <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Enregistrer</button>

      {images.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Fichiers existants :</h2>
          <div className="flex flex-wrap gap-3">
            {images.map((url, i) =>
              url.endsWith('.pdf') ? (
                <a key={i} href={`http://localhost:8080${url}`} target="_blank" className="text-blue-600 underline text-sm">
                  Voir PDF {i + 1}
                </a>
              ) : (
                <img key={i} src={`http://localhost:8080${url}`} alt={`Fichier ${i}`} className="w-24 h-24 object-cover rounded shadow" />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
