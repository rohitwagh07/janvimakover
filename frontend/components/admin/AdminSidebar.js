import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { FiCalendar, FiLogOut, FiX } from 'react-icons/fi';
import { MdDashboard, MdSpa, MdPeople, MdLocalOffer, MdPhoto } from 'react-icons/md';

const links = [
  { href: '/admin', label: 'Dashboard', icon: MdDashboard },
  { href: '/admin/services', label: 'Services', icon: MdSpa },
  { href: '/admin/bookings', label: 'Bookings', icon: FiCalendar },
  { href: '/admin/users', label: 'Users', icon: MdPeople },
  { href: '/admin/offers', label: 'Offers', icon: MdLocalOffer },
  { href: '/admin/gallery', label: 'Gallery', icon: MdPhoto },
];

export default function AdminSidebar({ onClose }) {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = () => { logout(); router.push('/auth/login'); };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white w-64">
      <div className="p-5 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <div>
            <p className="text-sm font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Janvi Makeover</p>
            <p className="text-xs text-rose-300">Admin Panel</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-700 rounded"><FiX size={18} /></button>}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = router.pathname === href;
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-rose-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <Icon size={18} /> {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all mb-1">
          🌐 View Website
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-all">
          <FiLogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
