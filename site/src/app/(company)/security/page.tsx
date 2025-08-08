export const metadata = {
  title: "Security",
  description: "Security posture aligned to OWASP ASVS L2 and OWASP Top 10.",
};

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Security</h1>
      <p className="mt-4 text-neutral-500">
        Controls mapped to OWASP ASVS Level 2 and OWASP Top 10. See
        SECURITY.md for full details.
      </p>
    </main>
  );
}


