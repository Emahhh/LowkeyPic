import { Download } from 'lucide-react';
import { useState } from 'react';
import type { EditorState } from '../lib/canvas';
import { exportImage, type ExportResult } from '../lib/export';
import type { LoadedImage } from '../lib/image';

type Props = {
  base: LoadedImage;
  overlay: LoadedImage;
  state: EditorState;
  onExported: (result: ExportResult) => void;
};

export default function QuickDownloadButton({ base, overlay, state, onExported }: Props) {
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      const result = await exportImage({ base, overlay, state, preset: 'portrait', format: 'image/jpeg' });
      onExported(result);
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.filename;
      link.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" className="primary-button inline-flex w-full" onClick={download} disabled={busy}>
      <Download className="h-4 w-4" aria-hidden="true" />
      {busy ? 'Making it...' : 'Download Image'}
    </button>
  );
}
