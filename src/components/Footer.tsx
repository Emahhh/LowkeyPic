export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-4 text-sm text-white/50">
      <div className="mx-auto max-w-[560px] space-y-3 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2" aria-label="Footer">
          <a className="link-subtle" href="https://emanuele.click" target="_blank" rel="noreferrer">Made by Emanuele</a>
          <span aria-hidden="true">·</span>
          <a className="link-subtle" href="/how-to-make-low-opacity-overlay-trend/">Full guide</a>
          <span aria-hidden="true">·</span>
          <a className="link-subtle" href="/#editor">Privacy</a>
        </nav>
        <p>Nothing is uploaded or stored.</p>
      </div>
    </footer>
  );
}
