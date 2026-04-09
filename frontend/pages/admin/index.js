import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/common/StatusBadge';
import { getBookingStats } from '../../utils/api';
import Loader from '../../components/common/Loader';

const StatCard = ({ label, value, icon, color, sub }) => (
  <div className={`admin-card border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className="text-4xl opacity-80">{icon}</div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookingStats()
      .then(r => setData(r.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLayout title="Dashboard"><Loader /></AdminLayout>;

  const { stats, upcoming } = data || { stats: {}, upcoming: [] };

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Bookings" value={stats.total || 0} icon="📅" color="border-rose-500" />
        <StatCard label="Pending" value={stats.pending || 0} icon="⏳" color="border-yellow-400" sub="Needs confirmation" />
        <StatCard label="Confirmed" value={stats.confirmed || 0} icon="✅" color="border-blue-500" />
        <StatCard label="Completed" value={stats.completed || 0} icon="🎉" color="border-green-500" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today's Bookings" value={stats.todayBookings || 0} icon="🌸" color="border-pink-500" sub="New today" />
        <StatCard label="Cancelled" value={stats.cancelled || 0} icon="❌" color="border-red-400" />
      </div>

      {/* Upcoming Appointments */}
      <div className="admin-card">
        <h2 className="text-lg font-bold text-gray-800 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
          Upcoming Appointments
        </h2>
        {upcoming.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-4xl mb-2">📅</p>
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 text-gray-500 font-semibold">Customer</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-semibold">Service</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-semibold">Date</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-semibold">Time</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {upcoming.map(b => (
                  <tr key={b._id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="py-3 px-2">
                      <p className="font-semibold text-gray-800">{b.customerName}</p>
                      <p className="text-xs text-gray-400">{b.customerPhone}</p>
                    </td>
                    <td className="py-3 px-2 text-gray-600">{b.service?.name || '—'}</td>
                    <td className="py-3 px-2 text-gray-600">{new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td className="py-3 px-2 text-gray-600">{b.timeSlot}</td>
                    <td className="py-3 px-2"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
