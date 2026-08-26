'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Calendar, Upload, FileText, CheckCircle2, User as UserIcon, LogOut, Sparkles } from 'lucide-react';

export default function UserDashboard({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Assignment Form State
  const [courseTitle, setCourseTitle] = useState('Creative STEM & Structural Prototyping');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [fileOrUrl, setFileOrUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const json = await res.json();
      if (json.success && json.user) {
        setUser(json.user);
      } else {
        router.push(`/${params.lang}/login`);
      }
    } catch (err) {
      router.push(`/${params.lang}/login`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${params.lang}/login`);
    router.refresh();
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/dashboard/submit-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseTitle, assignmentTitle, fileOrUrl, notes }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmissionSuccess(true);
        setAssignmentTitle('');
        setFileOrUrl('');
        setNotes('');
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-gray-500">
        {isAr ? 'جاري تحميل لوحة التحكم...' : 'Loading your dashboard...'}
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 mb-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span className="capitalize">{user?.role}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{user?.name}</h1>
            <p className="text-xs text-blue-100 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-blue-700 hover:bg-blue-50 transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Enrolled Courses & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>{isAr ? 'دوراتي المسجلة والجدول الزمني' : 'My Enrolled Courses & Schedule'}</span>
          </h2>

          {user?.enrolledCourses?.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-xs text-gray-500">
              {isAr ? 'لم تقم بالتسجيل في أي دورات بعد.' : 'You have not enrolled in any courses yet.'}
            </div>
          ) : (
            <div className="space-y-4">
              {user?.enrolledCourses?.map((course: string, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                        {isAr ? 'دورة نشطة' : 'Active Course'}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2">{course}</h3>
                    </div>
                  </div>

                  {/* Schedule & Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-gray-50 rounded-xl text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{isAr ? 'المواعيد: السبت والثلاثاء (4:00 - 6:00 م)' : 'Days: Sat & Tue (4:00 PM - 6:00 PM)'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>{isAr ? 'المواد الدراسية: متاحة للتحميل' : 'Materials: Slide Decks & Worksheets'}</span>
                    </div>
                  </div>

                  {/* Material Downloads */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href="#download-materials"
                      onClick={(e) => { e.preventDefault(); alert(isAr ? 'تم بدء تحميل كتيب الورشة' : 'Downloading course syllabus & toolkit PDF'); }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      {isAr ? 'تحميل كراسة الأنشطة (PDF)' : 'Download Course Toolkit (PDF)'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Submissions History */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base">{isAr ? 'سجل الواجبات والمشاريع المسلمة' : 'Submitted Assignments'}</h3>
            {user?.submissions?.length === 0 ? (
              <p className="text-xs text-gray-500">{isAr ? 'لا توجد تسليمات سابقة.' : 'No assignments submitted yet.'}</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {user?.submissions?.map((sub: any, idx: number) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-gray-900">{sub.assignmentTitle}</div>
                      <div className="text-gray-500 text-[11px]">{sub.courseTitle} • {new Date(sub.submittedAt).toLocaleDateString()}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800 capitalize">
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Assignment Submission Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              <span>{isAr ? 'تسليم الواجب أو المشروع' : 'Submit Assignment'}</span>
            </h3>
            <p className="text-xs text-gray-500">{isAr ? 'أرسل رابط مشروعك أو الملف لتقييم المدرب' : 'Upload your homework or project link for instructor review'}</p>
          </div>

          {submissionSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'تم تسليم الواجب بنجاح للمدرب!' : 'Assignment submitted successfully!'}</span>
            </div>
          )}

          <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'الدورة التدريبية' : 'Course'}</label>
              <select
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Creative STEM & Structural Prototyping">Creative STEM & Structural Prototyping</option>
                <option value="Junior Leadership & Public Speaking">Junior Leadership & Public Speaking</option>
                <option value="Outdoor Survival & Scout Skills">Outdoor Survival & Scout Skills</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'عنوان الواجب / المشروع *' : 'Assignment Title *'}</label>
              <input
                required
                placeholder={isAr ? 'مثال: تصميم جسر هيدروليكي' : 'e.g. Bridge Prototype Model'}
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'رابط الملف / جوجل درايف / فيديو *' : 'File Link / Google Drive / URL *'}</label>
              <input
                required
                type="url"
                placeholder="https://drive.google.com/... or link"
                value={fileOrUrl}
                onChange={(e) => setFileOrUrl(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'ملاحظات للمدرب' : 'Notes for Instructor'}</label>
              <textarea
                rows={3}
                placeholder={isAr ? 'اكتب أي ملاحظات إضافية...' : 'Any comments on your submission...'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50"
            >
              {submitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تسليم الواجب' : 'Submit Assignment')}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}