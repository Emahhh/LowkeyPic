import { Download, RotateCcw, Share2, Shuffle } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { BLEND_MODES, EXPORT_PRESETS, type ExportFormat, type ExportPresetId } from '../lib/constants';
import type { EditorState } from '../lib/canvas';
import type { LoadedImage } from '../lib/image';
import { exportImage, shareImage, type ExportResult } from '../lib/export';

type Tab = 'look' | 'position' | 'export';

type Props = {
  base?: LoadedImage | null;
  overlay?: LoadedImage | null;
  state: EditorState;
  onChange: (patch: Partial<EditorState>) => void;
  onReset: () => void;
  onRandom: () => void;
  onExported: (result: ExportResult) => void;
};

export default function ControlsPanel({ base, overlay, state, onChange, onReset, onRandom, onExported }: Props) {
  const [tab, setTab] = useState<Tab>('look');
  const [lookAdvanced, setLookAdvanced] = useState(false);
  const [exportAdvanced, setExportAdvanced] = useState(false);
  const [preset, setPreset] = useState<ExportPresetId>('portrait');
  const [format, setFormat] = useState<ExportFormat>('image/jpeg');
  const [result, setResult] = useState<ExportResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const ready = Boolean(base && overlay);

  useEffect(() => {
    if (!result) return;
    setResult(null);
  }, [state, preset, format]);

  async function makeExport() {
    if (!base) return;
    setBusy(true);
    setMessage('');
    try {
      const next = await exportImage({ base, overlay, state, preset, format });
      if (result) URL.revokeObjectURL(result.url);
      setResult(next);
      onExported(next);
      setMessage('Done. Post it before you overthink it.');
      return next;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Export failed.');
    } finally {
      setBusy(false);
    }
  }

  async function download() {
    const item = result ?? (await makeExport());
    if (!item) return;
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.filename;
    link.click();
  }

  async function share() {
    const item = result ?? (await makeExport());
    if (!item) return;
    try {
      await shareImage(item);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Share is not supported here.');
    }
  }

  return (
    <section className={`rounded-[2rem] bg-white/[0.07] p-2 shadow-soft transition ${ready ? 'opacity-100' : 'pointer-events-none opacity-45'}`} aria-label="Adjust and export">
      <div className="grid grid-cols-3 gap-1 rounded-[1.5rem] bg-black/25 p-1">
        {(['look', 'position', 'export'] as Tab[]).map((item) => (
          <button key={item} type="button" className={tab === item ? 'tab-button-active' : 'tab-button'} onClick={() => setTab(item)}>
            {item === 'look' ? 'Look' : item === 'position' ? 'Position' : 'Export'}
          </button>
        ))}
      </div>

      <div className="p-3 pt-5">
        {tab === 'look' ? (
          <div className="space-y-5">
            <Range label="How hidden?" id="opacity" min={0} max={40} step={1} value={state.opacity} display={`${state.opacity}%`} onChange={(opacity) => onChange({ opacity })} />
            <Advanced label="Advanced" open={lookAdvanced} onToggle={() => setLookAdvanced((value) => !value)}>
              <Range label="Make softer" id="blur" min={0} max={18} step={0.5} value={state.blur} display={`${state.blur}px`} onChange={(blur) => onChange({ blur })} />
              <div>
                <label htmlFor="blend" className="control-label">Blend vibe</label>
                <select id="blend" className="select-field mt-2" value={state.blendMode} onChange={(event) => onChange({ blendMode: event.target.value as EditorState['blendMode'] })}>
                  {BLEND_MODES.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
                </select>
              </div>
            </Advanced>
          </div>
        ) : null}

        {tab === 'position' ? (
          <div className="space-y-5">
            <Range label="Size" id="scale" min={0.18} max={2.4} step={0.01} value={state.scale} display={`${Math.round(state.scale * 100)}%`} onChange={(scale) => onChange({ scale })} />
            <Range label="Tilt" id="rotation" min={-35} max={35} step={1} value={state.rotation} display={`${state.rotation}deg`} onChange={(rotation) => onChange({ rotation })} />
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="soft-button" onClick={onRandom}>
                <Shuffle className="h-4 w-4" aria-hidden="true" />
                Random
              </button>
              <button type="button" className="soft-button" onClick={onReset}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        ) : null}

        {tab === 'export' ? (
          <div className="space-y-4">
            <button type="button" className="primary-button inline-flex w-full" onClick={download} disabled={busy}>
              <Download className="h-4 w-4" aria-hidden="true" />
              {busy ? 'Making it...' : 'Download Image'}
            </button>
            {'share' in navigator ? (
              <button type="button" className="soft-button w-full justify-center" onClick={share} disabled={busy}>
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share with caption
              </button>
            ) : null}
            <Advanced label="More export options" open={exportAdvanced} onToggle={() => setExportAdvanced((value) => !value)}>
              <div>
                <label htmlFor="export-size" className="control-label">Size</label>
                <select id="export-size" className="select-field mt-2" value={preset} onChange={(event) => setPreset(event.target.value as ExportPresetId)}>
                  {EXPORT_PRESETS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </div>
              <div>
                <p className="control-label">Format</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button type="button" className={format === 'image/jpeg' ? 'format-button-active' : 'format-button'} onClick={() => setFormat('image/jpeg')}>JPEG</button>
                  <button type="button" className={format === 'image/png' ? 'format-button-active' : 'format-button'} onClick={() => setFormat('image/png')}>PNG</button>
                </div>
              </div>
              <div className="space-y-1">
                <Toggle label="Tiny credit" checked={state.watermark} onChange={(watermark) => onChange({ watermark })} />
                <p className="px-2 text-sm leading-5 text-white/50">Adds a subtle 'made with lowkeypic.emanuele.click' in the corner.</p>
              </div>
            </Advanced>
            {message ? <p className="text-center text-sm font-semibold text-violet-100">{message}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Range(props: { label: string; id: string; min: number; max: number; step: number; value: number; display: string; onChange: (value: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={props.id} className="control-label">{props.label}</label>
        <span className="value-pill">{props.display}</span>
      </div>
      <input
        id={props.id}
        className="slider"
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onPointerDown={(event) => {
          event.currentTarget.focus();
          event.stopPropagation();
        }}
        onTouchStart={(event) => event.stopPropagation()}
        onChange={(event) => props.onChange(Number(event.target.value))}
      />
    </div>
  );
}

function Toggle(props: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl bg-black/20 px-4 py-3 text-sm font-bold text-white/80">
      <span>{props.label}</span>
      <input className="toggle" type="checkbox" checked={props.checked} onChange={(event) => props.onChange(event.target.checked)} />
    </label>
  );
}

function Advanced(props: { label: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div>
      <button type="button" className="w-full rounded-2xl px-2 py-3 text-left text-sm font-bold text-white/50 transition hover:text-white" onClick={props.onToggle}>
        {props.open ? 'Hide options' : props.label}
      </button>
      {props.open ? <div className="mt-2 space-y-5">{props.children}</div> : null}
    </div>
  );
}
