import { Copy, Download, ExternalLink, Share2, UserPlus } from 'lucide-react';
import { CAPTIONS } from '../lib/constants';
import { shareImage, type ExportResult } from '../lib/export';

type Props = {
  visible: boolean;
  result?: ExportResult | null;
};

export default function ViralCopyPanel({ visible, result }: Props) {
  if (!visible) return null;
  const caption = 'made this image with lowkeypic.emanuele.click';
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
  const followUrl = 'https://x.com/emanuele_click';

  return (
    <div className="rounded-[2rem] bg-violet-200/[0.09] p-4 shadow-soft">
      <h2 className="text-xl font-black text-white">Post it before you overthink it.</h2>
      <div className="mt-4 grid gap-2">
        {CAPTIONS.map((captionOption) => (
          <button
            key={captionOption}
            type="button"
            className="flex w-full items-center justify-between gap-3 rounded-2xl bg-black/20 px-4 py-3 text-left text-sm font-semibold text-white/80 transition hover:bg-white/[0.07]"
            onClick={() => navigator.clipboard?.writeText(captionOption)}
          >
            <span>{captionOption}</span>
            <Copy className="h-4 w-4 flex-none text-white/60" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        <a className="soft-button justify-center" href={tweetUrl} target="_blank" rel="noreferrer">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Open X
        </a>
        {'share' in navigator && result ? (
          <button type="button" className="soft-button justify-center" onClick={() => shareImage(result)}>
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Share image
          </button>
        ) : null}
        <a className="soft-button justify-center" href={followUrl} target="_blank" rel="noreferrer">
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Follow me for more cool tech stuff like this
        </a>
        {result ? (
          <a className="soft-button justify-center" href={result.url} download={result.filename}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download again
          </a>
        ) : null}
      </div>
    </div>
  );
}
