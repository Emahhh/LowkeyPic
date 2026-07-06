export type BlendMode = 'normal' | 'screen' | 'multiply' | 'overlay' | 'soft-light';
export type ExportPresetId = 'original' | 'square' | 'portrait' | 'x-landscape';
export type ExportFormat = 'image/jpeg' | 'image/png';

export const BLEND_MODES: BlendMode[] = ['normal', 'screen', 'multiply', 'overlay', 'soft-light'];

export const EXPORT_PRESETS = [
  { id: 'portrait', label: 'Portrait 1080x1350 recommended', width: 1080, height: 1350 },
  { id: 'square', label: 'Square 1080x1080', width: 1080, height: 1080 },
  { id: 'original', label: 'Original', width: 0, height: 0 },
  { id: 'x-landscape', label: 'X wide 1600x900', width: 1600, height: 900 },
] as const;

export const CAPTIONS = [
  'made with lowkeypic.emanuele.click',
] as const;

export const MAX_IMAGE_EDGE = 3200;
export const WATERMARK_TEXT = 'made with lowkeypic.emanuele.click';
