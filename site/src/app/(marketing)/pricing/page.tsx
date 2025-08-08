export const metadata = {
  title: "Pricing",
  description:
    "Simple tiers: Free, Pro ($15), Enterprise (custom). Only IDE with persistent memory + unlimited mainstream AI for $15 (Pro).",
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <section className="rounded-lg border p-6">
          <h2 className="text-xl font-medium">Free</h2>
          <p className="mt-2 text-neutral-500">Core editor features.</p>
        </section>
        <section className="rounded-lg border p-6">
          <h2 className="text-xl font-medium">Pro — $15</h2>
          <p className="mt-2 text-neutral-500">
            Persistent memory + unlimited mainstream AI usage.
          </p>
        </section>
        <section className="rounded-lg border p-6">
          <h2 className="text-xl font-medium">Enterprise</h2>
          <p className="mt-2 text-neutral-500">Custom terms and support.</p>
        </section>
      </div>
    </main>
  );
}


