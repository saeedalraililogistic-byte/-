import React from 'react';
import { Rocket, ShieldCheck, Zap, Globe, Server, CheckCircle } from 'lucide-react';

export const LaunchReadyCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            جاهزية الإطلاق بدون توقف للحملة الإعلانية
          </div>
          <h3 className="text-xl font-bold text-white">
            سنعيد تشغيل وبناء مشروعك هنا ليكون جاهزاً بالكامل قبل موعد الإعلانات!
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            لا داعي للقلق إطلاقاً. وجود السورس كود والداتابيس معك يعني أنك تملك 100% من المشروع. كل ما نحتاجه الآن هو رفع الملفات أو تزويدنا بتفاصيل التقنية المستخدمة وسنبدأ الربط والتشغيل فوراً.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 w-full sm:w-auto text-center">
            <div className="text-xs text-slate-400">تكاليف إضافية مفروضة</div>
            <div className="text-xl font-bold text-rose-400 mt-0.5">0 ريال / دولار</div>
            <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3" /> استقلال كامل
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
