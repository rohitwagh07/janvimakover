import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/common/StatusBadge';
import { getBookings, updateBooking } from '../../utils/api';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import { FiSearch } from 'react-icons/fi';

const STATUSES = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    getBookings().then(r => setBookings(r.data.bookings)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    try {
      const res = await updateBooking(id, { status });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: res.data.booking.status } : b));
      toast.success(`Status updated to ${status}`);
    } catch { toast.error('Failed to update status'); }
    finally { setUpdating(null); }
  };

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'All' || b.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || b.customerName?.toLowerCase().includes(q) || b.customerPhone?.includes(q) || b.service?.name?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <AdminLayout title="Manage Bookings">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, service..."
            className="input-field pl-9 text-sm" />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === s ? 'bg-rose-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="admin-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Customer', 'Service', 'Date & Time', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-gray-500 font-semibold text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-16 text-center text-gray-400">No bookings found</td></tr>
                ) : filtered.map(b => (
                  <tr key={b._id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-800">{b.customerName}</p>
                      <p className="text-xs text-gray-400">{b.customerPhone}</p>
                      {b.user?.email && <p className="text-xs text-gray-400">{b.user.email}</p>}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-700">{b.service?.name || '—'}</p>
                      <p className="text-xs text-gray-400">{b.service?.category}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-700">{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      <p className="text-xs text-gray-400">{b.timeSlot}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-rose-600">₹{b.service?.price || '—'}</td>
                    <td className="py-3 px-4"><StatusBadge status={b.status} /></td>
                    <td className="py-3 px-4">
                      <select value={b.status}
                        onChange={e => handleStatusChange(b._id, e.target.value)}
                        disabled={updating === b._id}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-rose-400 bg-white disabled:opacity-50 cursor-pointer">
                        {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500">Showing {filtered.length} of {bookings.length} bookings</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
