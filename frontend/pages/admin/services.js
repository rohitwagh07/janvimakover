import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllServices, createService, updateService, deleteService } from '../../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const EMPTY = { name: '', category: 'Hair', price: '', duration: '', description: '' };
const CATS = ['Hair', 'Skin', 'Makeup', 'Bridal'];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    getAllServices().then(r => setServices(r.data.services)).catch(() => {}).finally(() => setLoading(false));
  };

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ name: s.name, category: s.category, price: s.price, duration: s.duration, description: s.description }); setShowModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await updateService(editing._id, form);
        setServices(prev => prev.map(s => s._id === editing._id ? res.data.service : s));
        toast.success('Service updated!');
      } else {
        const res = await createService(form);
        setServices(prev => [res.data.service, ...prev]);
        toast.success('Service added!');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save service');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s._id !== id));
      toast.success('Service deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const displayed = activeTab === 'All' ? services : services.filter(s => s.category === activeTab);

  return (
    <AdminLayout title="Manage Services">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['All', ...CATS].map(c => (
            <button key={c} onClick={() => setActiveTab(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === c ? 'bg-rose-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300'}`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="btn-primary text-sm px-4 py-2">
          <FiPlus /> Add Service
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {displayed.map(s => (
            <div key={s._id} className={`admin-card hover:shadow-md transition-shadow ${!s.isActive ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">{s.category}</span>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><FiEdit2 size={14} /></button>
                  <button onClick={() => handleDelete(s._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><FiTrash2 size={14} /></button>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{s.name}</h3>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">{s.description}</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-gray-500 text-xs">⏱ {s.duration} min</span>
                <span className="font-bold text-rose-600">₹{s.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                {editing ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="e.g. Hair Cut & Style" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="input-field" placeholder="500" required min="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (min)</label>
                  <input type="number" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="input-field" placeholder="60" required min="1" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="input-field resize-none" placeholder="Describe the service..." required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center text-sm py-2.5">
                  {saving ? 'Saving...' : editing ? 'Update Service' : 'Add Service'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1 justify-center text-sm py-2.5">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
