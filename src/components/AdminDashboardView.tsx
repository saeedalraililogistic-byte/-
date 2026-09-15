import React from 'react';
import { 
  Building2, 
  Users, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Tag, 
  CreditCard, 
  ShieldAlert, 
  RotateCcw,
  Sparkles,
  Search,
  ChevronLeft
} from 'lucide-react';
import { Salon, Booking } from '../types.ts';
import { TedallalyLogo } from './TedallalyLogo.tsx';

interface Props {
  salons: Salon[];
  bookings: Booking[];
}

export const AdminDashboardView: React.FC<Props> = ({ salons, bookings }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#121218] border border-rose-500/30 flex items-center justify-center p-1.5 shadow-md shadow-rose-500/10">
            <TedallalyLogo size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">لوحة الإدارة</h2>
            </div>
            <p className="text-xs text-rose-400 font-semibold mt-0.5">سعيد جمال • مدير المنصة</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            نظام الإدارة الموحد
          </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Verified Salons */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Verified Salons</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-3">1</div>
          <div className="text-[11px] text-slate-500 mt-1">صالون إحسان (جدة)</div>
        </div>

        {/* Total Salons */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Total Salons</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 mt-3">5</div>
          <div className="text-[11px] text-slate-500 mt-1">الرياض وجدة</div>
        </div>

        {/* Total Users */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Total Users</span>
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-black text-pink-400 mt-3">13</div>
          <div className="text-[11px] text-slate-500 mt-1">عميلات وملاك صالونات</div>
        </div>

        {/* Today's Bookings */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Today's Bookings</span>
            <Calendar className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400 mt-3">1</div>
          <div className="text-[11px] text-slate-500 mt-1">حجوزات اليوم النشطة</div>
        </div>

        {/* Total Bookings */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Total Bookings</span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">28</div>
          <div className="text-[11px] text-emerald-400 mt-1">13 مكتمل ✓</div>
        </div>

        {/* Pending Review */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 mt-3">0</div>
          <div className="text-[11px] text-slate-500 mt-1">كل الحسابات مفحوصة</div>
        </div>

        {/* Platform Fees */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Platform Fees</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-3">SAR 267.27</div>
          <div className="text-[11px] text-slate-500 mt-1">عمولة المنصة الصافية</div>
        </div>

        {/* Gross Revenue */}
        <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden sm:col-span-2">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Gross Revenue (إجمالي المبيعات)</span>
            <TrendingUp className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-pink-400 mt-3">SAR 2494.83</div>
          <div className="text-[11px] text-slate-400 mt-1">إجمالي إيرادات الحجوزات المسجلة بقاعدة بياناتك</div>
        </div>
      </div>

      {/* Admin Modules Quick Grid */}
      <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">أقسام إدارة المنصة:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'الصالونات', count: '5', icon: Building2 },
            { label: 'المستقلات', count: 'نشط', icon: Sparkles },
            { label: 'الكوبونات', count: '3 مفعلة', icon: Tag },
            { label: 'المستخدمون', count: '13', icon: Users },
            { label: 'الحجوزات', count: '28', icon: Calendar },
            { label: 'المدفوعات', count: 'Tap Gateway', icon: CreditCard },
            { label: 'المسترجعات', count: '0 طلب', icon: RotateCcw },
            { label: 'الامتثال القانوني', count: 'موثق رسمياً', icon: ShieldAlert },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-rose-500/40 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-slate-200">{item.label}</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
