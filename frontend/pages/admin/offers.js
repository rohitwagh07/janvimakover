import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllOffers, createOffer, updateOffer, deleteOffer } from '../../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const today = () => new Date().toISOString().split('T')[0];
const EMPTY = { title: '', description: '', discount: '', discountType: 'percentage', validFrom: today(), validTill: '', isActive: true };

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  const load = () => getAllOffers().then(r => setOffers(r.data.offers)).catch(() => {}).finally(() => setLoading(false));

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (o) => {
    setEditing(o);
    setForm({
      title: o.title, description: o.description, discount: o.discount,
      discountType: o.discountType, isActive: o.isActive,
      validFrom: o.validFrom?.split('T')[0] || today(),
      validTill: o.validTill?.split('T')[0] || '',
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await updateOffer(editing._id, form);
        setOffers(prev => prev.map(o => o._id === editing._id ? res.data.offer : o));
        toast.success('Offer updated!');
      } else {
        const res = await createOffer(form);
        setOffers(prev => [res.data.offer, ...prev]);
        toast.success('Offer created!');
      }
      setShowModal(false);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this offer?')) return;
    try {
      await deleteOffer(id);
      setOffers(prev => prev.filter(o => o._id !== id));
      toast.success('Offer deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <AdminLayout title="Manage Offers">
      <div className="flex justify-end mb-6">
        <button onClick={openAdd} className="btn-primary text-sm px-4 py-2"><FiPlus /> New Offer</button>
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {offers.length === 0 ? (
            <div className="col-span-2 text-center py-20 admin-card">
              <p className="text-4xl mb-3">🎁</p>
              <p className="text-gray-500">No offers yet. Create your first offer!</p>
            </div>
          ) : offers.map(o => {
            const expired = isExpired(o.validTill);
            return (
              <div key={o._id} className={`admin-card relative ${expired || !o.isActive ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-rose-600">{o.discount}{o.discountType === 'percentage' ? '%' : '₹'} OFF</span>
                    {expired && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Expired</span>}
                    {!o.isActive && !expired && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(o)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg"><FiEdit2 size={14} /></button>
                    <button onClick={() => handleDelete(o._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 size={14} /></button>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{o.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{o.description}</p>
                <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                  <span>From: {new Date(o.validFrom).toLocaleDateString('en-IN')}</span>
                  <span>Till: {new Date(o.validTill).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                {editing ? 'Edit Offer' : 'Create New Offer'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Offer Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="e.g. Monsoon Special" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="input-field resize-none" placeholder="Describe the offer..." required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Discount</label>
                  <input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} className="input-field" placeholder="20" required min="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select value={form.discountType} onChange={e => setForm(f => ({ ...f, discountType: e.target.value }))} className="input-field">
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat (₹)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valid From</label>
                  <input type="date" value={form.validFrom} onChange={e => setForm(f => ({ ...f, validFrom: e.target.value }))} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valid Till</label>
                  <input type="date" value={form.validTill} onChange={e => setForm(f => ({ ...f, validTill: e.target.value }))} className="input-field" required />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded text-rose-500" />
                <label htmlFor="isActive" className="text-sm text-gray-700 font-medium">Active offer</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center text-sm py-2.5">{saving ? 'Saving...' : editing ? 'Update' : 'Create Offer'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1 justify-center text-sm py-2.5">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
