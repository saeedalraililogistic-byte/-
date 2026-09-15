import React, { useState } from 'react';
import { Salon, Service, Booking } from '../types.ts';
import { 
  Calendar, 
  Clock, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Phone, 
  MapPin, 
  Scissors, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  FileText
} from 'lucide-react';

interface Props {
  salon: Salon;
  service: Service;
  availableServices?: Service[];
  onConfirm: (booking: Booking) => void;
  onCancel: () => void;
}

export const BookingModal: React.FC<Props> = ({
  salon,
  service: initialService,
  availableServices = [],
  onConfirm,
  onCancel,
}) => {
  // Current active step in the stepper: 1 = Service, 2 = Date/Time, 3 = Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedService, setSelectedService] = useState<Service>(initialService);
  const [date, setDate] = useState(() => {
    // Default to tomorrow or today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('16:00');
  const [staffName, setStaffName] = useState('أي أخصائية متاحة (أسرع حجز)');
  const [serviceLocation, setServiceLocation] = useState<'salon' | 'home'>('salon');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'on_arrival' | 'electronic'>('on_arrival');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  // Service list for salon
  const salonServices = availableServices.length > 0 ? availableServices : [initialService];

  // Available Time Slots
  const timeSlots = [
    { time: '11:00', label: '11:00 ص', period: 'صباحي' },
    { time: '12:30', label: '12:30 م', period: 'ظهيرة' },
    { time: '14:00', label: '02:00 م', period: 'ظهيرة' },
    { time: '15:30', label: '03:30 م', period: 'مسائي' },
    { time: '16:00', label: '04:00 م', period: 'مسائي' },
    { time: '17:30', label: '05:30 م', period: 'مسائي' },
    { time: '19:00', label: '07:00 م', period: 'مسائي' },
    { time: '20:30', label: '08:30 م', period: 'مسائي' },
  ];

  // Quick date chips
  const getQuickDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    return [
      { label: 'اليوم', val: today.toISOString().split('T')[0] },
      { label: 'غداً', val: tomorrow.toISOString().split('T')[0] },
      { label: 'بعد غد', val: dayAfter.toISOString().split('T')[0] },
    ];
  };

  const steps = [
    { number: 1, title: 'اختيار الخدمة', subtitle: 'الخدمة والباقة' },
    { number: 2, title: 'تحديد الوقت', subtitle: 'الموعد والأخصائية' },
    { number: 3, title: 'تأكيد الحجز', subtitle: 'البيانات والدفع' },
  ];

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      return;
    }

    const bookingRef = `TED-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: Booking = {
      _id: `bkg_${Date.now()}`,
      appointmentDate: date,
      appointmentTime: time,
      customerId: `usr_${Date.now()}`,
      salonId: salon._id,
      serviceId: selectedService._id,
      staffId: staffName,
      status: paymentMethod === 'on_arrival' ? 'confirmed' : 'confirmed',
      snapshot: {
        salonName: salon.salonName,
        serviceName: selectedService.nameAr || selectedService.name,
        staffName: staffName,
        totalAmount: selectedService.price,
        currency: selectedService.currency,
        taxAmount: Math.round(selectedService.price * 0.15 * 100) / 100,
      },
    };

    setConfirmedBookingId(bookingRef);
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(newBooking);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-[#121218] border border-rose-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 relative shadow-2xl overflow-hidden transition-all my-auto">
        
        {/* Success View */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-scaleUp">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 border-2 border-emerald-300 dark:border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 mb-2">
                رقم الحجز: {confirmedBookingId}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">تم تأكيد حجزك بنجاح!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                يسرنا إبلاغك بتأكيد موعدك في <strong className="text-rose-600 dark:text-rose-400">{salon.salonName}</strong> لخدمة <strong className="text-rose-600 dark:text-rose-400">{selectedService.nameAr || selectedService.name}</strong>.
              </p>
            </div>

            <div className="bg-rose-50/50 dark:bg-slate-950 p-4 rounded-2xl border border-rose-100 dark:border-slate-800 text-right text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500">التاريخ والوقت:</span>
                <span className="font-bold">{date} • {time}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500">الاسم والجوال:</span>
                <span className="font-bold">{clientName} ({clientPhone})</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500">الإجمالي:</span>
                <span className="font-black text-rose-600 dark:text-emerald-400">{selectedService.price} {selectedService.currency}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>تم حفظ تفاصيل الحجز ومزامنته مع تطبيق تدلّلي وقاعدة البيانات</span>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header with Salon Info and Close button */}
            <div className="flex items-center justify-between border-b border-rose-100 dark:border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">حجز موعد تجميل</h3>
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>{salon.salonName}</span>
                    <span className="text-slate-400">•</span>
                    <span>{salon.city}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs px-2.5 py-1 bg-rose-50/70 dark:bg-slate-800/80 hover:bg-rose-100 dark:hover:bg-slate-700 rounded-xl transition-colors font-medium cursor-pointer"
              >
                إغلاق
              </button>
            </div>

            {/* PROGRESS STEPPER BAR */}
            <div className="bg-rose-50/40 dark:bg-slate-950/60 p-3 sm:p-4 rounded-2xl border border-rose-100 dark:border-slate-800">
              <div className="relative flex items-center justify-between">
                {/* Connecting Track Line behind steps */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
                <div 
                  className="absolute top-4 right-6 h-0.5 bg-gradient-to-l from-rose-500 to-pink-500 -z-0 transition-all duration-300"
                  style={{
                    width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
                  }}
                />

                {steps.map((st) => {
                  const isCompleted = currentStep > st.number;
                  const isCurrent = currentStep === st.number;
                  const isUpcoming = currentStep < st.number;

                  return (
                    <div 
                      key={st.number}
                      className="relative z-10 flex flex-col items-center cursor-pointer group"
                      onClick={() => {
                        // Allow clicking back to already completed steps
                        if (isCompleted) {
                          setCurrentStep(st.number as 1 | 2 | 3);
                        }
                      }}
                    >
                      <div 
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                          isCompleted
                            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                            : isCurrent
                            ? 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white ring-4 ring-rose-500/20 shadow-lg shadow-rose-600/40 scale-105'
                            : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          st.number
                        )}
                      </div>
                      <div className="mt-1.5 text-center">
                        <div 
                          className={`text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap ${
                            isCurrent 
                              ? 'text-rose-600 dark:text-rose-400' 
                              : isCompleted 
                              ? 'text-slate-800 dark:text-slate-200' 
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {st.title}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block">
                          {st.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: اختيار الخدمة وتفاصيلها */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>الخدمة المطلوبة:</span>
                    <span className="text-[11px] font-normal text-slate-500">اختر الخدمة أو أكد اختيارك</span>
                  </label>

                  {/* List of salon services if multiple, or active selected one */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {salonServices.map((srv) => {
                      const isSelected = selectedService._id === srv._id;
                      return (
                        <div
                          key={srv._id}
                          onClick={() => setSelectedService(srv)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-400 dark:border-rose-500/50 shadow-xs ring-1 ring-rose-500/30'
                              : 'bg-white dark:bg-slate-950 border-rose-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                isSelected 
                                  ? 'bg-rose-600 text-white' 
                                  : 'bg-rose-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              <Scissors className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white">
                                {srv.nameAr || srv.name}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                                <span>{srv.durationMins} دقيقة</span>
                                {srv.isHomeService && (
                                  <>
                                    <span>•</span>
                                    <span className="text-rose-600 dark:text-rose-400 font-semibold">متاح كخدمة منزلية</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-left">
                            <div className="text-xs font-black text-rose-600 dark:text-emerald-400">
                              {srv.price} {srv.currency}
                            </div>
                            <div className="text-[9px] text-slate-400">شامل الضريبة</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Service Location Option */}
                {selectedService.isHomeService && (
                  <div className="p-3 bg-rose-50/30 dark:bg-slate-950 rounded-2xl border border-rose-100 dark:border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">مكان تقديم الخدمة:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setServiceLocation('salon')}
                        className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          serviceLocation === 'salon'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-rose-100 dark:border-slate-800'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>في مقر الصالون</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceLocation('home')}
                        className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          serviceLocation === 'home'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-rose-100 dark:border-slate-800'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>خدمة منزلية (في بيتك)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Additional Notes / Special Preferences */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ملاحظات أو طلبات خاصة (اختياري):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="مثال: نوع الشعر، حساسية معينة، أو تفضيل تجميلي..."
                    className="w-full bg-rose-50/30 dark:bg-slate-950 border border-rose-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Step 1 Actions */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>متابعة لتحديد الوقت والموعد</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: تحديد الوقت والموعد */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                {/* Date Selection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      <span>اختر تاريخ الموعد:</span>
                    </label>
                    <div className="flex gap-1">
                      {getQuickDates().map(chip => (
                        <button
                          key={chip.val}
                          type="button"
                          onClick={() => setDate(chip.val)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                            date === chip.val
                              ? 'bg-rose-600 text-white font-bold'
                              : 'bg-rose-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-rose-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 font-sans"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>اختر الوقت المناسب:</span>
                  </label>

                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(slot => {
                      const isSelected = time === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setTime(slot.time)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30'
                              : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-rose-100 dark:border-slate-800 hover:border-rose-300'
                          }`}
                        >
                          <div>{slot.label}</div>
                          <div className={`text-[9px] font-normal ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                            {slot.period}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specialist / Staff preference */}
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-rose-500" />
                    <span>تفضيل الأخصائية / خبيرة التجميل:</span>
                  </label>
                  <select
                    value={staffName}
                    onChange={e => setStaffName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-rose-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="أي أخصائية متاحة (أسرع حجز)">أي أخصائية متاحة (أسرع حجز)</option>
                    <option value="أخصائية التجميل سارة (مكياج وشعر)">أخصائية التجميل سارة (مكياج وشعر)</option>
                    <option value="أخصائية العناية نورة (بشرة ومساج)">أخصائية العناية نورة (بشرة ومساج)</option>
                    <option value="خبيرة الأظافر ريم">خبيرة الأظافر ريم</option>
                  </select>
                </div>

                {/* Step 2 Actions (Back and Next) */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>متابعة لتأكيد الحجز والدفع</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: تأكيد الحجز والبيانات والدفع */}
            {currentStep === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                {/* Summary Card */}
                <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-slate-950 border border-rose-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ملخص الموعد المختار:</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">الخدمة:</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{selectedService.nameAr || selectedService.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">الصالون:</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{salon.salonName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">التاريخ والوقت:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{date} • {time}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">الأخصائية:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{staffName.split(' ')[0]} {staffName.split(' ')[1] || ''}</span>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-2 border-t border-rose-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="text-slate-500">الإجمالي المستحق (شامل 15% ضريبة):</div>
                    <div className="text-base font-black text-rose-600 dark:text-emerald-400">
                      {selectedService.price} {selectedService.currency}
                    </div>
                  </div>
                </div>

                {/* Client Information Form */}
                <div className="space-y-2.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-rose-500" />
                      <span>اسم العميلة:</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="الاسم الكامل لتسجيل الحجز..."
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-rose-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-rose-500" />
                      <span>رقم الجوال لتأكيد الحجز:</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-rose-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500 font-mono"
                    />
                  </div>
                </div>

                {/* Payment method option */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-rose-500" />
                    <span>طريقة الدفع المفضلة:</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      onClick={() => setPaymentMethod('on_arrival')}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        paymentMethod === 'on_arrival'
                          ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-500 font-bold text-rose-700 dark:text-rose-300'
                          : 'bg-white dark:bg-slate-950 border-rose-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${paymentMethod === 'on_arrival' ? 'bg-rose-500' : 'bg-slate-300'}`} />
                        <span>عند الحضور في الصالون</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">نقداً أو شبكة مدى</span>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('electronic')}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        paymentMethod === 'electronic'
                          ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-500 font-bold text-rose-700 dark:text-rose-300'
                          : 'bg-white dark:bg-slate-950 border-rose-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${paymentMethod === 'electronic' ? 'bg-rose-500' : 'bg-slate-300'}`} />
                        <span>دفع إلكتروني فوري</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">مدى / Apple Pay / فيزا</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>تأكيد الحجز النهائي</span>
                  </button>
                </div>
              </form>
            )}

            {/* Platform Guarantee Footer */}
            <div className="pt-2 border-t border-rose-100 dark:border-slate-800/70 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                حجز موثق وآمن عبر منصة تدلّلي
              </span>
              <span>إلغاء مجاني حتى 4 ساعات قبل الموعد</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
