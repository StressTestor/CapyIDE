import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          CapyIDE — Persistent memory IDE with mainstream AI
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-600">
          Only IDE with persistent memory + unlimited mainstream AI for $15 (Pro).
        </p>
        <div className="mt-8 flex gap-4">
          <a
            className="rounded bg-black px-4 py-2 text-white"
            href="https://github.com/StressTestor/CapyIDE"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a className="rounded border px-4 py-2" href="/pricing">
            See Pricing
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
