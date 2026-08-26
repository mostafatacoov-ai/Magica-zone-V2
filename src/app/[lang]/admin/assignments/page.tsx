'use client';

import React, { useState, useEffect } from 'react';
import { AdminNav } from '@/components/modules/admin/AdminNav';
import { FileCheck, ExternalLink, User, Search, RefreshCw, CheckCircle2, Clock, Eye } from 'lucide-react';

export default function AdminAssignmentsPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/assignments');
      const json = await res.json();
      if (json.success) setSubmissions(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const updateSubmissionStatus = async (userId: string, submissionId: string, status: string) => {
    setUpdatingId(submissionId);
    try {
      const res = await fetch('/api/admin/assignments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, submissionId, status }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s.submissionId === submissionId ? { ...s, status } : s))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <AdminNav lang={params.lang} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isAr ? 'لوحة تقييم الواجبات ومشاريع الطلاب' : 'Teacher Assignment Review Portal'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isAr ? `إجمالي التسليمات: ${submissions.length}` : `Total Submissions: ${submissions.length}`}
          </p>
        </div>

        <button
          onClick={fetchSubmissions}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{isAr ? 'تحديث' : 'Refresh'}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
          <input
            type="text"
            placeholder={isAr ? 'بحث باسم الطالب أو الدورة...' : 'Search student or course...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {['all', 'submitted', 'reviewed', 'graded'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                statusFilter === st ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-500">Loading submissions...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-500">No assignment submissions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">Student</th>
                  <th className="px-6 py-3.5">Course & Assignment</th>
                  <th className="px-6 py-3.5">Submission Link</th>
                  <th className="px-6 py-3.5">Submitted Date</th>
                  <th className="px-6 py-3.5">Status & Grading</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.submissionId} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{item.studentName}</div>
                      <div className="text-gray-500 text-[11px]">{item.studentEmail}</div>
                      {item.studentPhone && <div className="text-gray-400 text-[10px]">{item.studentPhone}</div>}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{item.assignmentTitle}</div>
                      <div className="text-indigo-600 text-[11px] font-medium">{item.courseTitle}</div>
                      {item.notes && <div className="text-gray-500 text-[11px] italic mt-1">"{item.notes}"</div>}
                    </td>

                    <td className="px-6 py-4">
                      <a
                        href={item.fileOrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{isAr ? 'عرض الملف' : 'View Project'}</span>
                      </a>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          disabled={updatingId === item.submissionId}
                          value={item.status}
                          onChange={(e) =>
                            updateSubmissionStatus(item.userId, item.submissionId, e.target.value)
                          }
                          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1 bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none"
                        >
                          <option value="submitted">Submitted (قيد المراجعة)</option>
                          <option value="reviewed">Reviewed (تم الاطلاع)</option>
                          <option value="graded">Graded (تم التقييم)</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}