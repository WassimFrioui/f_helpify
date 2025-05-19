'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CLIENT');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        await api.post('/auth/register', {
            email,
            username,
            password,
            role, // CLIENT ou PROVIDER
            location,
        });

        alert("Inscription réussie !");
        router.push('/login');
        } catch (err) {
        console.error(err);
        alert("Erreur lors de l'inscription.");
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
            placeholder="Mot de passe"
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
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
            required
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            S&apos;inscrire
            </button>
        </form>
        </div>
  );
}
