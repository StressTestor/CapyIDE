export const metadata = {
  title: "Contact",
  description: "Contact CapyIDE: hello@capyide.dev, support@capyide.dev",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <ul className="mt-4 text-neutral-500 space-y-2">
        <li>
          General: <a className="underline" href="mailto:hello@capyide.dev">hello@capyide.dev</a>
        </li>
        <li>
          Support: <a className="underline" href="mailto:support@capyide.dev">support@capyide.dev</a>
        </li>
        <li>
          Security: <a className="underline" href="mailto:security@capyide.dev">security@capyide.dev</a>
        </li>
      </ul>
    </main>
  );
}


