'use client';

import React, { useState, useEffect } from 'react';
import { IInquiry, InquiryStatus } from '@/types';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import {
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  RefreshCw,
  Trash2,
  GraduationCap,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Tent,
  ShoppingBag,
  Utensils,
  Target,
  FileText,
  Building,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';

export default function AdminCRMPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [inquiries, setInquiries] = useState<IInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('all'); // all, courses, camp, corporate, bazar, food, contact
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<IInquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error('Failed to load CRM data', err);
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
        if (selectedInquiry && (selectedInquiry.id || (selectedInquiry as any)._id) === id) {
          setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا السجل نهائياً؟' : 'Permanently delete this record?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => (item.id || (item as any)._id) !== id));
        if (selectedInquiry && (selectedInquiry.id || (selectedInquiry as any)._id) === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete record', err);
    }
  };

  // Pipeline Metric Calculations
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter((i) => i.status === 'pending').length;
  const confirmedLeads = inquiries.filter((i) => i.status === 'confirmed').length;
  const courseReservationsCount = inquiries.filter((i) => i.category === 'courses').length;

  // Approximate Estimated Pipeline in EGP by parsing notes & participant values
  const estimatedRevenueEGP = inquiries.reduce((acc, curr) => {
    const match = curr.notes?.match(/([\d,]+)\s*(?:EGP|ج\.م)/i);
    if (match) {
      const num = parseInt(match[0].replace(/,/g, ''), 10);
      return acc + (isNaN(num) ? 0 : num);
    }
    return acc + (curr.estimatedParticipants ? curr.estimatedParticipants * 500 : 2500);
  }, 0);

  // Filter Logic across tabs & statuses
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;

    let matchesTab = true;
    if (activeTab === 'courses') matchesTab = inq.category === 'courses';
    else if (activeTab === 'camp') matchesTab = inq.category === 'camp';
    else if (activeTab === 'corporate') matchesTab = inq.category === 'corporate' || inq.category === 'kids_youth';
    else if (activeTab === 'bazar') matchesTab = inq.category === 'bazar' || Boolean(inq.notes?.includes('[SUPPLIES')) || Boolean(inq.notes?.includes('[UNIFORM'));
    else if (activeTab === 'food') matchesTab = Boolean(inq.notes?.includes('Catering Request')) || Boolean(inq.notes?.includes('Food'));
    else if (activeTab === 'contact') matchesTab = !inq.notes || Boolean(inq.notes.includes('Message / Inquiry'));

    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.notes && inq.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesTab && matchesSearch;
  });

  const getCategoryBadge = (category: string, notes?: string) => {
    if (category === 'courses') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-black bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{isAr ? 'حجز دورة تدريبية' : 'Course Seat'}</span>
        </span>
      );
    }
    if (category === 'camp') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
          <Tent className="w-3.5 h-3.5" />
          <span>{isAr ? 'حجز معسكر' : 'Camp Booking'}</span>
        </span>
      );
    }
    if (notes?.includes('[SUPPLIES') || notes?.includes('[UNIFORM') || category === 'bazar') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-black bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isAr ? 'طلب متجر / يونيفورم' : 'Store Order'}</span>
        </span>
      );
    }
    if (notes?.includes('Catering') || category === 'food') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
          <Utensils className="w-3.5 h-3.5" />
          <span>{isAr ? 'طلب ضيافة وإطعام' : 'Catering Order'}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-black bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
        <Target className="w-3.5 h-3.5" />
        <span>{isAr ? 'فعالية وبناء فرق' : 'Team Building'}</span>
      </span>
    );
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            {isAr ? 'مؤكد ومكتمل' : 'Confirmed'}
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3" />
            {isAr ? 'تم التواصل' : 'Contacted'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-gray-100 text-gray-600">
            <XCircle className="w-3 h-3" />
            {isAr ? 'ملغي' : 'Cancelled'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900">
            <Clock className="w-3 h-3" />
            {isAr ? 'قيد الانتظار' : 'Pending Action'}
          </span>
        );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Subsystem Nav */}
      <AdminNav lang={params.lang} />

      {/* 1. Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Estimated Pipeline */}
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between border border-white/10">
          <div>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
              {isAr ? 'إجمالي قيمة المبيعات المتوقعة' : 'Pipeline Estimated Value'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              {estimatedRevenueEGP.toLocaleString()} <span className="text-xs text-gray-300 font-bold">EGP</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium block mt-1">
              ↑ {confirmedLeads} {isAr ? 'حجز مؤكد حتى الآن' : 'confirmed bookings'}
            </span>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
              {isAr ? 'إجمالي الطلبات والاستفسارات' : 'Total Inquiries & Leads'}
            </span>
            <div className="text-3xl font-black text-gray-900 mt-1">{totalLeads}</div>
            <span className="text-[10px] text-blue-600 font-bold block mt-1">
              {pendingLeads} {isAr ? 'طلب جديد بحاجة للتواصل' : 'require team follow-up'}
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Course Students */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
              {isAr ? 'حجوزات دورات الأكاديمية' : 'Academy Course Registrations'}
            </span>
            <div className="text-3xl font-black text-indigo-600 mt-1">{courseReservationsCount}</div>
            <span className="text-[10px] text-gray-500 font-medium block mt-1">
              {isAr ? 'فرع المعادي • Roots' : 'Maadi Branch Placement'}
            </span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Follow-ups */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
              {isAr ? 'طلبات قيد المتابعة' : 'Pending Follow-ups'}
            </span>
            <div className="text-3xl font-black text-amber-600 mt-1">{pendingLeads}</div>
            <span className="text-[10px] text-amber-700 font-bold block mt-1">
              {isAr ? 'تتطلب اتصال هاتفي أو واتساب' : 'Action required'}
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Categorized Request Type Tabs (The Mini CRM Hub) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {isAr ? 'سجل الطلبات وإدارة العملاء (CRM)' : 'Client Requests & Leads Hub'}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {isAr
                ? 'استعرض كافة حجوزات الدورات، المعسكرات، طلبات الشراء، ورسائل التواصل في مكان واحد'
                : 'Manage course enrollments, camp bookings, store orders, and contact inquiries'}
            </p>
          </div>

          <button
            onClick={fetchInquiries}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'تحديث السجلات' : 'Refresh CRM'}</span>
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', labelEn: '🌐 All Requests', labelAr: '🌐 كافة الطلبات', count: inquiries.length },
            { id: 'courses', labelEn: '🎓 Courses & Academy', labelAr: '🎓 حجوزات الدورات', count: inquiries.filter((i) => i.category === 'courses').length },
            { id: 'camp', labelEn: '🏕️ Camp Bookings', labelAr: '🏕️ المعسكرات', count: inquiries.filter((i) => i.category === 'camp').length },
            { id: 'corporate', labelEn: '🎯 Events & Activities', labelAr: '🎯 الفعاليات والفرق', count: inquiries.filter((i) => i.category === 'corporate' || i.category === 'kids_youth').length },
            { id: 'bazar', labelEn: '🛍️ Store & Uniforms', labelAr: '🛍️ المتجر واليونيفورم', count: inquiries.filter((i) => i.category === 'bazar' || i.notes?.includes('[SUPPLIES') || i.notes?.includes('[UNIFORM')).length },
            { id: 'food', labelEn: '🍽️ Catering & Meals', labelAr: '🍽️ الضيافة والإطعام', count: inquiries.filter((i) => i.notes?.includes('Catering')).length },
            { id: 'contact', labelEn: '📩 Contact Messages', labelAr: '📩 رسائل اتصل بنا', count: inquiries.filter((i) => !i.notes || i.notes.includes('Message')).length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-gray-200/80 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute start-3.5 top-3" />
            <input
              type="text"
              placeholder={isAr ? 'بحث بالاسم، الهاتف، الدورة، المدينة...' : 'Search by name, phone, course, city...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            {['all', 'pending', 'contacted', 'confirmed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-colors ${
                  statusFilter === status ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Master CRM Data Table */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-24 text-center text-xs text-gray-500 font-bold">{isAr ? 'جاري تحميل سجلات العملاء...' : 'Loading client records...'}</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-24 text-center text-xs text-gray-500 font-bold space-y-2">
              <FileText className="w-8 h-8 text-gray-300 mx-auto" />
              <p>{isAr ? 'لا توجد طلبات مطابقة لهذا التصنيف.' : 'No matching records found in this category.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead className="bg-gray-50 text-gray-600 uppercase font-black border-b border-gray-100 tracking-wider text-[11px]">
                  <tr>
                    <th className="px-6 py-4">{isAr ? 'العميل / مقدم الطلب' : 'Client Details'}</th>
                    <th className="px-6 py-4">{isAr ? 'نوع الطلب' : 'Request Type'}</th>
                    <th className="px-6 py-4">{isAr ? 'التفاصيل والملاحظات' : 'Order & Course Details'}</th>
                    <th className="px-6 py-4">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="px-6 py-4 text-end">{isAr ? 'متابعة وإجراءات' : 'Actions & Follow-up'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredInquiries.map((inq) => {
                    const id = (inq.id || (inq as any)._id) as string;
                    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');

                    return (
                      <tr key={id} className="hover:bg-amber-50/40 transition-colors">
                        {/* Client Info */}
                        <td className="px-6 py-4">
                          <div className="font-black text-gray-900 text-sm">{inq.fullName}</div>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                            {/* Direct WhatsApp Action */}
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                isAr
                                  ? `مرحباً أستاذ(ة) ${inq.fullName}، نتواصل معكم بخصوص طلبكم لدى ماجيكا زون.`
                                  : `Hello ${inq.fullName}, we are contacting you regarding your request with Magica Zone.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{inq.phone}</span>
                            </a>
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-blue-600">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{inq.email}</span>
                            </a>
                          </div>
                        </td>

                        {/* Request Type Badge */}
                        <td className="px-6 py-4">
                          {getCategoryBadge(inq.category, inq.notes)}
                          <div className="text-gray-400 text-[10px] mt-1 font-mono">{inq.location || 'Cairo'}</div>
                        </td>

                        {/* Details */}
                        <td className="px-6 py-4 text-gray-700 max-w-sm">
                          <p className="font-medium text-xs line-clamp-2 leading-relaxed">{inq.notes || 'Direct request'}</p>
                          <span className="text-[10px] text-gray-400 block mt-1 font-mono">
                            {new Date(inq.createdAt).toLocaleString()}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">{getStatusBadge(inq.status)}</td>

                        {/* Status Switcher & Actions */}
                        <td className="px-6 py-4 text-end">
                          <div className="flex items-center justify-end gap-2">
                            <select
                              disabled={updatingId === id}
                              value={inq.status}
                              onChange={(e) => updateStatus(id, e.target.value as InquiryStatus)}
                              className="text-xs border border-gray-200 rounded-xl px-2.5 py-1.5 bg-white font-black text-gray-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                              title="View Full Record"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => deleteInquiry(id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
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
      </div>

      {/* 4. Customer Details Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">
                  {isAr ? 'تفاصيل سجل العميل' : 'Client CRM Record'}
                </span>
                <h3 className="text-xl font-black text-gray-900">{selectedInquiry.fullName}</h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">{isAr ? 'الهاتف' : 'Phone'}</span>
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">{isAr ? 'البريد الإلكتروني' : 'Email'}</span>
                  <span className="font-bold text-gray-900 block mt-0.5">{selectedInquiry.email}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl space-y-1">
                <span className="text-[10px] text-blue-600 uppercase font-black block">{isAr ? 'النوع والتصنيف' : 'Category'}</span>
                <div className="font-bold text-gray-900">{selectedInquiry.category}</div>
                <div className="text-gray-500">{selectedInquiry.location || 'Maadi Branch'}</div>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">{isAr ? 'تفاصيل الطلب والملاحظات:' : 'Full Request Content & Notes:'}</span>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl font-mono text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.notes || 'No extra notes provided.'}
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-600">{isAr ? 'تغيير الحالة:' : 'Update Status:'}</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateStatus((selectedInquiry.id || (selectedInquiry as any)._id), e.target.value as InquiryStatus)}
                    className="p-2 border rounded-xl font-bold bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}