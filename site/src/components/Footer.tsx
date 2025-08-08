export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-neutral-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} CapyIDE</p>
          <nav className="flex gap-4">
            <a className="underline" href="https://github.com/StressTestor/CapyIDE" target="_blank" rel="noreferrer">GitHub</a>
            <a className="underline" href="/privacy">Privacy</a>
            <a className="underline" href="/terms">Terms</a>
            <a className="underline" href="/responsible-disclosure">Responsible Disclosure</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}


