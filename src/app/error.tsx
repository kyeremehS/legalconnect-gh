'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-gray-600">{error.message || 'Please try again.'}</p>
      <button
        onClick={reset}
        className="rounded border px-4 py-2 text-sm"
      >
        Try again
      </button>
    </div>
  );
}
