import { MAX_IMAGE_EDGE } from './constants';

export type LoadedImage = {
  bitmap: ImageBitmap | HTMLImageElement;
  width: number;
  height: number;
  name: string;
};

const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function loadImageFile(file: File): Promise<LoadedImage> {
  if (!SUPPORTED_TYPES.includes(file.type)) {
    throw new Error('That file type is not invited. Try JPG, PNG, or WebP.');
  }

  try {
    if ('createImageBitmap' in window) {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return downscaleIfNeeded(bitmap, file.name);
    }
  } catch {
    // Safari support is uneven for createImageBitmap options, so fall back below.
  }

  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Could not read that image. Try another one.'));
      img.src = url;
    });
    return downscaleIfNeeded(image, file.name);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function downscaleIfNeeded(source: ImageBitmap | HTMLImageElement, name: string): Promise<LoadedImage> {
  const width = source.width;
  const height = source.height;
  const largest = Math.max(width, height);
  if (largest <= MAX_IMAGE_EDGE) {
    return { bitmap: source, width, height, name };
  }

  const ratio = MAX_IMAGE_EDGE / largest;
  const targetWidth = Math.round(width * ratio);
  const targetHeight = Math.round(height * ratio);
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available in this browser.');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
  const bitmap = await createImageBitmap(canvas);
  closeBitmap(source);
  return { bitmap, width: targetWidth, height: targetHeight, name };
}

export function closeBitmap(image?: LoadedImage | ImageBitmap | HTMLImageElement | null) {
  const bitmap = image && 'bitmap' in image ? image.bitmap : image;
  if (bitmap && 'close' in bitmap && typeof bitmap.close === 'function') {
    bitmap.close();
  }
}
