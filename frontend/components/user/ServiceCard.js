import Link from 'next/link';
import { FiClock } from 'react-icons/fi';

const catColors = { Hair: 'bg-purple-100 text-purple-700', Skin: 'bg-green-100 text-green-700', Makeup: 'bg-pink-100 text-pink-700', Bridal: 'bg-rose-100 text-rose-700' };
const catEmoji = { Hair: '💇', Skin: '✨', Makeup: '💄', Bridal: '👰' };

export default function ServiceCard({ service }) {
  return (
    <div className="card group hover:-translate-y-1 transition-all duration-300">
      <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 flex items-center justify-between">
        <span className="text-4xl">{catEmoji[service.category] || '💅'}</span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${catColors[service.category] || 'bg-gray-100 text-gray-700'}`}>
          {service.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-rose-600 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
          {service.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{service.description}</p>
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="flex items-center gap-1 text-gray-500"><FiClock size={13} /> {service.duration} min</span>
          <span className="font-bold text-rose-600 text-lg">₹{service.price}</span>
        </div>
        <Link href="/booking" className="btn-primary w-full justify-center text-sm py-2.5">Book Now</Link>
      </div>
    </div>
  );
}
