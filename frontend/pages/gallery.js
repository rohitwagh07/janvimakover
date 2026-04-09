import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Loader from '../components/common/Loader';
import { getGallery } from '../utils/api';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // Placeholder images since no real uploads exist yet
  const placeholderImages = [
    { _id: '1', title: 'Bridal Makeup', category: 'Bridal', imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
    { _id: '2', title: 'Hair Styling', category: 'Hair', imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80' },
    { _id: '3', title: 'Skin Treatment', category: 'Skin', imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80' },
    { _id: '4', title: 'Party Makeup', category: 'Makeup', imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80' },
    { _id: '5', title: 'Hair Color', category: 'Hair', imageUrl: 'https://images.unsplash.com/photo-1522337494-709c3b97e5c6?w=400&q=80' },
    { _id: '6', title: 'Bridal Look', category: 'Bridal', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80' },
    { _id: '7', title: 'Facial', category: 'Skin', imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80' },
    { _id: '8', title: 'Eye Makeup', category: 'Makeup', imageUrl: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&q=80' },
    { _id: '9', title: 'Mehendi', category: 'Bridal', imageUrl: 'https://images.unsplash.com/photo-1542838686-a4e08b6d093a?w=400&q=80' },
  ];

  useEffect(() => {
    getGallery()
      .then(r => { setImages(r.data.images.length ? r.data.images : placeholderImages); })
      .catch(() => setImages(placeholderImages))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="page-hero">
        <h1 className="section-title">Our Gallery</h1>
        <p className="text-gray-500">A glimpse of our beautiful transformations</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <Loader />
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, i) => (
              <div key={img._id} onClick={() => setSelected(img)}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-xl transition-all duration-300">
                <img src={img.imageUrl?.startsWith('/') ? `http://localhost:5000${img.imageUrl}` : img.imageUrl}
                  alt={img.title || 'Gallery'} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-semibold">{img.title}</p>
                    {img.category && <span className="text-xs text-rose-300">{img.category}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-4xl w-full animate-fade-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute -top-10 right-0 text-white text-3xl hover:text-rose-400 transition-colors">×</button>
            <img src={selected.imageUrl?.startsWith('/') ? `http://localhost:5000${selected.imageUrl}` : selected.imageUrl}
              alt={selected.title} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            {selected.title && (
              <p className="text-white text-center mt-3 font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>{selected.title}</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
