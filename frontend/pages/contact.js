import Layout from '../components/common/Layout';
import { FiPhone, FiMapPin, FiMail, FiClock, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <Layout>
      <div className="page-hero">
        <h1 className="section-title">Contact Us</h1>
        <p className="text-gray-500 text-sm sm:text-base">We'd love to hear from you. Get in touch!</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">

          {/* ── Contact Info ── */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Get In Touch
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiMapPin className="text-rose-500" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">Our Location</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  Shop No. 5, Narmada Building,<br />
                  Kailash Nagar, Valivali-Manjri Road,<br />
                  Valivali, <strong>Badlapur West</strong>, Thane – 421503
                </p>
                <a href="https://maps.google.com/?q=Badlapur+West,+Thane,+Maharashtra"
                  target="_blank" rel="noreferrer"
                  className="text-rose-500 text-xs font-medium hover:underline mt-1.5 inline-block">
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Phone */}
            <a href="tel:+919359866589"
              className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-pink-100 hover:shadow-md hover:border-rose-200 transition-all group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500 transition-colors">
                <FiPhone className="text-rose-500 group-hover:text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">Call Us</h3>
                <p className="text-gray-600 font-semibold text-base sm:text-lg">+91 93598 66589</p>
                <p className="text-gray-400 text-xs mt-0.5">Janvi Bhagat</p>
                <p className="text-rose-500 text-xs font-medium mt-1">Tap to call</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
              className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-pink-100 hover:shadow-md hover:border-green-200 transition-all group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                <FaWhatsapp className="text-green-500 group-hover:text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">WhatsApp</h3>
                <p className="text-gray-600 font-semibold text-base sm:text-lg">+91 93598 66589</p>
                <p className="text-green-600 text-xs font-medium mt-1">Chat with us on WhatsApp</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:amrutvahini7@gmail.com"
              className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-all group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                <FiMail className="text-blue-500 group-hover:text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">Email Us</h3>
                <p className="text-gray-600 text-sm">amrutvahini7@gmail.com</p>
              </div>
            </a>

            {/* Working Hours */}
            <div className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-2xl shadow-sm border border-pink-100">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiClock className="text-amber-500" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Working Hours</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monday – Saturday</span>
                    <span className="font-semibold text-gray-700">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sunday</span>
                    <span className="font-semibold text-gray-700">10:00 AM – 8:00 PM</span>
                  </div>
                </div>
                <p className="text-xs text-rose-500 mt-2 font-medium">Open 7 days a week!</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://instagram.com/janvis_makeover_beauty" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
                <FiInstagram size={15} /> @janvis_makeover_beauty
              </a>
              <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
                <FaWhatsapp size={15} /> 9359866589
              </a>
            </div>

            {/* Academy info box */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 border border-rose-200 rounded-2xl p-4 sm:p-5">
              <h4 className="font-bold text-rose-700 mb-2 text-sm">🎓 Academy Affiliation</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <strong>Amrutvahini Bahudeshiya Pratishthan</strong><br />
                Maharashtra Govt. Recognized · ISO 9001:2015 Certified<br />
                MSME No: UDYAM-MH-01-0087904<br />
                NGO DARPAN No: MH/2022/0330311
              </p>
            </div>
          </div>

          {/* ── Map ── */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Find Us Here
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-pink-100 mb-5" style={{ height: '340px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.1734!2d73.2376!3d19.1563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ef0000000001%3A0x0!2sBadlapur+West%2C+Thane%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Janvi Makeover Location — Badlapur West"
              />
            </div>

            {/* Quick contact card */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-2xl p-5 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Book an Appointment</h3>
              <p className="text-rose-100 text-xs sm:text-sm mb-4">Call or WhatsApp us to schedule your visit. We're happy to help!</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+919359866589"
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-rose-600 py-2.5 sm:py-3 rounded-xl font-bold text-sm hover:bg-rose-50 transition-colors">
                  <FiPhone size={15} /> Call Now
                </a>
                <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 sm:py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors">
                  <FaWhatsapp size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
