import type { LegalPageId } from '../types';
import LegalFooter from './LegalFooter';

interface Props {
  onNavigate: (page: 'register' | 'dashboard') => void;
  onSubscribe: () => void;
  onAnnualCheckout: () => void;
  hasActiveMembership: boolean;
  workCount: number;
  isAuthenticated: boolean;
  userEmail: string | null;
  authModeLabel: string;
  onAuthAction: () => void;
  onSignOut: () => void;
  onLegalNavigate: (page: LegalPageId) => void;
}

export default function LandingHero({ onSubscribe, onLegalNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-stone-950 to-neutral-950 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <img src="/ez-way-shield.png" alt="THE EZ WAY" className="w-32 h-32 sm:w-44 sm:h-44 object-contain mb-8" />
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
          EZwayCopyrights
        </h1>
        <p className="max-w-xl text-white/60 text-lg mb-9">
          Private, timestamped evidence records for independent music creators.
        </p>
        <button
          type="button"
          onClick={onSubscribe}
          className="rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 px-12 py-4 text-lg font-bold text-white shadow-xl shadow-orange-950/40 transition hover:scale-105 cursor-pointer"
        >
          Subscribe
        </button>
        <p className="mt-8 max-w-md text-xs leading-relaxed text-white/40">
          Private evidence records are not a U.S. Copyright Office registration.
        </p>
      </main>
      <LegalFooter onNavigate={onLegalNavigate} showBrand />
    </div>
  );
}
