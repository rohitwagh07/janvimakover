import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getUsers, toggleUserStatus } from '../../utils/api';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import { FiSearch } from 'react-icons/fi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toggling, setToggling] = useState(null);

  useEffect(() => {
    getUsers().then(r => setUsers(r.data.users)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id, isActive) => {
    setToggling(id);
    try {
      await toggleUserStatus(id, !isActive);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isActive: !isActive } : u));
      toast.success(`User ${!isActive ? 'activated' : 'deactivated'}`);
    } catch { toast.error('Failed to update user'); }
    finally { setToggling(null); }
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.phone?.includes(q);
  });

  return (
    <AdminLayout title="Manage Users">
      <div className="mb-6 max-w-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="input-field pl-9 text-sm" />
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="admin-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['User', 'Phone', 'Joined', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-gray-500 font-semibold text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="py-16 text-center text-gray-400">No users found</td></tr>
                ) : filtered.map(u => (
                  <tr key={u._id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm flex-shrink-0">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{u.phone}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.isActive ? '● Active' : '● Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button onClick={() => handleToggle(u._id, u.isActive)} disabled={toggling === u._id}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${u.isActive ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                        {toggling === u._id ? '...' : u.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500">{filtered.length} users total</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
