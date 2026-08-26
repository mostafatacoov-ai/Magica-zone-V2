'use client';

import React, { useState, useEffect } from 'react';
import { IUser, UserRole } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { UserPlus, Shield, UserCheck, GraduationCap, Briefcase, Search, RefreshCw, X, Trash2 } from 'lucide-react';

export default function AdminUsersPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'teacher' as UserRole,
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      if (json.success) setUsers(json.data);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchUsers();
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.phone && u.phone.includes(searchQuery));
    return matchesRole && matchesSearch;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800"><Shield className="w-3 h-3" />Admin</span>;
      case 'teacher':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800"><GraduationCap className="w-3 h-3" />Teacher / Coach</span>;
      case 'employee':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800"><Briefcase className="w-3 h-3" />Staff / Facilitator</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700"><UserCheck className="w-3 h-3" />Student / Client</span>;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <AdminNav lang={params.lang} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isAr ? 'إدارة المستخدمين والمعلمين وفريق العمل' : 'Staff, Teachers & User Roles'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isAr ? `إجمالي المستخدمين: ${users.length}` : `Total Accounts: ${users.length}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={fetchUsers} className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border rounded-xl hover:bg-gray-50">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'تحديث' : 'Refresh'}</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isAr ? 'إضافة موظف / معلم جديد' : 'Add Staff / Teacher'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
          <input
            type="text"
            placeholder={isAr ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {['all', 'admin', 'teacher', 'employee', 'student'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                roleFilter === r ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">Loading accounts...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Email & Phone</th>
                  <th className="px-6 py-3.5">Role / Permissions</th>
                  <th className="px-6 py-3.5">Enrolled / Assigned</th>
                  <th className="px-6 py-3.5">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u) => {
                  const id = (u.id || (u as any)._id) as string;
                  return (
                    <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 text-sm">{u.name}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <div>{u.email}</div>
                        <div className="text-gray-400 text-[11px]">{u.phone || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">{getRoleBadge(u.role)}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {u.enrolledCourses?.length || 0} items
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{isAr ? 'إضافة مستخدم جديد' : 'Add Staff or Teacher Account'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email Address *</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              </div>

              <div>
                <label className="block font-semibold mb-1">Phone Number</label>
                <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              </div>

              <div>
                <label className="block font-semibold mb-1">Password *</label>
                <input required type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              </div>

              <div>
                <label className="block font-semibold mb-1">Assigned Role *</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })} className="w-full p-2.5 border rounded-xl">
                  <option value="teacher">Teacher / Coach (Instructor)</option>
                  <option value="employee">Employee / Facilitator (Staff)</option>
                  <option value="admin">Administrator (Full Access)</option>
                  <option value="student">Student / Client</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}