import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Loader from '../components/common/Loader';
import { getOffers } from '../utils/api';
import Link from 'next/link';
import { FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOffers().then(r => setOffers(r.data.offers)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const getDaysLeft = (validTill) => {
    const diff = Math.ceil((new Date(validTill) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <Layout>
      <div className="page-hero">
        <h1 className="section-title">Special Offers</h1>
        <p className="text-gray-500">Exclusive discounts and deals for our valued clients</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <Loader />
        ) : offers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🎁</p>
            <p className="text-gray-500 text-lg">No active offers right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer, i) => {
              const daysLeft = getDaysLeft(offer.validTill);
              const colors = [
                'from-rose-500 to-pink-600',
                'from-purple-500 to-pink-500',
                'from-amber-500 to-rose-500',
                'from-teal-500 to-emerald-600',
              ];
              return (
                <div key={offer._id} className="relative overflow-hidden rounded-3xl shadow-xl group">
                  <div className={`bg-gradient-to-br ${colors[i % colors.length]} p-8 text-white`}>
                    {/* Big discount badge */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full flex flex-col items-center justify-center backdrop-blur-sm border border-white/30">
                      <span className="text-2xl font-black leading-none">
                        {offer.discount}{offer.discountType === 'percentage' ? '%' : '₹'}
                      </span>
                      <span className="text-xs font-medium opacity-90">OFF</span>
                    </div>

                    <div className="pr-20">
                      <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
                        <FiTag size={11} /> Special Offer
                      </div>
                      <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{offer.title}</h3>
                      <p className="text-white/90 text-sm mb-5 leading-relaxed">{offer.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-white/80 text-xs">
                          <FiCalendar size={12} />
                          <span>
                            Valid till {new Date(offer.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        {daysLeft > 0 && daysLeft <= 7 && (
                          <span className="bg-white/25 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                            {daysLeft}d left!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-white/20">
                      <Link href="/booking"
                        className="inline-flex items-center gap-2 bg-white text-gray-800 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-rose-50 transition-colors group-hover:shadow-lg">
                        Avail This Offer <FiArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info */}
        <div className="mt-10 bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">ℹ️ Terms & Conditions</h4>
          <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
            <li>Offers valid during the specified period only</li>
            <li>Cannot be combined with other offers</li>
            <li>Subject to availability of slots</li>
            <li>Janvi Makeover reserves the right to modify or cancel offers</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
