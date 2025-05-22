'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Cookies from 'js-cookie';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CLIENT');
  const [siret, setSiret] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Email invalide.");
      return false;
    }
    if (password.length < 6) {
      setError("Mot de passe trop court (min 6 caractères).");
      return false;
    }
    if (!username.trim()) {
      setError("Le nom complet est requis.");
      return false;
    }
    if (!location.trim()) {
      setError("La localisation est requise.");
      return false;
    }
    if (role === 'PROVIDER') {
      if (!siret.trim()) {
        setError("Le numéro de SIRET est requis pour les prestataires.");
        return false;
      }
      if (!companyName.trim()) {
        setError("Le nom de l'entreprise est requis pour les prestataires.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    try {
      const res = await api.post('/auth/register', {
        email,
        username,
        password,
        role,
        location,
        siret: role === 'PROVIDER' ? siret : undefined,
        companyName: role === 'PROVIDER' ? companyName : undefined,
      });

      Cookies.set('token', res.data.token);
      router.push('/services');
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data?.message
      ) {
        setError(
          (err as { response?: { data?: { message?: string } } }).response!.data!.message as string
        );
      } else {
        setError("Erreur lors de l'inscription.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nom complet"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe (min 6 caractères)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="CLIENT">Client</option>
          <option value="PROVIDER">Prestataire</option>
        </select>
        <input
          type="text"
          placeholder="Localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {role === 'PROVIDER' && (
          <>
            <input
              type="text"
              placeholder="Numéro de SIRET"
              value={siret}
              onChange={(e) => setSiret(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nom de l'entreprise"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
}
