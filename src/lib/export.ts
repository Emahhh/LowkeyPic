import { EXPORT_PRESETS, ExportFormat, ExportPresetId } from './constants';
import { renderComposition, type EditorState } from './canvas';
import type { LoadedImage } from './image';

export type ExportResult = {
  blob: Blob;
  url: string;
  filename: string;
};

export async function exportImage(params: {
  base: LoadedImage;
  overlay?: LoadedImage | null;
  state: EditorState;
  preset: ExportPresetId;
  format: ExportFormat;
}): Promise<ExportResult> {
  const preset = EXPORT_PRESETS.find((item) => item.id === params.preset) ?? EXPORT_PRESETS[2];
  const width = preset.width || params.base.width;
  const height = preset.height || params.base.height;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas export is not available in this browser.');
  renderComposition(ctx, {
    base: params.base,
    overlay: params.overlay,
    state: params.state,
    width,
    height,
  });
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error('Export failed. The browser said no vibes today.'))),
      params.format,
      params.format === 'image/jpeg' ? 0.95 : undefined,
    );
  });
  const ext = params.format === 'image/png' ? 'png' : 'jpg';
  return {
    blob,
    url: URL.createObjectURL(blob),
    filename: `lowkeypic-${preset.id}.${ext}`,
  };
}

export async function copyImage(blob: Blob) {
  if (!navigator.clipboard || !('ClipboardItem' in window)) {
    throw new Error('Copy image is not supported in this browser.');
  }
  const supports = ClipboardItem.supports?.bind(ClipboardItem);
  if (supports && supports(blob.type)) {
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    return;
  }
  const pngBlob = await blobToPng(blob);
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
}

export async function shareImage(result: ExportResult) {
  if (!navigator.share) throw new Error('Share is not supported in this browser.');
  const file = new File([result.blob], result.filename, { type: result.blob.type });
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  const text = 'made with lowkeypic.emanuele.click';
  if (nav.canShare && !nav.canShare({ files: [file] })) {
    await navigator.share({ title: 'LowkeyPic', text, url: 'https://lowkeypic.emanuele.click' });
    return;
  }
  await navigator.share({ title: 'LowkeyPic', text, files: [file] });
}

async function blobToPng(blob: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Copy image is not supported in this browser.');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return new Promise((resolve, reject) => {
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error('Copy image is not supported in this browser.'))), 'image/png');
  });
}
