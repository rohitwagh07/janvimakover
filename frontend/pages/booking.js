import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';
import { getServices, createBooking } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiUser, FiPhone, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

// 10 AM to 8 PM slots (matching business hours)
const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
];

const getTodayStr = () => new Date().toISOString().split('T')[0];

export default function BookingPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(null);

  const [form, setForm] = useState({
    service: '',
    date: '',
    timeSlot: '',
    customerName: '',
    customerPhone: '',
    notes: '',
  });

  useEffect(() => {
    getServices().then(r => { setServices(r.data.services); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) setForm(f => ({ ...f, customerName: user.name || '', customerPhone: user.phone || '' }));
  }, [user]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to book an appointment'); router.push('/auth/login'); return; }
    if (!form.service || !form.date || !form.timeSlot || !form.customerName || !form.customerPhone) {
      toast.error('Please fill all required fields'); return;
    }
    setSubmitting(true);
    try {
      const res = await createBooking(form);
      setBooked(res.data.booking);
      toast.success('Appointment booked successfully! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally { setSubmitting(false); }
  };

  const selectedService = services.find(s => s._id === form.service);

  if (booked) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center animate-slide-up">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiCheckCircle className="text-green-500 text-3xl sm:text-4xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Booking Confirmed! 🎉
            </h2>
            <p className="text-gray-500 text-sm mb-5">Your appointment has been booked. We'll confirm it shortly on your phone!</p>
            <div className="bg-pink-50 rounded-2xl p-4 text-left space-y-2.5 mb-5">
              {[
                ['Service', booked.service?.name],
                ['Date', new Date(booked.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
                ['Time', booked.timeSlot],
                ['Name', booked.customerName],
                ['Phone', booked.customerPhone],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-800 text-right max-w-48">{val}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-1 border-t border-pink-100">
                <span className="text-gray-500">Status</span>
                <span className="text-yellow-600 font-semibold">⏳ Pending Confirmation</span>
              </div>
            </div>

            {/* Contact reminder */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-5">
              <p className="text-green-700 text-xs sm:text-sm font-medium">
                💬 You can also confirm via WhatsApp:<br />
                <a href="https://wa.me/919359866589" className="font-bold hover:underline">9359866589</a> (Janvi Bhagat)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/my-bookings" className="btn-primary flex-1 justify-center text-sm py-2.5">My Bookings</Link>
              <button onClick={() => { setBooked(null); setForm({ service:'', date:'', timeSlot:'', customerName: user?.name||'', customerPhone: user?.phone||'', notes:'' }); }}
                className="btn-outline flex-1 justify-center text-sm py-2.5">Book Another</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-hero">
        <h1 className="section-title">Book Appointment</h1>
        <p className="text-gray-500 text-sm sm:text-base">Schedule your beauty session at Janvi Makeover, Badlapur West</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        {!user && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 sm:p-4 mb-6 flex items-start gap-3">
            <span className="text-rose-500 text-lg flex-shrink-0">ℹ️</span>
            <p className="text-rose-700 text-xs sm:text-sm">
              Please <Link href="/auth/login" className="font-semibold underline">login</Link> or{' '}
              <Link href="/auth/register" className="font-semibold underline">register</Link> to book an appointment and track your bookings.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-md p-5 sm:p-8 space-y-5 sm:space-y-6">

              {/* Service Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Service *</label>
                {loading ? <div className="h-12 shimmer rounded-xl" /> : (
                  <select name="service" value={form.service} onChange={handleChange} className="input-field" required>
                    <option value="">Choose a service...</option>
                    {['Hair', 'Skin', 'Makeup', 'Bridal'].map(cat => (
                      <optgroup key={cat} label={`── ${cat} ──`}>
                        {services.filter(s => s.category === cat).map(s => (
                          <option key={s._id} value={s._id}>{s.name} — ₹{s.price} ({s.duration} min)</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiCalendar className="inline mr-1" /> Select Date *
                </label>
                <input type="date" name="date" value={form.date} onChange={handleChange} min={getTodayStr()} className="input-field" required />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiClock className="inline mr-1" /> Select Time Slot * <span className="text-gray-400 font-normal text-xs">(10 AM – 8 PM)</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button type="button" key={slot} onClick={() => setForm(f => ({ ...f, timeSlot: slot }))}
                      className={`py-2 text-xs font-medium rounded-xl border transition-all duration-150 ${
                        form.timeSlot === slot
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                          : 'bg-white text-gray-600 border-pink-200 hover:border-rose-400 hover:text-rose-600'
                      }`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiUser className="inline mr-1" /> Your Name *
                  </label>
                  <input type="text" name="customerName" value={form.customerName} onChange={handleChange}
                    placeholder="Enter your full name" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FiPhone className="inline mr-1" /> Phone Number *
                  </label>
                  <input type="tel" name="customerPhone" value={form.customerPhone} onChange={handleChange}
                    placeholder="e.g. 9359866589" className="input-field" required />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Notes (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Any special requirements or preferences..." rows={3} className="input-field resize-none" />
              </div>

              <button type="submit" disabled={submitting}
                className="btn-primary w-full justify-center text-sm sm:text-base py-3.5 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />Booking...</>
                  : '🌸 Confirm Appointment'}
              </button>

              {/* WhatsApp alternative */}
              <div className="text-center pt-1">
                <p className="text-gray-400 text-xs mb-2">Or book directly via WhatsApp</p>
                <a href="https://wa.me/919359866589?text=Hi, I want to book an appointment at Janvi Makeover"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:underline">
                  <FaWhatsapp size={16} /> Chat on WhatsApp: 9359866589
                </a>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-4">
            {selectedService && (
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-4 sm:p-5 animate-fade-in border border-rose-100">
                <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Service Summary
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Service', selectedService.name],
                    ['Category', selectedService.category],
                    ['Duration', `${selectedService.duration} min`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-medium text-gray-700">{v}</span>
                    </div>
                  ))}
                  <div className="border-t border-pink-200 pt-2 flex justify-between font-bold">
                    <span>Price</span>
                    <span className="text-rose-600 text-base sm:text-lg">₹{selectedService.price}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Parlor Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-5">
              <h4 className="font-semibold text-gray-700 mb-3 text-xs sm:text-sm flex items-center gap-1.5">
                <FiMapPin className="text-rose-500" size={14} /> Location
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Shop No. 5, Narmada Building,<br />
                Kailash Nagar, Valivali-Manjri Road,<br />
                Valivali, <strong>Badlapur West</strong>,<br />
                Thane – 421503
              </p>
              <div className="mt-3 pt-3 border-t border-pink-100 space-y-1">
                <div className="flex items-center gap-2">
                  <FiClock size={12} className="text-rose-400" />
                  <p className="text-xs text-gray-500"><strong>10:00 AM – 8:00 PM</strong> (Daily)</p>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone size={12} className="text-rose-400" />
                  <a href="tel:+919359866589" className="text-xs text-gray-500 hover:text-rose-600">9359866589 (Janvi Bhagat)</a>
                </div>
              </div>
            </div>

            {/* Quick call card */}
            <a href="tel:+919359866589"
              className="flex items-center gap-3 bg-rose-600 text-white rounded-2xl p-4 hover:bg-rose-700 transition-colors group">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiPhone size={18} />
              </div>
              <div>
                <p className="text-xs text-rose-200">Call to book</p>
                <p className="font-bold text-sm sm:text-base">9359866589</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
