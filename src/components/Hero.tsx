import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="px-4 pb-5 pt-4">
      <div className="mx-auto max-w-[430px]">
        <header className="mb-9 flex items-center justify-between">
          <a href="/" className="text-base font-black tracking-normal text-white">LowkeyPic</a>
        </header>
        <div className="text-center">
          <h1 className="text-4xl font-black leading-[1.02] text-white sm:text-5xl">Make the low opacity overlay trend.</h1>
          <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-white/70">Two photos. One hidden layer. No upload, no login.</p>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/50">Built for the X/Twitter overlay picture trend. Works on your phone.</p>
          <div className="mt-6 flex justify-center">
            <a href="#editor" className="primary-button inline-flex px-6">
              Start creating
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
