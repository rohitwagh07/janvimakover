import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../../utils/api';
import toast from 'react-hot-toast';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import Loader from '../../components/common/Loader';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const fileRef = useRef();

  useEffect(() => { load(); }, []);

  const load = () => {
    getGallery().then(r => setImages(r.data.images)).catch(() => {}).finally(() => setLoading(false));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview({ file, url: URL.createObjectURL(file) });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!preview) { toast.error('Please select an image'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', preview.file);
      fd.append('title', title);
      fd.append('category', category);
      const res = await uploadGalleryImage(fd);
      setImages(prev => [res.data.gallery, ...prev]);
      setPreview(null); setTitle(''); setCategory('General');
      if (fileRef.current) fileRef.current.value = '';
      toast.success('Image uploaded!');
    } catch (err) { toast.error(err.response?.data?.message || 'Upload failed'); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteGalleryImage(id);
      setImages(prev => prev.filter(i => i._id !== id));
      toast.success('Image deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <AdminLayout title="Gallery Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Panel */}
        <div className="admin-card">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            <FiUpload className="text-rose-500" /> Upload Image
          </h3>
          <form onSubmit={handleUpload} className="space-y-4">
            {/* Drop zone */}
            <div
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${preview ? 'border-rose-400 bg-rose-50' : 'border-pink-200 hover:border-rose-400 hover:bg-pink-50'}`}>
              {preview ? (
                <div>
                  <img src={preview.url} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-2" />
                  <p className="text-xs text-gray-500">Click to change</p>
                </div>
              ) : (
                <>
                  <FiImage className="text-rose-300 text-4xl mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title (optional)</label>
              <input value={title} onChange={e => setTitle(e.target.value)} className="input-field text-sm" placeholder="e.g. Bridal Makeup Look" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="input-field text-sm">
                {['General', 'Hair', 'Skin', 'Makeup', 'Bridal'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" disabled={uploading || !preview} className="btn-primary w-full justify-center text-sm py-2.5 disabled:opacity-50">
              {uploading ? 'Uploading...' : '📤 Upload Image'}
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="lg:col-span-2">
          {loading ? <Loader /> : images.length === 0 ? (
            <div className="admin-card text-center py-16">
              <FiImage className="text-gray-300 text-5xl mx-auto mb-3" />
              <p className="text-gray-400">No images yet. Upload your first image!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {images.map(img => (
                <div key={img._id} className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={img.imageUrl?.startsWith('/') ? `http://localhost:5000${img.imageUrl}` : img.imageUrl}
                    alt={img.title} className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <button onClick={() => handleDelete(img._id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  {img.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
                      <p className="text-white text-xs truncate">{img.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
