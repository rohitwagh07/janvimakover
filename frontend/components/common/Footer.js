import Link from 'next/link';
import { FiPhone, FiMapPin, FiMail, FiClock, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🌸</span>
            <div>
              <h3 className="text-white text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Janvi Makeover</h3>
              <p className="text-xs text-rose-300">Beauty Salon & Academy</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-3 leading-relaxed">
            Professional beauty services by <strong className="text-gray-300">Janvi Bhagat</strong> in Badlapur West. ISO 9001:2015 certified academy.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://instagram.com/janvis_makeover_beauty" target="_blank" rel="noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-rose-500 transition-colors"><FiInstagram size={15} /></a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"><FaFacebook size={15} /></a>
            <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors"><FaWhatsapp size={15} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/services', 'Services'], ['/booking', 'Book Appointment'], ['/gallery', 'Gallery'], ['/offers', 'Offers'], ['/contact', 'Contact']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-sm text-gray-400 hover:text-rose-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-1.5">
            {['Facial', 'Korean Facial', 'Potli Facial', 'Bleach', 'Threading', 'Waxing', 'Hair Cutting', 'Global Highlights', 'Bridal Makeup', 'Party Makeup'].map(s => (
              <li key={s} className="text-sm text-gray-400 flex items-center gap-1.5">
                <span className="text-rose-600 text-xs">✦</span> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <FiMapPin className="text-rose-400 mt-0.5 flex-shrink-0" size={14} />
              <p className="text-sm text-gray-400 leading-relaxed">Shop No. 5, Narmada Building, Kailash Nagar, Valivali, <strong className="text-gray-300">Badlapur West</strong>, Thane – 421503</p>
            </div>
            <a href="tel:+919359866589" className="flex items-center gap-2.5 hover:text-rose-400 transition-colors group">
              <FiPhone className="text-rose-400 flex-shrink-0" size={14} />
              <div>
                <p className="text-sm text-gray-300">+91 93598 66589</p>
                <p className="text-xs text-gray-500">Janvi Bhagat</p>
              </div>
            </a>
            <a href="mailto:amrutvahini7@gmail.com" className="flex items-center gap-2.5 hover:text-rose-400 group">
              <FiMail className="text-rose-400 flex-shrink-0" size={14} />
              <span className="text-sm text-gray-400 break-all">amrutvahini7@gmail.com</span>
            </a>
            <div className="flex items-start gap-2.5">
              <FiClock className="text-rose-400 flex-shrink-0 mt-0.5" size={14} />
              <div>
                <p className="text-sm text-gray-300 font-semibold">10:00 AM – 8:00 PM</p>
                <p className="text-xs text-gray-500">Open All 7 Days</p>
              </div>
            </div>
            <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-600/20 border border-green-600/30 text-green-400 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-green-600/30 transition-colors">
              <FaWhatsapp size={14} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Janvi Makeover Beauty Salon & Academy. All rights reserved.</p>
          <p className="text-xs text-gray-600">Badlapur West, Thane, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
