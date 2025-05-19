'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function TokenViewer() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const jwt = Cookies.get('token');
    setToken(jwt ?? null);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Token JWT :</h2>
      {token ? (
        <textarea
          readOnly
          className="w-full h-32 border rounded p-2 text-xs"
          value={token}
        />
      ) : (
        <p className="text-red-500">Aucun token trouvé (non connecté ?)</p>
      )}
    </div>
  );
}
