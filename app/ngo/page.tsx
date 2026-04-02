import Link from 'next/link';

export default function NgoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">For NGOs</h1>
        <p className="text-foreground/70 mb-6">
          NGO collaboration tools are coming soon.
        </p>
        <Link href="/find-help" className="text-primary hover:underline">
          View listed NGO organizations
        </Link>
      </div>
    </main>
  );
}
