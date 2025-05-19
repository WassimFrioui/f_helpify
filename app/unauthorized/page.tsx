import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="bg-white/90 rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-md w-full">
                <svg
                    className="w-16 h-16 text-red-600 mb-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.5 9.5l5 5m0-5l-5 5"
                    />
                </svg>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    Accès non autorisé
                </h1>
                <p className="text-gray-600 mb-8 text-center">
                    Désolé, vous n&apos;avez pas la permission d&apos;accéder à cette page.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-black text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-800 transition"
                >
                    Retour à l&apos;accueil
                </Link>
            </div>
            <div className="mt-10 text-gray-400 text-xs tracking-wide">
                &copy; {new Date().getFullYear()} Helpify. Tous droits réservés.
            </div>
        </div>
    );
}