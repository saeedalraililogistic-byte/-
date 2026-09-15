import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  ArrowLeft
} from 'lucide-react';

interface Props {
  onGoToSalonDashboard: () => void;
}

export const TrainingCoursesView: React.FC<Props> = ({ onGoToSalonDashboard }) => {
  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-rose-100 dark:border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-2">
            <GraduationCap className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            أكاديمية تدلّلي للتدريب
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">الدورات التدريبية المعتمدة</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            شهادات معتمدة ودورات تجميل تخصصية (فردية وجماعية) من كبرى خبيرات التجميل.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            شهادات معتمدة
          </span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            جماعية وخاصة
          </span>
        </div>
      </div>

      {/* Empty State with Call to action for salon owners */}
      <div className="bg-white dark:bg-[#121218] border border-rose-100 dark:border-slate-800/80 rounded-3xl p-10 sm:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-md shadow-rose-950/5">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-slate-900 border border-rose-200 dark:border-slate-800 flex items-center justify-center mx-auto text-rose-500 dark:text-slate-500 shadow-inner">
          <GraduationCap className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">لا توجد دورات متاحة حالياً للعموم</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          تابعينا قريباً لمزيد من الدورات التدريبية وورش العمل المتخصصة في المكياج، العناية بالبشرة، وتصفيف الشعر.
        </p>

        {/* Salon Owner CTA Card */}
        <div className="mt-8 pt-6 border-t border-rose-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-50/50 dark:bg-slate-950/80 p-5 rounded-2xl border border-rose-100 dark:border-slate-800">
          <div className="text-right flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">هل تمتلكين صالوناً أو أكاديمية؟</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">أضيفي دوراتك التدريبية وابدئي في استقبال الطالبات مباشرة</div>
            </div>
          </div>

          <button
            onClick={onGoToSalonDashboard}
            className="px-4 py-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>إدارة الصالون والدورات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
