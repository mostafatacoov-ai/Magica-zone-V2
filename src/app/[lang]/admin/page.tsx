'use client';

import React, { useState, useEffect } from 'react';
import { IInquiry, InquiryStatus } from '@/types';
import { Phone, Mail, Calendar, Users, CheckCircle2, Clock, XCircle, Search, RefreshCw, Trash2 } from 'lucide-react';
import { AdminNav } from '@/components/modules/admin/AdminNav';

export default function AdminInquiriesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [inquiries, setInquiries] = useState<IInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Inside export default function AdminInquiriesPage:
return (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
    <AdminNav lang={params.lang} />
    {/* ... rest of the existing Inquiries table ... */}
  </main>
);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error('Failed to load inquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: InquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((item) => ((item.id || (item as any)._id) === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا الطلب؟' : 'Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
      }
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.organization && inq.organization.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3.5 h-3.5" />{isAr ? 'مؤكد' : 'Confirmed'}</span>;
      case 'contacted':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><Clock className="w-3.5 h-3.5" />{isAr ? 'تم التواصل' : 'Contacted'}</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700"><XCircle className="w-3.5 h-3.5" />{isAr ? 'ملغي' : 'Cancelled'}</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"><Clock className="w-3.5 h-3.5" />{isAr ? 'قيد الانتظار' : 'Pending'}</span>;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isAr ? 'لوحة إدارة طلبات الحجز والفعاليات' : 'Inquiries & Bookings Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isAr ? `إجمالي الطلبات: ${inquiries.length}` : `Total Inquiries: ${inquiries.length}`}
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{isAr ? 'تحديث البيانات' : 'Refresh'}</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
          <input
            type="text"
            placeholder={isAr ? 'بحث بالاسم، الهاتف، البريد...' : 'Search by name, phone, email...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {['all', 'pending', 'contacted', 'confirmed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table / List View */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-sm text-gray-500">{isAr ? 'جاري تحميل الطلبات...' : 'Loading inquiries...'}</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center text-sm text-gray-500">{isAr ? 'لا توجد طلبات مطابقة للبحث.' : 'No matching inquiries found.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">{isAr ? 'العميل' : 'Client'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'البرنامج' : 'Program'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'المشاركون / التاريخ' : 'Group & Date'}</th>
                  <th className="px-6 py-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="px-6 py-3.5 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInquiries.map((inq) => {
                  const id = (inq.id || (inq as any)._id) as string;
                  return (
                    <tr key={id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Client Info */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 text-sm">{inq.fullName}</div>
                        <div className="flex items-center gap-3 mt-1 text-gray-500">
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{inq.phone}</span>
                          </a>
                          <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-blue-600">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{inq.email}</span>
                          </a>
                        </div>
                        {inq.notes && <p className="mt-1 text-xs text-gray-400 italic">"{inq.notes}"</p>}
                      </td>

                      {/* Program */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 capitalize">
                          {inq.category.replace('_', ' ')}
                        </span>
                        {inq.location && <div className="text-gray-400 text-xs mt-0.5">{inq.location}</div>}
                      </td>

                      {/* Metrics */}
                      <td className="px-6 py-4 text-gray-600 space-y-1">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span>{inq.estimatedParticipants} {isAr ? 'مشارك' : 'people'}</span>
                        </div>
                        {inq.eventDate && (
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(inq.eventDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">{getStatusBadge(inq.status)}</td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            disabled={updatingId === id}
                            value={inq.status}
                            onChange={(e) => updateStatus(id, e.target.value as InquiryStatus)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => deleteInquiry(id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}