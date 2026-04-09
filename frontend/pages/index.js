import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/common/Layout';
import ServiceCard from '../components/user/ServiceCard';
import { getServices, getOffers } from '../utils/api';
import { FiArrowRight, FiStar, FiPhone, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { GiFlowerEmblem, GiLipstick, GiHairStrands } from 'react-icons/gi';
import { MdSpa, MdSchool } from 'react-icons/md';

const testimonials = [
  { name: 'Priya Sharma', text: 'Janvi Makeover transformed my look completely! The bridal makeup was absolutely stunning. Everyone at my wedding was asking about my makeup artist.', rating: 5, service: 'Bridal Makeup' },
  { name: 'Neha Patil', text: 'Korean facial is amazing! My skin is glowing like never before. Janvi tai is very skilled and professional. Highly recommended to everyone!', rating: 5, service: 'Korean Facial' },
  { name: 'Riya Desai', text: 'I took the Professional Beauty Parlor Course here. The training is excellent and very practical. Now I run my own parlor. Thank you Janvi tai!', rating: 5, service: 'Professional Course' },
  { name: 'Anita Joshi', text: 'The Potli Facial treatment is just wow! My skin feels so fresh and rejuvenated. Staff is very friendly and the parlor is so clean and hygienic.', rating: 5, service: 'Potli Facial' },
];

const categories = [
  { name: 'Hair', icon: GiHairStrands, desc: 'Cut, Color & Treatments', color: 'from-purple-50 to-violet-100', iconColor: 'text-purple-500', count: 4 },
  { name: 'Skin', icon: MdSpa, desc: 'Facials & Skincare', color: 'from-green-50 to-emerald-100', iconColor: 'text-emerald-500', count: 6 },
  { name: 'Makeup', icon: GiLipstick, desc: 'Party & Everyday', color: 'from-pink-50 to-rose-100', iconColor: 'text-rose-500', count: 3 },
  { name: 'Bridal', icon: GiFlowerEmblem, desc: 'Complete Bridal Packages', color: 'from-amber-50 to-yellow-100', iconColor: 'text-amber-500', count: 4 },
];

const courses = [
  {
    name: 'Basic Beauty Parlor Course',
    duration: '30 Days',
    fee: '₹3,999',
    freeGift: '₹1,350',
    color: 'from-pink-500 to-rose-600',
    topics: ['Threading', 'Bleaching', 'Facial', 'Waxing', 'Manicure', 'Pedicure', 'Hair Style', 'Mehndi Dye', 'Haircut (5 Types)', 'All Body Waxing', 'Upper Lips & Head Massage'],
  },
  {
    name: 'Makeup Course',
    duration: '15 Days',
    fee: '₹6,499',
    freeGift: '₹2,350 Makeup Kit',
    color: 'from-violet-500 to-purple-600',
    topics: ['Simple Makeup', 'Foundation Makeup', 'Bridal Makeup', 'Self Makeup', 'Engagement Makeup'],
  },
  {
    name: 'Professional Beauty Parlor Course',
    duration: '2 Months',
    fee: '₹15,999',
    freeGift: '₹5,750',
    color: 'from-amber-500 to-orange-600',
    topics: ['Threading', 'Faceskin', 'Bleaching', 'Facial', 'Manicure', 'Pedicure', 'Waxing', 'Advance Hair Spa', 'Haircut (All Types)', 'Makeup (Basic + Party)', 'Hair Style (5 Types)', 'Saree Draping (5 Types)', 'Parlor Management', 'Product Knowledge', 'Machine Knowledge'],
    badge: 'Most Popular',
  },
];

export default function Home() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, oRes] = await Promise.all([getServices(), getOffers()]);
        setFeaturedServices(sRes.data.services.slice(0, 6));
        setOffers(oRes.data.offers.slice(0, 2));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 sm:w-12 bg-rose-300" />
            <span className="text-rose-500 text-xs sm:text-sm font-medium tracking-widest uppercase">Beauty Salon & Academy</span>
            <div className="h-px w-8 sm:w-12 bg-rose-300" />
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <GiFlowerEmblem className="text-rose-400 text-3xl sm:text-5xl animate-float" />
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-800 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Janvi<br /><span className="text-rose-600">Makeover</span>
            </h1>
            <GiFlowerEmblem className="text-rose-400 text-3xl sm:text-5xl animate-float" style={{ animationDelay: '1s' }} />
          </div>

          <p className="text-base sm:text-2xl text-rose-500 font-light italic mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            "Enhance Your Natural Beauty"
          </p>
          <p className="text-sm sm:text-base text-gray-500 mb-1 font-medium">Professional Makeup Artist · Beauty Salon & Academy</p>
          <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">Badlapur West, Thane · ISO 9001:2015 Certified</p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-8 sm:mb-10">
            <Link href="/booking" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 justify-center">
              Book Appointment <FiArrowRight />
            </Link>
            <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-600 transition-all hover:shadow-lg text-sm sm:text-base">
              <FaWhatsapp size={18} /> WhatsApp Us
            </a>
            <a href="tel:+919359866589" className="btn-outline text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 justify-center">
              <FiPhone size={15} /> 9359866589
            </a>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-10 justify-center">
            {[['500+', 'Happy Clients'], ['15+', 'Services'], ['10AM–8PM', 'Open Daily'], ['ISO', 'Certified']].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-lg sm:text-2xl font-bold text-rose-600" style={{ fontFamily: 'Playfair Display, serif' }}>{num}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-rose-300 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── OFFER BANNER ── */}
      {offers.length > 0 && (
        <section className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...offers, ...offers].map((o, i) => (
              <span key={i} className="flex items-center gap-3 px-6 text-xs sm:text-sm font-medium">
                🌸 <strong>{o.title}</strong> — {o.discount}{o.discountType === 'percentage' ? '%' : '₹'} OFF &nbsp;★
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── SERVICE CATEGORIES ── */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-title">Our Service Categories</h2>
          <p className="section-subtitle">Professional beauty services for every occasion</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {categories.map(({ name, icon: Icon, desc, color, iconColor, count }) => (
            <Link key={name} href={`/services?category=${name}`}
              className={`bg-gradient-to-br ${color} p-4 sm:p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}>
              <Icon className={`${iconColor} text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform`} />
              <h3 className="font-bold text-gray-800 text-sm sm:text-lg mb-0.5 sm:mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{name}</h3>
              <p className="text-gray-500 text-xs mb-1 sm:mb-2 hidden sm:block">{desc}</p>
              <span className="text-xs font-semibold text-rose-500">{count} Services</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-pink-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Expert beauty treatments tailored just for you</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-72 shimmer rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredServices.map(s => <ServiceCard key={s._id} service={s} />)}
            </div>
          )}
          <div className="text-center mt-8 sm:mt-10">
            <Link href="/services" className="btn-outline">View All Services <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ── COURSES SECTION ── */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              <MdSchool size={14} /> ISO 9001:2015 Certified Academy
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Beauty Courses & Training
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Learn from professionals and start your own beauty business. Certificate provided after training completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {courses.map((course, i) => (
              <div key={i} className="relative bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-rose-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl">
                {course.badge && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    ⭐ {course.badge}
                  </div>
                )}
                <div className={`bg-gradient-to-r ${course.color} p-5 sm:p-6`}>
                  <h3 className="text-base sm:text-xl font-bold text-white mb-3 pr-16" style={{ fontFamily: 'Playfair Display, serif' }}>{course.name}</h3>
                  <div className="flex gap-3">
                    <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                      <p className="text-xs text-white/80">Duration</p>
                      <p className="font-bold text-white text-sm">{course.duration}</p>
                    </div>
                    <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                      <p className="text-xs text-white/80">Fee</p>
                      <p className="font-bold text-white text-sm">{course.fee}</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-white/15 rounded-lg px-3 py-1.5 inline-block">
                    <p className="text-xs text-white/90">🎁 Free Gift Worth <span className="font-bold">{course.freeGift}</span></p>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Curriculum</p>
                  <ul className="space-y-1.5">
                    {course.topics.map((t, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                        <span className="text-rose-400 mt-0.5 flex-shrink-0">✦</span> {t}
                      </li>
                    ))}
                  </ul>
                  <a href={`https://wa.me/919359866589?text=Hi, I am interested in ${encodeURIComponent(course.name)}`}
                    target="_blank" rel="noreferrer"
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
                    <FaWhatsapp size={16} /> Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-rose-900/30 border border-rose-700/40 rounded-2xl p-4 sm:p-6 text-center">
            <p className="text-rose-300 text-xs sm:text-sm font-medium">
              🏛️ Affiliated with <strong>Amrutvahini Bahudeshiya Pratishthan</strong> · Maharashtra Govt. Recognized · ISO 9001:2015
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Certificate provided after training · Limited seats (Max 20 students only) · Contact: <strong className="text-rose-300">Janvi Bhagat — 9359866589</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-title">Why Choose Janvi Makeover?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {[
            { icon: '🌸', title: 'Expert Stylist', desc: 'Janvi Bhagat — trained professional makeup artist with years of experience.' },
            { icon: '💎', title: 'Premium Products', desc: 'Top-quality, skin-friendly products from trusted brands for best results.' },
            { icon: '🏛️', title: 'ISO Certified', desc: 'ISO 9001:2015 certified academy. Maharashtra Government recognized institution.' },
            { icon: '✨', title: 'Hygienic & Safe', desc: 'Strict hygiene standards. Clean, sanitized tools and fresh environment every visit.' },
            { icon: '🕐', title: 'Flexible Timing', desc: 'Open 10 AM to 8 PM daily. Book online anytime for your convenience.' },
            { icon: '🎓', title: 'Academy & Courses', desc: '3 professional courses with certificate. Start your own parlor after training!' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center p-4 sm:p-6 rounded-2xl hover:bg-pink-50 transition-colors group">
              <div className="text-3xl sm:text-5xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</div>
              <h3 className="font-bold text-gray-800 text-sm sm:text-lg mb-1 sm:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-rose-50 to-pink-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Real reviews from our happy customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <FiStar key={j} className="text-amber-400 fill-amber-400" size={12} />)}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-rose-500">{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready for Your Makeover?
          </h2>
          <p className="text-rose-100 mb-6 sm:mb-8 text-sm sm:text-lg">
            Book your appointment or enquire about our beauty courses today!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/booking"
              className="bg-white text-rose-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
              <FiArrowRight /> Book Appointment
            </Link>
            <a href="https://wa.me/919359866589" target="_blank" rel="noreferrer"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-rose-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaWhatsapp size={18} /> WhatsApp: 9359866589
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-4">
            <a href="https://instagram.com/janvis_makeover_beauty" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-rose-100 hover:text-white text-xs sm:text-sm transition-colors">
              <FiInstagram size={15} /> @janvis_makeover_beauty
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 18s linear infinite; display: flex; }
      `}</style>
    </Layout>
  );
}
