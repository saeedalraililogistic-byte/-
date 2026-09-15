import React, { useState, useEffect } from 'react';
import { 
  initialSalons, 
  initialServices, 
  initialCategories, 
  initialBookings, 
  initialUsers, 
  initialStaff, 
  initialReviews 
} from './store/data.ts';
import { Salon, Service, Booking } from './types.ts';
import { testFirestoreConnection } from './lib/firebase.ts';
import { syncBookingToFirestore, updateBookingStatusInFirestore, syncServiceToFirestore } from './lib/firestoreService.ts';
import { useTheme } from './context/ThemeContext.tsx';
import { MarketplaceView } from './components/MarketplaceView.tsx';
import { BookingsDashboard } from './components/BookingsDashboard.tsx';
import { DbManagerView } from './components/DbManagerView.tsx';
import { SalonDashboardView } from './components/SalonDashboardView.tsx';
import { AdminDashboardView } from './components/AdminDashboardView.tsx';
import { CategoriesView } from './components/CategoriesView.tsx';
import { TrainingCoursesView } from './components/TrainingCoursesView.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { TedallalyLogo } from './components/TedallalyLogo.tsx';
import { ToastContainer, ToastMessage } from './components/Toast.tsx';
import { 
  Sparkles, 
  Store, 
  CalendarCheck, 
  Database, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  Layers, 
  CheckCircle2, 
  Search, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Lock,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'market' | 'salon_dash' | 'admin_dash' | 'categories' | 'courses' | 'bookings' | 'database'>('market');
  const [salons, setSalons] = useState(initialSalons);
  const [services, setServices] = useState(initialServices);
  const [categories, setCategories] = useState(initialCategories);
  const [bookings, setBookings] = useState(initialBookings);
  const [users, setUsers] = useState(initialUsers);

  // Default active salon (e.g. احسان جدة or صالون تدللي)
  const activeSalon = salons.find(s => s.salonName.includes('احسان') || s.status === 'verified') || salons[0];

  // Initialize Firestore connection test on mount
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Booking Modal State
  const [bookingTarget, setBookingTarget] = useState<{ salon: Salon; service: Service } | null>(null);

  const handleBookService = (salon: Salon, service: Service) => {
    setBookingTarget({ salon, service });
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    setBookingTarget(null);

    // Sync booking asynchronously to Firebase Cloud
    syncBookingToFirestore(newBooking);

    const salonName = newBooking.snapshot?.salonName || 'الصالون';
    const serviceName = newBooking.snapshot?.serviceName || 'الخدمة';

    addToast({
      type: 'success',
      title: 'تم تأكيد حجزك بنجاح وحفظه سحابياً! 🎉',
      description: `تم حجز موعد ${serviceName} لدى ${salonName} بتاريخ ${newBooking.appointmentDate} الساعة ${newBooking.appointmentTime} وتأمينه في Firebase.`
    });
  };

  const handleUpdateStatus = (id: string, status: string) => {
    const booking = bookings.find(b => b._id === id);
    const serviceName = booking?.snapshot?.serviceName || 'الحجز';
    const salonName = booking?.snapshot?.salonName || '';

    setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));

    // Update status in Firestore
    updateBookingStatusInFirestore(id, status);

    if (status === 'completed') {
      addToast({
        type: 'success',
        title: 'تم إتمام الحجز بنجاح ✓',
        description: `تم تحديث حالة موعد "${serviceName}" في ${salonName} إلى مكتمل ومزامنته مع السحابة.`
      });
    } else if (status === 'confirmed') {
      addToast({
        type: 'info',
        title: 'تم تأكيد الحجز',
        description: `تم تأكيد موعد "${serviceName}".`
      });
    } else {
      addToast({
        type: 'info',
        title: 'تم تحديث حالة الحجز',
        description: `أصبحت الحالة الآن: ${status}.`
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f9] dark:bg-[#09090d] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white font-sans transition-colors duration-300">
      {/* Top Banner with Platform Slogan */}
      <div className="bg-rose-50/90 dark:bg-[#121218] border-b border-rose-100/80 dark:border-slate-800/80 px-4 py-2 text-xs flex items-center justify-between text-slate-600 dark:text-slate-400 transition-colors">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-800 dark:text-white font-bold">منصة التجميل الفاخرة التي تربطك بأفضل الصالونات في الخليج</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span className="text-rose-600 dark:text-rose-400 font-bold">✨ دلعي نفسك بضغطة زر</span>
          <span className="font-semibold text-slate-500 dark:text-slate-400">العربية • SAR SA</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-rose-100/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#0d0d12]/95 backdrop-blur-md sticky top-0 z-40 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('market')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-[#121218] border border-rose-200 dark:border-rose-500/30 flex items-center justify-center p-1 shadow-md shadow-rose-500/10 group-hover:scale-105 group-hover:border-rose-500/60 transition-all">
                <TedallalyLogo size={36} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-wide">تدلّلي • Tedallaly</h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                    مستقل
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">حجز صالونات الخليج والعناية الفاخرة</div>
              </div>
            </div>

            {/* Actions: Navigation + Theme Toggle */}
            <div className="flex items-center gap-2 max-w-full overflow-x-auto pb-1 md:pb-0">
              {/* Navigation Menus */}
              <nav className="flex items-center gap-1 bg-rose-50/60 dark:bg-[#15151e] p-1.5 rounded-2xl border border-rose-100 dark:border-slate-800/80 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('market')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'market'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  استكشفي الصالونات
                </button>

                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'categories'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  التصنيفات
                </button>

                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'courses'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  الدورات التدريبية
                </button>

                <button
                  onClick={() => setActiveTab('salon_dash')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'salon_dash'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                      : 'text-rose-600 dark:text-rose-300/90 hover:text-rose-700 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>لوحة الصالون</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                </button>

                <button
                  onClick={() => setActiveTab('admin_dash')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'admin_dash'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>لوحة الإدارة</span>
                </button>

                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'bookings'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  الحجوزات ({bookings.length})
                </button>

                <button
                  onClick={() => setActiveTab('database')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'database'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  الداتابيس
                </button>
              </nav>

              {/* Theme Toggle Button (Light/Dark Mode) */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-rose-200/80 dark:border-slate-800 bg-white dark:bg-[#15151e] text-slate-700 dark:text-slate-200 hover:border-rose-400 hover:shadow-md transition-all text-xs font-bold shrink-0"
                title={isDark ? "التبديل إلى المظهر الفاتح" : "التبديل إلى المظهر الداكن"}
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    <span className="hidden sm:inline">نهاري</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-rose-500" />
                    <span className="hidden sm:inline">ليلي</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'market' && (
          <MarketplaceView
            salons={salons}
            services={services}
            categories={categories}
            onBookService={handleBookService}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesView
            categories={categories}
            onSelectCategory={(catId) => {
              setActiveTab('market');
            }}
          />
        )}

        {activeTab === 'courses' && (
          <TrainingCoursesView
            onGoToSalonDashboard={() => setActiveTab('salon_dash')}
          />
        )}

        {activeTab === 'salon_dash' && (
          <SalonDashboardView
            salon={activeSalon}
            services={services}
            bookings={bookings}
            onBookService={handleBookService}
            onAddService={(newService) => {
              setServices(prev => [newService, ...prev]);
              // Sync service to Firestore
              syncServiceToFirestore(newService);
              addToast({
                type: 'success',
                title: 'تمت إضافة الخدمة بنجاح وحفظها سحابياً! ✂️',
                description: `تمت إضافة خدمة "${newService.nameAr || newService.name}" بسعر ${newService.price} SAR وتأمينها في Firebase.`
              });
            }}
            onViewPublicPage={() => setActiveTab('market')}
          />
        )}

        {activeTab === 'admin_dash' && (
          <AdminDashboardView
            salons={salons}
            bookings={bookings}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingsDashboard
            bookings={bookings}
            salons={salons}
            services={services}
            users={users}
            onAddBooking={handleConfirmBooking}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {activeTab === 'database' && (
          <DbManagerView 
            salons={salons}
            services={services}
            bookings={bookings}
            onSynced={(msg) => {
              addToast({
                type: 'success',
                title: 'اكتملت المزامنة السحابية 🔥',
                description: msg
              });
            }}
          />
        )}
      </main>

      {/* Booking Modal */}
      {bookingTarget && (
        <BookingModal
          salon={bookingTarget.salon}
          service={bookingTarget.service}
          availableServices={services.filter(s => s.salonId === bookingTarget.salon._id)}
          onConfirm={handleConfirmBooking}
          onCancel={() => setBookingTarget(null)}
        />
      )}

      {/* Official Saudi Business Verified Footer */}
      <footer className="border-t border-rose-100 dark:border-slate-900 bg-white dark:bg-[#09090d] pt-12 pb-8 text-xs text-slate-600 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & About */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-[#121218] border border-rose-200 dark:border-rose-500/30 flex items-center justify-center p-0.5">
                  <TedallalyLogo size={24} />
                </div>
                <span className="font-extrabold text-slate-900 dark:text-white text-base">تدلّلي</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                منصة التجميل الفاخرة التي تربطك بأفضل الصالونات ومراكز العناية في الخليج.
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                  <span className="font-mono">info@tedallaly.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono">+966 530 091 580</span>
                </div>
              </div>
            </div>

            {/* Salons Links */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">للصالونات</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer" onClick={() => setActiveTab('salon_dash')}>أضف صالونك</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer" onClick={() => setActiveTab('salon_dash')}>لوحة الصالون</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer">اتفاقية الصالون</li>
              </ul>
            </div>

            {/* Clients Links */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">للعملاء</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer" onClick={() => setActiveTab('market')}>استكشاف الصالونات</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer" onClick={() => setActiveTab('categories')}>تصفح التصنيفات</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer" onClick={() => setActiveTab('bookings')}>حجوزاتي</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer" onClick={() => setActiveTab('courses')}>الدورات التدريبية</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer">المساعدة والدعم</li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">قانوني</h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer">الشروط والأحكام</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer">سياسة الخصوصية</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer">المركز القانوني</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer">الشكاوى والنزاعات</li>
                <li className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer">الخصوصية وبياناتك</li>
              </ul>
            </div>
          </div>

          {/* Official Saudi Business Center Verification Badge */}
          <div className="bg-rose-50/50 dark:bg-[#121218] border border-rose-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-base">
                🇸🇦
              </div>
              <div>
                <div className="font-bold text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  موثق رسمياً من المركز السعودي للأعمال
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  شهادة توثيق التجارة الإلكترونية — سارية المفعول
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 font-mono">
              <div>رقم السجل التجاري: <strong className="text-slate-900 dark:text-slate-200">7032822137</strong></div>
              <div>رقم التوثيق: <strong className="text-slate-900 dark:text-slate-200">0000320986</strong> | تاريخ الانتهاء: 26/07/2027</div>
            </div>
          </div>

          {/* Copyright line */}
          <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-rose-100 dark:border-slate-900 flex items-center justify-between">
            <span>جميع الحقوق محفوظة © Tedallaly {new Date().getFullYear()}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">SA • ساري المفعول</span>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

