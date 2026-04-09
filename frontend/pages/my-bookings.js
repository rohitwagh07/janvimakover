import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';
import StatusBadge from '../components/common/StatusBadge';
import Loader from '../components/common/Loader';
import { getBookings, updateBooking } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import Link from 'next/link';

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      getBookings().then(r => { setBookings(r.data.bookings); setLoading(false); }).catch(() => setLoading(false));
    }
  }, [user]);

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(id);
    try {
      await updateBooking(id, { status: 'Cancelled' });
      setBookings(b => b.map(x => x._id === id ? { ...x, status: 'Cancelled' } : x));
      toast.success('Booking cancelled successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
    } finally { setCancelling(null); }
  };

  if (authLoading || loading) return <Layout><Loader fullPage /></Layout>;

  return (
    <Layout>
      <div className="page-hero">
        <h1 className="section-title">My Bookings</h1>
        <p className="text-gray-500">Manage your appointments at Janvi Makeover</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📅</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>No bookings yet</h3>
            <p className="text-gray-500 mb-6">Book your first appointment with us!</p>
            <Link href="/booking" className="btn-primary">Book Appointment</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b._id} className="bg-white rounded-2xl shadow-md border border-pink-50 p-5 hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500 flex-shrink-0">
                      💅
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {b.service?.name || 'Service'}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <FiCalendar size={11} /> {new Date(b.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <FiClock size={11} /> {b.timeSlot}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <FiTag size={11} /> {b.service?.category}
                        </span>
                      </div>
                      {b.service?.price && (
                        <p className="text-rose-600 font-bold text-sm mt-1">₹{b.service.price}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.status} />
                    {['Pending', 'Confirmed'].includes(b.status) && (
                      <button onClick={() => handleCancel(b._id)} disabled={cancelling === b._id}
                        className="text-xs font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
                        {cancelling === b._id ? 'Cancelling...' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </div>
                {b.notes && (
                  <p className="mt-3 pt-3 border-t border-pink-50 text-xs text-gray-500 italic">
                    📝 {b.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
