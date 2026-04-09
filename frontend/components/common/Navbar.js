import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiCalendar, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/offers', label: 'Offers' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  const handleLogout = () => { logout(); router.push('/'); };

  return (
    <>
      {/* Top info bar - desktop */}
      <div className="hidden sm:block bg-rose-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📍 Shop No.5, Kailash Nagar, Badlapur West, Thane &nbsp;|&nbsp; 🕐 10:00 AM – 8:00 PM Daily</span>
          <span className="flex items-center gap-4">
            <a href="https://instagram.com/janvis_makeover_beauty" target="_blank" rel="noreferrer" className="hover:text-rose-200">📸 @janvis_makeover_beauty</a>
            <a href="tel:+919359866589" className="hover:text-rose-200">📞 9359866589</a>
          </span>
        </div>
      </div>

      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-rose-500 text-2xl">🌸</span>
              <div>
                <p className="text-base sm:text-lg font-bold text-rose-700 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Janvi Makeover</p>
                <p className="text-xs text-pink-400 hidden sm:block leading-none">Beauty Salon & Academy</p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className={`text-sm font-medium hover:text-rose-600 transition-colors relative group ${router.pathname === l.href ? 'text-rose-600' : 'text-gray-600'}`}>
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-rose-500 transition-all ${router.pathname === l.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-2">
              <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-green-600 transition-colors">
                <FaWhatsapp size={14} /> WhatsApp
              </a>
              <Link href="/booking" className="btn-primary text-xs px-4 py-2">
                <FiCalendar size={13} /> Book Now
              </Link>
              {user ? (
                <>
                  {user.role === 'admin'
                    ? <Link href="/admin" className="btn-secondary text-xs px-4 py-2"><FiUser size={13} /> Admin</Link>
                    : <Link href="/my-bookings" className="btn-secondary text-xs px-4 py-2"><FiUser size={13} /> My Bookings</Link>
                  }
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-rose-600 transition-colors" title="Logout">
                    <FiLogOut size={16} />
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors">Login</Link>
              )}
            </div>

            {/* Mobile right */}
            <div className="flex items-center gap-2 lg:hidden">
              <a href="tel:+919359866589" className="flex items-center gap-1 bg-rose-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                <FiPhone size={11} /> Call
              </a>
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-600 hover:bg-pink-50 rounded-lg">
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-pink-100 shadow-lg animate-slide-up">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className={`block py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-pink-50 hover:text-rose-600 transition-colors ${router.pathname === l.href ? 'text-rose-600 bg-pink-50' : 'text-gray-600'}`}>
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-pink-100 space-y-2">
                <Link href="/booking" className="btn-primary w-full justify-center text-sm py-2.5"><FiCalendar size={14} /> Book Appointment</Link>
                <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-full font-semibold text-sm hover:bg-green-600">
                  <FaWhatsapp size={15} /> WhatsApp: 9359866589
                </a>
                {user ? (
                  <>
                    {user.role === 'admin'
                      ? <Link href="/admin" className="btn-secondary w-full justify-center text-sm py-2.5">Admin Dashboard</Link>
                      : <Link href="/my-bookings" className="btn-secondary w-full justify-center text-sm py-2.5">My Bookings</Link>
                    }
                    <button onClick={handleLogout} className="w-full py-2.5 text-sm text-red-500 font-medium flex items-center justify-center gap-2">
                      <FiLogOut size={14} /> Logout
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/auth/login" className="flex-1 py-2.5 text-center text-sm font-medium text-gray-600 border border-pink-200 rounded-full">Login</Link>
                    <Link href="/auth/register" className="flex-1 py-2.5 text-center text-sm font-semibold text-white bg-rose-600 rounded-full">Register</Link>
                  </div>
                )}
                <div className="pt-2 border-t border-pink-100">
                  <p className="text-xs text-gray-400">📍 Shop No.5, Kailash Nagar, Badlapur West</p>
                  <p className="text-xs text-gray-400 mt-0.5">🕐 10:00 AM – 8:00 PM Daily</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
