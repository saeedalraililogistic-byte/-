import React, { useState } from 'react';
import { Salon, Service, Booking } from '../types.ts';
import { Calendar, Clock, DollarSign, User, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  salon: Salon;
  service: Service;
  onConfirm: (booking: Booking) => void;
  onCancel: () => void;
}

export const BookingModal: React.FC<Props> = ({
  salon,
  service,
  onConfirm,
  onCancel,
}) => {
  const [date, setDate] = useState('2026-09-17');
  const [time, setTime] = useState('16:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      _id: `bkg_${Date.now()}`,
      appointmentDate: date,
      appointmentTime: time,
      customerId: `usr_${Date.now()}`,
      salonId: salon._id,
      serviceId: service._id,
      status: 'confirmed',
      snapshot: {
        salonName: salon.salonName,
        serviceName: service.nameAr || service.name,
        staffName: 'أخصائية التجميل',
        totalAmount: service.price,
        currency: service.currency,
      },
    };

    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(newBooking);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl overflow-hidden">
        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">تم تأكيد الحجز بنجاح!</h3>
            <p className="text-xs text-slate-400">
              تم تسجيل الموعد في قاعدة البيانات، وإرسال بيانات الحجز لكلا الطرفين.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">حجز خدمة تجميل</h3>
                <span className="text-xs text-rose-400 font-semibold">{salon.salonName}</span>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 bg-slate-800 rounded-lg"
              >
                إلغاء
              </button>
            </div>

            {/* Summary Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-100">{service.nameAr || service.name}</div>
                  <div className="text-xs text-slate-500">{service.durationMins} دقيقة • مقدم الخدمة: {salon.salonName}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-400">{service.price} {service.currency}</div>
                  <div className="text-[10px] text-slate-500">شامل الضريبة</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-rose-400 font-semibold">وسيط حجز آمن عبر منصة تدلّلي</span>
                <span>الدفع المباشر أو عند الحضور</span>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  تاريخ الموعد:
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  الوقت:
                </label>
                <select
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="14:00">02:00 م</option>
                  <option value="15:00">03:00 م</option>
                  <option value="16:00">04:00 م</option>
                  <option value="17:00">05:00 م</option>
                  <option value="18:30">06:30 م</option>
                  <option value="20:00">08:00 م</option>
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">اسم العميلة:</label>
              <input
                type="text"
                required
                placeholder="الاسم الثلاثي..."
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">رقم الجوال:</label>
              <input
                type="tel"
                required
                placeholder="05XXXXXXXX"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <Sparkles className="w-4 h-4" />
              تأكيد حجز الموعد الآن
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
