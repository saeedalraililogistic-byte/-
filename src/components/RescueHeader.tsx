import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, Zap, AlertTriangle } from 'lucide-react';

export const RescueHeader: React.FC = () => {
  // Countdown to 48 hours deadline
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  مركز استعادة وتجهيز المشروع للإطلاق السريع
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  جاهز للتشغيل
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5">
                حماية مشروعك من الاستغلال، وتجهيز السورس كود وقاعدة البيانات للإطلاق المستقل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2 text-amber-200">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400 block font-medium">الوقت المتبقي لبدء الحملة الإعلانية:</span>
              <span className="font-mono font-bold text-amber-300 text-sm tracking-wider">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')} ساعة
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
