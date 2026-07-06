import { useEffect, useRef, useState } from 'react';
import ControlsPanel from '../components/ControlsPanel';
import EditorCanvas from '../components/EditorCanvas';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ImageUploader from '../components/ImageUploader';
import QuickDownloadButton from '../components/QuickDownloadButton';
import ViralCopyPanel from '../components/ViralCopyPanel';
import type { EditorState } from '../lib/canvas';
import type { ExportResult } from '../lib/export';
import { closeBitmap, loadImageFile, type LoadedImage } from '../lib/image';

const initialState: EditorState = {
  opacity: 8,
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  blur: 0,
  blendMode: 'normal',
  grain: false,
  watermark: true,
};

const homepageFaq = [
  {
    question: 'What is the low opacity overlay trend?',
    answer: 'It is an X/Twitter photo trend where one image has a faint hidden layer placed on top at low opacity.',
  },
  {
    question: 'How do I overlay two photos online?',
    answer: 'Upload a normal photo, upload the hidden overlay photo, lower the opacity, then download the final image.',
  },
  {
    question: 'What opacity should I use?',
    answer: 'Start around 7-10%. Go lower for mystery and slightly higher if the hidden layer is too hard to see.',
  },
  {
    question: 'Can I make the trend without Photoshop or CapCut?',
    answer: 'Yes. LowkeyPic runs in your browser, so you do not need Photoshop, CapCut, Canva, or an app install.',
  },
  {
    question: 'Does LowkeyPic upload my images?',
    answer: 'No. Your images stay in your browser and are processed locally on your device.',
  },
  {
    question: 'Can I use LowkeyPic on iPhone?',
    answer: 'Yes. Open it in Safari, choose two photos from your camera roll, adjust opacity, and download.',
  },
  {
    question: 'Is LowkeyPic free?',
    answer: 'Yes. LowkeyPic is free and does not require login.',
  },
  {
    question: 'Can I remove the tiny credit?',
    answer: 'Yes. Tiny credit is on by default, but you can disable it in More export options.',
  },
];

export default function HomePage() {
  const [base, setBase] = useState<LoadedImage | null>(null);
  const [overlay, setOverlay] = useState<LoadedImage | null>(null);
  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');
  const [lastExport, setLastExport] = useState<ExportResult | null>(null);
  const [loadingSlot, setLoadingSlot] = useState<'base' | 'overlay' | null>(null);
  const baseRef = useRef<LoadedImage | null>(null);
  const overlayRef = useRef<LoadedImage | null>(null);
  const exportRef = useRef<ExportResult | null>(null);

  useEffect(() => {
    baseRef.current = base;
  }, [base]);

  useEffect(() => {
    overlayRef.current = overlay;
  }, [overlay]);

  useEffect(() => {
    exportRef.current = lastExport;
  }, [lastExport]);

  useEffect(() => () => {
    closeBitmap(baseRef.current);
    closeBitmap(overlayRef.current);
    if (exportRef.current) URL.revokeObjectURL(exportRef.current.url);
  }, []);

  async function load(slot: 'base' | 'overlay', file: File) {
    setError('');
    setLoadingSlot(slot);
    try {
      const image = await loadImageFile(file);
      if (slot === 'base') {
        closeBitmap(base);
        setBase(image);
      } else {
        closeBitmap(overlay);
        setOverlay(image);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load that image.');
    } finally {
      setLoadingSlot(null);
    }
  }

  function patch(patchState: Partial<EditorState>) {
    setState((current) => ({ ...current, ...patchState }));
  }

  function handleExported(result: ExportResult) {
    if (exportRef.current) URL.revokeObjectURL(exportRef.current.url);
    exportRef.current = result;
    setLastExport(result);
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'LowkeyPic',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      url: 'https://lowkeypic.emanuele.click/',
      description: 'Free browser-based low opacity overlay editor for creating the X/Twitter hidden overlay trend.',
      image: [
        'https://lowkeypic.emanuele.click/lowkeypic-low-opacity-overlay-editor.png',
        'https://lowkeypic.emanuele.click/low-opacity-overlay-trend-example.png',
        'https://lowkeypic.emanuele.click/overlay-two-photos-online-lowkeypic.png',
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homepageFaq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'LowkeyPic',
      url: 'https://lowkeypic.emanuele.click/',
      description: 'A free online tool for making the low opacity overlay trend for X/Twitter.',
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <section id="editor" className="px-4 pb-12 pt-3">
        <div className="mx-auto max-w-[430px] space-y-4">
          <div className="mx-auto flex w-fit rounded-full bg-white/[0.07] px-3 py-2 text-sm font-semibold text-white/70 shadow-soft">
            Private: images stay on your device
          </div>
          {error ? <div className="mb-4 rounded-2xl border border-rose-300/25 bg-rose-300/10 px-4 py-3 text-sm font-semibold text-rose-50">{error}</div> : null}
          {loadingSlot ? <div className="rounded-2xl bg-violet-200/10 px-4 py-3 text-sm font-semibold text-violet-50">Reading {loadingSlot === 'base' ? 'normal pic' : 'hidden layer'} locally...</div> : null}
          <ImageUploader id="base-upload" title="Normal pic" subtitle="The photo people see first" image={base} onFile={(file) => load('base', file)} onClear={() => { closeBitmap(base); setBase(null); }} />
          <ImageUploader id="overlay-upload" title="Hidden layer" subtitle="The subtle overlay" image={overlay} onFile={(file) => load('overlay', file)} onClear={() => { closeBitmap(overlay); setOverlay(null); }} />
          <EditorCanvas
            base={base}
            overlay={overlay}
            state={state}
            showBefore={false}
            onMove={(dx, dy) => patch({ x: state.x + dx, y: state.y + dy })}
            onScale={(scale) => patch({ scale })}
            onReset={() => patch({ x: 0, y: 0, scale: 1, rotation: 0 })}
          />
          {base && overlay ? (
            <QuickDownloadButton base={base} overlay={overlay} state={state} onExported={handleExported} />
          ) : null}
          {base && overlay ? (
            <ControlsPanel
              base={base}
              overlay={overlay}
              state={state}
              onChange={patch}
              onReset={() => patch({ x: 0, y: 0, scale: 1, rotation: 0 })}
              onRandom={() => patch({
                x: Math.round((Math.random() - 0.5) * 160),
                y: Math.round((Math.random() - 0.5) * 180),
                rotation: Math.round((Math.random() - 0.5) * 18),
                scale: Number((0.78 + Math.random() * 0.55).toFixed(2)),
              })}
              onExported={handleExported}
            />
          ) : null}
          <ViralCopyPanel visible={Boolean(lastExport)} result={lastExport} />
          <p className="px-2 text-center text-sm leading-6 text-white/50">Use only images you own or have permission to use.</p>
        </div>
      </section>
      <HowItWorks />
      <HomeSeoSection />
      <HomeFaq />
      <Footer />
    </main>
  );
}

function HowItWorks() {
  return (
    <>
      <section className="px-4 py-10">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-black text-white">Make it in three taps-ish.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['1', 'Upload two photos', 'Normal pic first, hidden layer second.'],
              ['2', 'Lower opacity', 'Start around 7-10%. Make it a rumor.'],
              ['3', 'Export for X', 'Portrait is the default timeline move.'],
            ].map(([num, title, copy]) => (
              <article key={title} className="rounded-[1.5rem] bg-white/[0.055] p-4">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-zinc-950">{num}</div>
                <h3 className="text-base font-black text-white">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-white/50">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function HomeSeoSection() {
  return (
    <section className="px-4 pb-8 pt-4">
      <div className="mx-auto max-w-[760px] space-y-5">
        <div className="rounded-[2rem] bg-white/[0.055] p-5 shadow-soft">
          <h2 className="text-2xl font-black text-white">Free low opacity overlay editor</h2>
          <p className="mt-3 text-base leading-7 text-white/65">
            LowkeyPic is a browser-based editor for the low opacity overlay trend on X/Twitter. Upload a normal photo, add a hidden layer, lower the opacity, and download one final image. It works online, without Photoshop, CapCut, login, or image uploads.
          </p>
          <a className="link mt-4 inline-flex" href="/how-to-make-low-opacity-overlay-trend/">Read the full guide</a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Made for the trend', 'Opacity controls, hidden layer tools, and X-friendly export.'],
            ['Private by design', 'Your images stay in your browser.'],
            ['Works on mobile', 'Use it from iPhone Safari or Android Chrome.'],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-[1.5rem] bg-white/[0.05] p-4">
              <h3 className="text-base font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">{copy}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <MiniSeoBlock title="What app do people use for the opacity trend?">
            You can make the effect in Photoshop, CapCut, Canva, or PicsArt, but LowkeyPic is built only for this one trend: upload two photos, lower opacity, export.
          </MiniSeoBlock>
          <MiniSeoBlock title="How to make the trend on iPhone">
            Open LowkeyPic in Safari, choose two photos from your camera roll, set the hidden layer around 7-10% opacity, then download the result for X/Twitter.
          </MiniSeoBlock>
        </div>
      </div>
    </section>
  );
}

function MiniSeoBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="rounded-[1.5rem] bg-white/[0.055] p-5">
      <h2 className="text-xl font-black text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/60">{children}</p>
    </section>
  );
}

function HomeFaq() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center text-2xl font-black text-white">Lowkey questions</h2>
        <div className="mt-5 grid gap-3">
          {homepageFaq.map((item) => (
            <details key={item.question} className="group rounded-[1.35rem] bg-white/[0.055] p-4">
              <summary className="cursor-pointer list-none text-base font-black text-white">
                {item.question}
              </summary>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
