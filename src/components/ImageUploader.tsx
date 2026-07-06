import { ImagePlus, RefreshCw } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { LoadedImage } from '../lib/image';

type Props = {
  id: string;
  title: string;
  subtitle: string;
  image?: LoadedImage | null;
  onFile: (file: File) => void;
  onClear: () => void;
};

export default function ImageUploader({ id, title, subtitle, image, onFile }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 120;
    canvas.height = 150;
    const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image.bitmap, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  }, [image]);

  return (
      <label
        htmlFor={id}
      className="group flex min-h-[112px] cursor-pointer items-center gap-4 rounded-[1.75rem] bg-white/[0.07] p-4 shadow-soft transition hover:bg-white/[0.1] focus-within:ring-2 focus-within:ring-violet-200"
      >
        <div className="flex h-20 w-16 flex-none items-center justify-center overflow-hidden rounded-2xl bg-black/30">
          {image ? (
            <canvas ref={canvasRef} className="h-full w-full object-cover" aria-hidden="true" />
          ) : (
            <ImagePlus className="h-7 w-7 text-violet-100" aria-hidden="true" />
          )}
        </div>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-black text-white">{title}</span>
          <span className="mt-1 block text-sm leading-5 text-white/60">{image ? 'Ready. Tap to replace.' : subtitle}</span>
        </span>
        {image ? <RefreshCw className="h-5 w-5 flex-none text-white/50" aria-hidden="true" /> : null}
        <span className="sr-only">{image ? `Replace ${title}` : `Upload ${title}`}</span>
        <input
          id={id}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) onFile(file);
            event.currentTarget.value = '';
          }}
        />
      </label>
  );
}
