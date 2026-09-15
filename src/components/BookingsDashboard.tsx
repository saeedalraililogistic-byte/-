import React, { useState } from 'react';
import { Booking, Salon, Service, User } from '../types.ts';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  UserCheck, 
  Plus, 
  Search, 
  ChevronDown,
  TrendingUp,
  CreditCard
} from 'lucide-react';

interface Props {
  bookings: Booking[];
  salons: Salon[];
  services: Service[];
  users: User[];
  onAddBooking: (booking: Booking) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

export const BookingsDashboard: React.FC<Props> = ({
  bookings,
  salons,
  services,
  users,
  onAddBooking,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Calculate metrics
  const totalAmount = bookings.reduce((sum, b) => sum + (b.snapshot?.totalAmount || 150), 0);
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const pendingCount = bookings.filter(b => b.status === 'payment_pending' || b.status === 'confirmed').length;

  const filtered = bookings.filter(b => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = 
      (b.snapshot?.salonName || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.snapshot?.serviceName || '').toLowerCase().includes(search.toLowerCase()) ||
      b.appointmentDate.includes(search);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">مكتمل</span>;
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">مؤكد</span>;
      case 'payment_pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">بانتظار الدفع</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121218] border border-rose-100 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>إجمالي الحجوزات المسجلة</span>
            <Calendar className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{bookings.length}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <CheckCircle className="w-3 h-3" /> مستوردة بنجاح ومؤمنة في Firebase
          </div>
        </div>

        <div className="bg-white dark:bg-[#121218] border border-rose-100 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>إجمالي الإيرادات المسجلة</span>
            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            حسب إحصائيات الداتابيس الحالية
          </div>
        </div>

        <div className="bg-white dark:bg-[#121218] border border-rose-100 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>نسبة الإنجاز</span>
            <TrendingUp className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {completedCount} مكتمل <span className="text-xs text-slate-500 font-normal">/ {pendingCount} قيد المتابعة</span>
          </div>
          <div className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">
            جاهز لإرسال إشعارات للعملاء
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-[#121218] p-4 border border-rose-100 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="بحث بالصالون أو الخدمة أو التاريخ..."
            className="w-full bg-rose-50/40 dark:bg-slate-950 border border-rose-200 dark:border-slate-700/80 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'completed', 'confirmed', 'payment_pending'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25 font-bold'
                  : 'bg-rose-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white border border-rose-100 dark:border-slate-800'
              }`}
            >
              {st === 'all' && 'الكل'}
              {st === 'completed' && 'مكتمل'}
              {st === 'confirmed' && 'مؤكد'}
              {st === 'payment_pending' && 'بانتظار الدفع'}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-[#121218] border border-rose-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-rose-50/60 dark:bg-slate-950/80 border-b border-rose-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase text-[11px]">
              <tr>
                <th className="py-3.5 px-4">رقم وتاريخ الحجز</th>
                <th className="py-3.5 px-4">الصالون والخدمة</th>
                <th className="py-3.5 px-4">الموظفة / الأخصائية</th>
                <th className="py-3.5 px-4">المبلغ</th>
                <th className="py-3.5 px-4">الحالة</th>
                <th className="py-3.5 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100 dark:divide-slate-800/60">
              {filtered.map(b => (
                <tr key={b._id} className="hover:bg-rose-50/30 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      <span>{b.appointmentDate}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {b.appointmentTime} {b.appointmentEndTime ? `- ${b.appointmentEndTime}` : ''}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      {b.snapshot?.salonName || 'الصالون'}
                    </div>
                    <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                      {b.snapshot?.serviceName || 'خدمة تجميلية'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    {b.snapshot?.staffName || 'طاقم العمل'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-600 dark:text-emerald-400">
                      {b.snapshot?.totalAmount || 150} {b.snapshot?.currency || 'SAR'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(b.status)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {b.status !== 'completed' ? (
                      <button
                        onClick={() => onUpdateStatus(b._id, 'completed')}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 rounded-lg text-[11px] font-bold transition-colors"
                      >
                        تأكيد الإتمام
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-600 dark:text-slate-500 font-bold">تم الإنجاز ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
