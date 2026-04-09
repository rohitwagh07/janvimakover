export default function StatusBadge({ status }) {
  const map = {
    Pending:   'bg-yellow-100 text-yellow-800 border border-yellow-200',
    Confirmed: 'bg-blue-100 text-blue-800 border border-blue-200',
    Completed: 'bg-green-100 text-green-800 border border-green-200',
    Cancelled: 'bg-red-100 text-red-800 border border-red-200',
  };
  const icons = { Pending: '⏳', Confirmed: '✅', Completed: '🎉', Cancelled: '❌' };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {icons[status]} {status}
    </span>
  );
}
