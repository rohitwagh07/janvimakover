export default function Loader({ fullPage = false }) {
  const spinner = <div className="w-10 h-10 border-4 border-pink-200 border-t-rose-600 rounded-full animate-spin" />;
  if (fullPage) return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50 flex-col gap-3">
      {spinner}
      <p className="text-rose-500 text-sm font-medium">Loading...</p>
    </div>
  );
  return <div className="flex justify-center items-center py-12">{spinner}</div>;
}
