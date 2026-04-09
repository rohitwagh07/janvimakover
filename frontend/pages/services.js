import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';
import ServiceCard from '../components/user/ServiceCard';
import Loader from '../components/common/Loader';
import { getServices } from '../utils/api';

const categories = ['All', 'Hair', 'Skin', 'Makeup', 'Bridal'];

const categoryInfo = {
  Hair: { emoji: '💇‍♀️', desc: 'Haircut, Coloring, Treatments & Styling' },
  Skin: { emoji: '✨', desc: 'Facial, Bleach, Waxing & Skin Treatments' },
  Makeup: { emoji: '💄', desc: 'Party, Bridal & Everyday Makeup' },
  Bridal: { emoji: '👰', desc: 'Complete Bridal Packages & Makeover' },
};

export default function ServicesPage() {
  const router = useRouter();
  const { category: qCat } = router.query;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (qCat && categories.includes(qCat)) setActiveCategory(qCat);
  }, [qCat]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getServices(activeCategory !== 'All' ? activeCategory : null);
        setServices(res.data.services);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, [activeCategory]);

  const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <div className="page-hero">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="section-title">Our Services</h1>
          <p className="text-gray-500 text-sm sm:text-lg">
            Professional beauty treatments for hair, skin, makeup & bridal in Badlapur West
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 scale-105'
                  : 'bg-white text-gray-600 border border-pink-200 hover:border-rose-400 hover:text-rose-600'
              }`}>
              {categoryInfo[cat]?.emoji} {cat}
            </button>
          ))}
        </div>

        {/* Category description */}
        {activeCategory !== 'All' && categoryInfo[activeCategory] && (
          <div className="text-center mb-8 animate-fade-in">
            <p className="text-gray-500 text-sm">{categoryInfo[activeCategory].desc}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-72 shimmer rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-3">💅</p>
            <p className="text-gray-500 text-base sm:text-lg">No services found in this category.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 text-center">{filtered.length} services available</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
              {filtered.map(s => <ServiceCard key={s._id} service={s} />)}
            </div>
          </>
        )}

        {/* Info note */}
        <div className="mt-10 sm:mt-14 bg-rose-50 border border-rose-100 rounded-2xl p-4 sm:p-6 text-center">
          <p className="text-rose-700 font-semibold text-sm sm:text-base mb-2">📞 For Queries & Appointments</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Call or WhatsApp <strong className="text-rose-600">Janvi Bhagat: 9359866589</strong> · Open 10 AM – 8 PM daily
          </p>
          <p className="text-gray-400 text-xs mt-1">📍 Shop No. 5, Narmada Building, Kailash Nagar, Badlapur West, Thane</p>
        </div>
      </div>
    </Layout>
  );
}
