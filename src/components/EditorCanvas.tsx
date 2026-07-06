import { useEffect, useRef, useState } from 'react';
import { getContainedRect, renderComposition, type EditorState } from '../lib/canvas';
import type { LoadedImage } from '../lib/image';

type Props = {
  base?: LoadedImage | null;
  overlay?: LoadedImage | null;
  state: EditorState;
  showBefore: boolean;
  onMove: (dx: number, dy: number) => void;
  onScale: (scale: number) => void;
  onReset: () => void;
};

export default function EditorCanvas({ base, overlay, state, showBefore, onMove, onScale, onReset }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; distance?: number } | null>(null);
  const [readySize, setReadySize] = useState({ width: 900, height: 1125 });

  function moveByPreviewPixels(dx: number, dy: number) {
    if (!base) {
      onMove(dx, dy);
      return;
    }
    const rect = getContainedRect(base.width, base.height, readySize.width, readySize.height);
    onMove(dx / rect.scale, dy / rect.scale);
  }

  useEffect(() => {
    if (!wrapRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.max(280, Math.round(entry.contentRect.width));
      setReadySize({ width, height: Math.round(width * 1.25) });
    });
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(readySize.width * dpr);
    canvas.height = Math.round(readySize.height * dpr);
    canvas.style.width = `${readySize.width}px`;
    canvas.style.height = `${readySize.height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (base) {
      renderComposition(ctx, { base, overlay, state, width: readySize.width, height: readySize.height, showBefore });
    } else {
      drawEmpty(ctx, readySize.width, readySize.height);
    }
  }, [base, overlay, state, showBefore, readySize]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!base || !overlay) return;
      const active = document.activeElement;
      if (active && ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(active.tagName)) return;
      const step = event.shiftKey ? 24 : 5;
      if (event.key === 'ArrowLeft') moveByPreviewPixels(-step, 0);
      if (event.key === 'ArrowRight') moveByPreviewPixels(step, 0);
      if (event.key === 'ArrowUp') moveByPreviewPixels(0, -step);
      if (event.key === 'ArrowDown') moveByPreviewPixels(0, step);
      if (event.key.toLowerCase() === 'r') onReset();
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [base, overlay, onMove, onReset, readySize]);

  function pointerDistance(touches: React.TouchList) {
    if (touches.length < 2) return undefined;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  return (
    <div ref={wrapRef} className="relative mx-auto w-full overflow-hidden rounded-[2rem] bg-zinc-950 shadow-preview">
      <canvas
        ref={canvasRef}
        className="block w-full touch-none select-none"
        aria-label="Live LowkeyPic image composition preview"
        tabIndex={0}
        onPointerDown={(event) => {
          if (!overlay) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerMove={(event) => {
          if (!dragRef.current || !overlay) return;
          const dx = event.clientX - dragRef.current.x;
          const dy = event.clientY - dragRef.current.y;
          dragRef.current = { x: event.clientX, y: event.clientY };
          moveByPreviewPixels(dx, dy);
        }}
        onPointerUp={() => {
          dragRef.current = null;
        }}
        onTouchStart={(event) => {
          const distance = pointerDistance(event.touches);
          if (distance) dragRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY, distance };
        }}
        onTouchMove={(event) => {
          const previous = dragRef.current?.distance;
          const next = pointerDistance(event.touches);
          if (previous && next) {
            onScale(Math.min(2.4, Math.max(0.18, state.scale * (next / previous))));
            dragRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY, distance: next };
          }
        }}
      />
      {!base ? (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div>
            <div className="mx-auto mb-5 h-16 w-16 rounded-[1.35rem] bg-white/[0.08] p-3">
              <div className="h-full w-full rotate-[-8deg] rounded-2xl bg-violet-200/35 shadow-lg" />
            </div>
            <p className="text-xl font-black text-white">Add two photos to start</p>
            <p className="mt-2 text-sm text-white/50">The preview shows up here.</p>
          </div>
        </div>
      ) : !overlay ? (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/60 p-4 text-sm font-semibold text-white/80 backdrop-blur">
          Nice. Add the hidden layer next.
        </div>
      ) : null}
    </div>
  );
}

function drawEmpty(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#09090d';
  ctx.fillRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#171520');
  gradient.addColorStop(0.54, '#0f1018');
  gradient.addColorStop(1, '#221831');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
