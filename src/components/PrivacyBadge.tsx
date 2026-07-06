import { ShieldCheck } from 'lucide-react';

export default function PrivacyBadge() {
  return (
    <div className="inline-flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-50">
      <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-200" aria-hidden="true" />
      <div>
        <p className="font-semibold">Private by design: your images stay on your device.</p>
        <p className="mt-1 text-emerald-50/70">Nothing is uploaded, stored, or sent to a server. Everything happens in your browser.</p>
      </div>
    </div>
  );
}
