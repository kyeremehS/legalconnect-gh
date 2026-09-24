export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-semibold">Page not found</h2>
      <p className="text-sm text-gray-600">The page you requested does not exist.</p>
    </div>
  );
}
