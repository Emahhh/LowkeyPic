import { BlendMode, WATERMARK_TEXT } from './constants';
import type { LoadedImage } from './image';

export type EditorState = {
  opacity: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  blur: number;
  blendMode: BlendMode;
  grain: boolean;
  watermark: boolean;
};

export type RenderOptions = {
  base: LoadedImage;
  overlay?: LoadedImage | null;
  state: EditorState;
  width: number;
  height: number;
  showBefore?: boolean;
};

export function getContainedRect(sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number) {
  const scale = Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;
  return {
    x: (targetWidth - width) / 2,
    y: (targetHeight - height) / 2,
    width,
    height,
    scale,
  };
}

export function renderComposition(ctx: CanvasRenderingContext2D, options: RenderOptions) {
  const { base, overlay, state, width, height, showBefore } = options;
  ctx.save();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#09090d';
  ctx.fillRect(0, 0, width, height);

  const baseRect = getContainedRect(base.width, base.height, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(base.bitmap, baseRect.x, baseRect.y, baseRect.width, baseRect.height);

  if (overlay && !showBefore) {
    const overlayBaseWidth = baseRect.width * state.scale;
    const overlayBaseHeight = overlayBaseWidth * (overlay.height / overlay.width);
    const centerX = width / 2 + state.x * baseRect.scale;
    const centerY = height / 2 + state.y * baseRect.scale;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((state.rotation * Math.PI) / 180);
    ctx.globalAlpha = state.opacity / 100;
    ctx.globalCompositeOperation = state.blendMode === 'normal' ? 'source-over' : state.blendMode;
    if ('filter' in ctx) {
      ctx.filter = state.blur > 0 ? `blur(${state.blur * baseRect.scale}px)` : 'none';
    }
    ctx.drawImage(overlay.bitmap, -overlayBaseWidth / 2, -overlayBaseHeight / 2, overlayBaseWidth, overlayBaseHeight);
    ctx.restore();

    if (state.grain) drawGrain(ctx, width, height, 0.045);
  }

  if (state.watermark && !showBefore) drawWatermark(ctx, width, height);
  ctx.restore();
}

function drawGrain(ctx: CanvasRenderingContext2D, width: number, height: number, alpha: number) {
  const step = 3;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = 'overlay';
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const shade = Math.random() > 0.5 ? 255 : 0;
      ctx.fillStyle = `rgb(${shade} ${shade} ${shade})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  ctx.restore();
}

function drawWatermark(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const fontSize = Math.max(10, Math.round(width * 0.013));
  const padding = Math.max(16, Math.round(width * 0.018));
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0,0,0,.45)';
  ctx.shadowBlur = 6;
  ctx.fillText(WATERMARK_TEXT, width - padding, height - padding);
  ctx.restore();
}
