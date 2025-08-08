export const metadata = {
  title: "Privacy",
  description:
    "Default: no tracking or PII collection. Optional analytics behind consent.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
      <p className="mt-4 text-neutral-500">
        By default, we collect no PII and do not run tracking scripts. If we
        add optional analytics later, it will be consent-gated.
      </p>
    </main>
  );
}


