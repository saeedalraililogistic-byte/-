import React from 'react';
import { Code2, Database, KeyRound, Rocket, CheckCircle2, ArrowLeft } from 'lucide-react';

export const RescuePlan: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'استيراد السورس كود وفحص الهيكل',
      desc: 'رفع الملفات أو لصق كود المشروع وفحص ملف package.json والاعتماديات لتشغيل الواجهة والسيرفر.',
      icon: Code2,
      tag: 'خطوة أولى فورية',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    },
    {
      id: 2,
      title: 'ربط وتشغيل قاعدة البيانات',
      desc: 'استيراد ملف الـ SQL dump أو ربط قاعدة بيانات PostgreSQL / Firebase بدون وسيط أو رسوم شهرية مجحفة.',
      icon: Database,
      tag: 'حفظ بياناتك بأمان',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 3,
      title: 'ضبط مفاتيح البيئة والخدمات (.env)',
      desc: 'نقل بوابات الدفع، التوثيق (Auth)، والخدمات الخارجية إلى حساباتك المباشرة الخاصة بك وحدك.',
      icon: KeyRound,
      tag: 'ملكية تامة لك',
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    },
    {
      id: 4,
      title: 'الفحص النهائي والإطلاق قبل الحملة',
      desc: 'تجربة كافة المسارات وصفحات التطبيق، والنشر المباشر عبر Cloud Run وربط الدومين الخاص بك.',
      icon: Rocket,
      tag: 'جاهز للإعلانات',
      color: 'from-amber-500/20 to-rose-500/20 border-amber-500/30 text-amber-400',
    },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            خطة العمل السريعة (خلال ساعات بدلاً من يومين)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            طالما تملك السورس كود والداتابيس، فأنت المالك الحقيقي 100% ولا تستطيع أي شركة ابتزازك
          </p>
        </div>
        <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 w-fit">
          4 خطوات للتشغيل الكامل
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 relative flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">0{s.id}</span>
                </div>
                <span className="inline-block text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded mb-2">
                  {s.tag}
                </span>
                <h3 className="text-base font-bold text-slate-100 mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
