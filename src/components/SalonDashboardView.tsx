import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Users, 
  QrCode, 
  Receipt, 
  Sparkles, 
  FileText, 
  CreditCard, 
  ExternalLink,
  ChevronLeft,
  Scissors,
  Gift,
  HelpCircle,
  Copy,
  Check,
  Plus,
  ArrowRight,
  UserCheck,
  AlertCircle,
  Share2,
  Percent,
  FileCheck,
  ShieldCheck,
  Home,
  Hourglass,
  BadgePercent,
  GraduationCap,
  Image as ImageIcon,
  UserCheck2,
  Star,
  LineChart,
  User,
  SlidersHorizontal,
  Layers,
  Banknote,
  Send,
  Download
} from 'lucide-react';
import { Salon, Service, Booking } from '../types.ts';
import { TedallalyLogo } from './TedallalyLogo.tsx';

interface Props {
  salon: Salon;
  services: Service[];
  bookings: Booking[];
  onBookService: (salon: Salon, service: Service) => void;
  onAddService?: (newService: Service) => void;
  onViewPublicPage?: () => void;
}

export const SalonDashboardView: React.FC<Props> = ({
  salon,
  services,
  bookings,
  onBookService,
  onAddService,
  onViewPublicPage,
}) => {
  const [activeMenu, setActiveMenu] = useState('نظرة عامة');
  const [copied, setCopied] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);

  // Form State for Add Service
  const [formData, setFormData] = useState({
    name: 'قص شعر',
    category: 'عناية بالشعر',
    price: '0.00',
    duration: '60',
    description: '',
    isHomeService: false,
  });

  const salonServices = services.filter(s => s.salonId === salon._id);
  const salonBookings = bookings.filter(b => b.salonId === salon._id || (b.snapshot?.salonName && b.snapshot.salonName.includes(salon.salonName)));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://tedallaly.com/ar/salons/-1787048765057`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newService: Service = {
      _id: 'srv_' + Date.now(),
      salonId: salon._id,
      name: formData.name,
      nameAr: formData.name,
      categoryId: formData.category,
      price: parseFloat(formData.price) || 0,
      currency: 'SAR',
      durationMins: parseInt(formData.duration) || 60,
      isHomeService: formData.isHomeService,
      isActive: true,
    };

    if (onAddService) {
      onAddService(newService);
    }
    setIsAddingService(false);
    setFormData({
      name: '',
      category: 'عناية بالشعر',
      price: '0.00',
      duration: '60',
      description: '',
      isHomeService: false,
    });
  };

  // Exact 27 free salon tools provided by Tedallaly platform
  const freeServicesForSalon = [
    { title: 'نظرة عامة', icon: '📊', id: 'overview' },
    { title: 'الحجوزات', icon: '📅', id: 'bookings' },
    { title: 'التقويم', icon: '🗓️', id: 'calendar' },
    { title: 'قائمة الانتظار', icon: '⏳', id: 'waitlist' },
    { title: 'المبيعات اليدوية', icon: '💵', id: 'pos' },
    { title: 'المصاريف والمخزون', icon: '📦', id: 'inventory' },
    { title: 'الخدمات', icon: '✂️', id: 'services' },
    { title: 'الفريق', icon: '👥', id: 'team' },
    { title: 'أوقات العمل', icon: '⏰', id: 'hours' },
    { title: 'المدفوعات والسحب', icon: '💳', id: 'payouts' },
    { title: 'المحاسبة والتقارير', icon: '📈', id: 'accounting' },
    { title: 'الرواتب والأداء', icon: '💰', id: 'payroll' },
    { title: 'الباقات الموسمية', icon: '🎁', id: 'packages' },
    { title: 'الكوبونات والعروض', icon: '🏷️', id: 'coupons' },
    { title: 'نماذج الموعد', icon: '📝', id: 'forms' },
    { title: 'بطاقات الهدايا', icon: '🎀', id: 'giftcards' },
    { title: 'تقرير الضريبة (VAT)', icon: '🧾', id: 'vat' },
    { title: 'معرض الصور', icon: '🖼️', id: 'gallery' },
    { title: 'الخدمة المنزلية', icon: '🏠', id: 'homeservice' },
    { title: 'الدورات التدريبية', icon: '🎓', id: 'courses' },
    { title: 'ملفات العميلات', icon: '👤', id: 'clients' },
    { title: 'التقييمات', icon: '⭐', id: 'reviews' },
    { title: 'الأداء والتحليلات', icon: '📊', id: 'analytics' },
    { title: 'الملف الشخصي', icon: '🏢', id: 'profile' },
    { title: 'الاتفاقية والتحقق', icon: '🛡️', id: 'verification' },
    { title: 'رابط المشاركة + QR', icon: '📲', id: 'qr' },
  ];

  return (
    <div className="space-y-6">
      {/* Value Proposition Header Banner: Highlighting Tedallaly's 100% Free Salon Tools */}
      <div className="bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900/60 border border-rose-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-black text-lg shadow-inner">
            💎
          </div>
          <div>
            <div className="text-sm font-black text-white flex items-center gap-2">
              <span>نظام إدارة الصالونات المتكامل — مجاني 100% مدى الحياة</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                بدون رسوم اشتراك
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              تدلّلي وسيط تقني يمنحك كل أدوات الحسابات، الكاشير، الموظفات، والتقارير الضريبية مجاناً دون الحاجة لأي برامج مدفوعة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-rose-300 bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 font-bold">
            27 أداة مجانية نشطة
          </span>
        </div>
      </div>

      {/* Salon Top Header Info - Matching exact screenshot layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121218] p-6 rounded-2xl border border-slate-800/80">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-rose-500/30 flex items-center justify-center p-1.5 shadow-md shadow-rose-500/10 shrink-0">
            <TedallalyLogo size={36} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-white">{salon.salonName}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {salon.city} • SA • verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              لوحة تحكم الصالون المستقلة — إدارة حجوزاتك، خدماتك، وموظفيك مع وسيط تدلّلي المعتمد
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onViewPublicPage && (
            <button
              onClick={onViewPublicPage}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-bold transition-all"
            >
              <span>View Public Page ↗</span>
            </button>
          )}

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-bold transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ رابط الصالون'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Salon Sidebar Menu with all 27 tools */}
        <div className="lg:col-span-1 bg-[#121218] border border-slate-800/80 rounded-2xl p-4 max-h-[780px] overflow-y-auto scrollbar-thin">
          <div className="text-[11px] font-bold text-slate-400 uppercase mb-3 px-2 flex items-center justify-between">
            <span>أدوات الصالون المجانية</span>
            <span className="text-rose-400 font-bold">27 أداة (مجاني 100%)</span>
          </div>
          <div className="space-y-1">
            {freeServicesForSalon.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.title);
                  setIsAddingService(false);
                }}
                className={`w-full text-right px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  activeMenu === item.title
                    ? 'bg-rose-600/20 text-rose-300 border border-rose-500/30 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                {activeMenu === item.title && <ChevronLeft className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Pane based on selected Tool */}
        <div className="lg:col-span-3 space-y-6">

          {/* VIEW: OVERVIEW (نظرة عامة) - Exact replica of Screenshot 1 */}
          {activeMenu === 'نظرة عامة' && (
            <>
              {/* 6 Metric Cards matching Screenshot 1 exactly */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* 1. Today */}
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
                    <span>Today 📅</span>
                  </div>
                  <div className="text-2xl font-black text-rose-500 mt-1">0</div>
                </div>

                {/* 2. Confirmed */}
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
                    <span>Confirmed 🕒</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {salonBookings.filter(b => b.status === 'confirmed').length}
                  </div>
                </div>

                {/* 3. Completed */}
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
                    <span>Completed ⏱️</span>
                  </div>
                  <div className="text-2xl font-black text-blue-400 mt-1">
                    {salonBookings.filter(b => b.status === 'completed').length}
                  </div>
                </div>

                {/* 4. Total Bookings */}
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-slate-400 text-xs font-medium">Total Bookings ↗</div>
                  <div className="text-2xl font-black text-white mt-1">{salonBookings.length}</div>
                </div>

                {/* 5. Cancelled */}
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-slate-400 text-xs font-medium">Cancelled 🗓️</div>
                  <div className="text-2xl font-black text-slate-500 mt-1">0</div>
                </div>

                {/* 6. Gross Earnings */}
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-slate-400 text-xs font-medium">Gross Earnings 💵</div>
                  <div className="text-2xl font-black text-pink-400 mt-1">SAR 0.00</div>
                </div>
              </div>

              {/* Verified Status Banner */}
              <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between">
                <div className="text-right">
                  <div className="text-sm font-black text-white flex items-center gap-2 justify-end">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span>Verified</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">.Your salon is live and accepting bookings</div>
                </div>
              </div>

              {/* Recent Bookings Section (Matching Screenshot 1) */}
              <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-rose-400 font-bold hover:underline cursor-pointer">
                    → View all
                  </span>
                  <h4 className="text-sm font-bold text-white">Recent Bookings</h4>
                </div>

                {salonBookings.length > 0 ? (
                  <div className="divide-y divide-slate-800/60">
                    {salonBookings.map(b => (
                      <div key={b._id} className="py-3 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <div className="font-bold text-white">{b.snapshot?.serviceName || 'خدمة'}</div>
                          <div className="text-slate-400 text-[11px]">{b.appointmentDate} • {b.appointmentTime}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-400">{b.snapshot?.totalAmount || 150} SAR</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px]">
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-slate-500">
                    .No bookings yet
                  </div>
                )}
              </div>

              {/* Share Link Banner (as seen in Screenshot 1) */}
              <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-rose-400 cursor-pointer hover:underline flex items-center gap-1.5">
                    مشاركة واتساب • رمز QR وخيارات المشاركة ←
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-rose-400" />
                    رابط صالونك للمشاركة
                  </h4>
                </div>

                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5">
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <input
                    readOnly
                    value="https://tedallaly.com/ar/salons/-1787048765057"
                    className="bg-transparent text-xs text-rose-400 flex-1 outline-none font-mono text-left dir-ltr"
                  />
                </div>
              </div>

              {/* Salon Guide Note (matching Screenshot 1) */}
              <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    ✓
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white flex items-center gap-1.5 justify-end">
                    <span>دليل استخدام تدلّلي للصالونات</span>
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    خطوات التسجيل، إدارة الخدمات، الحجوزات، والأسئلة الشائعة.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW: SERVICES (الخدمات) - Matching Screenshot 2 & 3 */}
          {activeMenu === 'الخدمات' && (
            <div className="space-y-6">
              {!isAddingService ? (
                /* Services List (Screenshot 3) */
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-6 min-h-[400px]">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setIsAddingService(true)}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-pink-600/20"
                    >
                      <span>Add Service</span>
                      <Plus className="w-4 h-4" />
                    </button>
                    <div className="text-xs text-slate-400 font-mono">
                      services {salonServices.length}
                    </div>
                  </div>

                  {salonServices.length > 0 ? (
                    <div className="space-y-3">
                      {salonServices.map(s => (
                        <div
                          key={s._id}
                          className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-colors"
                        >
                          <div>
                            <div className="font-bold text-white text-sm">{s.nameAr || s.name}</div>
                            <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                              <span>⏱️ {s.durationMins} دقيقة</span>
                              {s.categoryId && <span>🏷️ {s.categoryId}</span>}
                              {s.isHomeService && (
                                <span className="text-rose-400">🏠 خدمة منزلية</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-pink-400 text-sm">
                              {s.price} {s.currency}
                            </span>
                            <button
                              onClick={() => onBookService(salon, s)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
                            >
                              حجز تجريبي
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24 space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 text-xl">
                        ✂️
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        .No services yet. Add your first service
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Add Service Form (Screenshot 2) */
                <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <button
                      onClick={() => setIsAddingService(false)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Back ←</span>
                    </button>
                    <h3 className="text-sm font-bold text-white">Add Service</h3>
                  </div>

                  <form onSubmit={handleCreateService} className="space-y-4 max-w-xl mx-auto text-right">
                    {/* Service Name */}
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-mono block">
                        * Service Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-pink-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:ring-1 focus:ring-pink-500"
                        placeholder="قص شعر"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-mono block">
                        * Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 outline-none focus:border-slate-600"
                      >
                        <option value="عناية بالشعر">عناية بالشعر (Hair Care)</option>
                        <option value="مكياج وسهرات">مكياج وسهرات (Makeup)</option>
                        <option value="أظافر وسبا">أظافر وسبا (Nails & Spa)</option>
                        <option value="بشرة وتنظيف">بشرة وتنظيف (Skincare)</option>
                        <option value="مساج واستجمام">مساج واستجمام (Massage)</option>
                        <option value="حواجب ورموش">حواجب ورموش (Brows & Lashes)</option>
                      </select>
                    </div>

                    {/* Price & Duration */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-mono block">
                          * Duration (minutes)
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                          placeholder="60"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-mono block">
                          * Price (SAR)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-mono block">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none placeholder:text-slate-600"
                        placeholder="...Describe this service"
                      />
                    </div>

                    {/* Home Service Toggle */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                      <input
                        type="checkbox"
                        checked={formData.isHomeService}
                        onChange={(e) => setFormData({ ...formData, isHomeService: e.target.checked })}
                        className="w-4 h-4 accent-pink-600 rounded cursor-pointer"
                        id="homeServiceToggle"
                      />
                      <label htmlFor="homeServiceToggle" className="text-right cursor-pointer">
                        <div className="text-xs font-bold text-slate-200">
                          متاح خدمة منزلية 🏠
                        </div>
                        <div className="text-[10px] text-slate-500">
                          ستظهر هذه الخدمة في قسم الخدمات المنزلية للعملاء
                        </div>
                      </label>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl transition-colors shadow-md shadow-pink-600/20"
                      >
                        Add Service
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingService(false)}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* VIEW: BOOKINGS (الحجوزات) */}
          {activeMenu === 'الحجوزات' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{salonBookings.length} حجز مسجل</span>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-400" />
                  جدول حجوزات صالونك
                </h3>
              </div>
              <div className="divide-y divide-slate-800">
                {salonBookings.length > 0 ? (
                  salonBookings.map(b => (
                    <div key={b._id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{b.snapshot?.serviceName}</div>
                        <div className="text-slate-400 text-[11px]">{b.appointmentDate} • {b.appointmentTime}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                        {b.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs">لا توجد حجوزات مسجلة حالياً</div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: CALENDAR (التقويم) */}
          {activeMenu === 'التقويم' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 font-bold">تقويم تفاعلي للمواعيد</span>
                <h3 className="text-sm font-bold text-white">جدول المواعيد الأسبوعي والشهري</h3>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
                  <div key={day} className="p-2 bg-slate-900 rounded-lg text-slate-400 font-bold">{day}</div>
                ))}
                {Array.from({ length: 14 }).map((_, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-right min-h-[60px]">
                    <span className="text-[10px] text-slate-500">{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: WAITLIST (قائمة الانتظار) */}
          {activeMenu === 'قائمة الانتظار' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold">إدارة الزبائن بانتظار توفر موعد</span>
                <h3 className="text-sm font-bold text-white">قائمة الانتظار الذكية</h3>
              </div>
              <p className="text-xs text-slate-400">
                يقوم النظام بإشعار العميلات تلقائياً عند إلغاء أي موعد لملء الفراغات في جدول الصالون.
              </p>
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl text-center text-xs text-slate-500">
                قائمة الانتظار فارغة حالياً.
              </div>
            </div>
          )}

          {/* VIEW: POS / المبيعات اليدوية */}
          {activeMenu === 'المبيعات اليدوية' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">نظام الكاشير السريع (POS)</span>
                <h3 className="text-sm font-bold text-white">تسجيل مبيعات يدوية واستقبال في الصالون</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                هذه الأداة المجانية تمكن صالونك من تسجيل المدفوعات النقدية والمباشرة بالشبكة داخل الفرع مع إصدار فواتير إلكترونية فورية.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs text-slate-400">مبيعات الكاشير اليوم</div>
                  <div className="text-xl font-bold text-white">SAR 0.00</div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs text-slate-400">الفواتير المصدرة</div>
                  <div className="text-xl font-bold text-emerald-400">0 فاتورة</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: INVENTORY & EXPENSES / المصاريف والمخزون */}
          {activeMenu === 'المصاريف والمخزون' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 font-bold">إدارة مستلزمات الصالون ومشتريات الصبغات والشامبو</span>
                <h3 className="text-sm font-bold text-white">المصاريف ومخزون المواد</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400">إجمالي المصاريف هذا الشهر</div>
                  <div className="text-lg font-bold text-white mt-1">SAR 0.00</div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400">المنتجات منخفضة الكمية</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">0 منتج</div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400">قيمة المخزون الحالي</div>
                  <div className="text-lg font-bold text-pink-400 mt-1">SAR 0.00</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: TEAM / الفريق */}
          {activeMenu === 'الفريق' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors">
                  + إضافة موظفة جديدة
                </button>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  أخصائيات وطاقم عمل الصالون
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                إدارة أخصائيات الشعر والمكياج وتحديد الخدمات والعمولات الخاصة بكل أخصائية مجاناً.
              </p>
              <div className="divide-y divide-slate-800">
                <div className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">سارة محمد</div>
                    <div className="text-[11px] text-slate-400">أخصائية شعر ومكياج • نشط</div>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[11px]">متاحة للحجز</span>
                </div>
                <div className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">نورة العتيبي</div>
                    <div className="text-[11px] text-slate-400">خبيرة عناية بالأظافر وسبا • نشط</div>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[11px]">متاحة للحجز</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WORKING HOURS / أوقات العمل */}
          {activeMenu === 'أوقات العمل' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">مفتوح لاستقبال الحجوزات</span>
                <h3 className="text-sm font-bold text-white">مواعيد وساعات عمل الفرع</h3>
              </div>
              <div className="space-y-2 text-xs">
                {['السبت إلى الخميس: 10:00 ص - 10:00 م', 'الجمعة: 01:00 م - 11:00 م'].map((time, i) => (
                  <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <span className="text-white font-medium">{time}</span>
                    <span className="text-emerald-400">مفعّل ✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: PAYOUTS / المدفوعات والسحب */}
          {activeMenu === 'المدفوعات والسحب' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 font-bold">تسوية أسبوعية مباشرة إلى حساب الصالون البنكي (IBAN)</span>
                <h3 className="text-sm font-bold text-white">المحفظة وسحب الأرباح</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400">الرصيد المتاح للسحب</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">SAR 0.00</div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-xs text-slate-400">الحساب البنكي المعتمد</div>
                  <div className="text-xs font-mono text-slate-300 mt-2">SA****************3209</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: ACCOUNTING / المحاسبة والتقارير */}
          {activeMenu === 'المحاسبة والتقارير' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>تصدير تقرير مالي (PDF/Excel)</span>
                </button>
                <h3 className="text-sm font-bold text-white">الدفاتر والتقارير المحاسبية التلقائية</h3>
              </div>
              <p className="text-xs text-slate-400">
                يوفر نظام تدلّلي المحاسبي تقارير الأرباح والخسائر، وصافي الدخل تلقائياً دون الحاجة لتوظيف محاسب أو شراء برامج محاسبة.
              </p>
            </div>
          )}

          {/* VIEW: PAYROLL / الرواتب والأداء */}
          {activeMenu === 'الرواتب والأداء' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">حساب عمولات ونسب الأخصائيات تلقائياً</span>
                <h3 className="text-sm font-bold text-white">مسير رواتب الموظفات وعمولات الخدمات</h3>
              </div>
              <p className="text-xs text-slate-400">
                يقوم النظام بحساب نسبة كل أخصائية من الخدمات التي نفذتها مع مسير الرواتب الشهري الجاهز بضغطة زر.
              </p>
            </div>
          )}

          {/* VIEW: PACKAGES / الباقات الموسمية */}
          {activeMenu === 'الباقات الموسمية' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors">
                  + إنشاء باقة تجميلية جديدة
                </button>
                <h3 className="text-sm font-bold text-white">باقات العيد والمناسبات والعرائس</h3>
              </div>
              <p className="text-xs text-slate-400">
                اجمعي عدة خدمات في باقة واحدة بسعر مخفض لجذب العميلات وزيادة متوسط فاتورة الصالون.
              </p>
            </div>
          )}

          {/* VIEW: COUPONS / الكوبونات والعروض */}
          {activeMenu === 'الكوبونات والعروض' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-bold transition-colors">
                  + إنشاء كود خصم
                </button>
                <h3 className="text-sm font-bold text-white">كوبونات الخصم والعروض الترويجية</h3>
              </div>
              <p className="text-xs text-slate-400">
                أطلقي أكواد خصم حصرية لعميلات صالونك مع تحديد نسبة الخصم وتاريخ انتهاء العرض.
              </p>
            </div>
          )}

          {/* VIEW: FORMS / نماذج الموعد */}
          {activeMenu === 'نماذج الموعد' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-400 font-bold">نماذج استبيان الحساسية والشعر قبل الموعد</span>
                <h3 className="text-sm font-bold text-white">نماذج الإقرار والموافقة المسبقة</h3>
              </div>
              <p className="text-xs text-slate-400">
                اجعلي العميلات يقمن بتعبئة استمارة نوع الشعر أو البشرة أو إقرار الحساسية للصبغة قبل الحضور للصالون.
              </p>
            </div>
          )}

          {/* VIEW: GIFTCARDS / بطاقات الهدايا */}
          {activeMenu === 'بطاقات الهدايا' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 font-bold">بطاقات إلكترونية تهديها العميلات لبعضهن</span>
                <h3 className="text-sm font-bold text-white">بطاقات الإهداء والقسائم الرقمية</h3>
              </div>
              <p className="text-xs text-slate-400">
                ميزة رائعة لتمكين العميلات من شراء قسائم هدايا لصالونك وإهدائها في أعياد الميلاد ومناسبات الزواج.
              </p>
            </div>
          )}

          {/* VIEW: VAT REPORT / تقرير الضريبة */}
          {activeMenu === 'تقرير الضريبة (VAT)' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">متوافق مع هيئة الزكاة والضريبة والجمارك</span>
                <h3 className="text-sm font-bold text-white">تقرير ضريبة القيمة المضافة (15%)</h3>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-white font-bold">SAR 0.00</span>
                  <span className="text-slate-400">إجمالي المبيعات الخاضعة للضريبة</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-white font-bold">SAR 0.00</span>
                  <span className="text-slate-400">ضريبة القيمة المضافة المحصلة (15%)</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-400 font-bold">جاهز للتحميل</span>
                  <span className="text-slate-400">حالة الإقرار الضريبي</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: GALLERY / معرض الصور */}
          {activeMenu === 'معرض الصور' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-colors">
                  + رفع صور جديدة
                </button>
                <h3 className="text-sm font-bold text-white">معرض أعمال وتجهيزات الصالون</h3>
              </div>
              <p className="text-xs text-slate-400">
                استعرضي أجمل تصفيفات الشعر، ونقوش الحناء، وديكورات صالونك الفاخرة للعميلات في صفحة الصالون العامة.
              </p>
            </div>
          )}

          {/* VIEW: HOME SERVICE / الخدمة المنزلية */}
          {activeMenu === 'الخدمة المنزلية' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 font-bold">تغطية أحياء المدينة وإرسال الأخصائية لمنزل العميل</span>
                <h3 className="text-sm font-bold text-white">إعدادات الخدمة المنزلية (Home Care)</h3>
              </div>
              <p className="text-xs text-slate-400">
                حددي رسوم التوصيل والمناطق المخدومة في مدينتك لتقديم جلسات المكياج والشعر في منازل العميلات.
              </p>
            </div>
          )}

          {/* VIEW: COURSES / الدورات التدريبية */}
          {activeMenu === 'الدورات التدريبية' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors">
                  + إضافة دورة تدريبية لصالونك
                </button>
                <h3 className="text-sm font-bold text-white">دورات التجميل والماكياج المهنية الخاصة بصالونك</h3>
              </div>
              <p className="text-xs text-slate-400">
                أنتِ كمزود خدمة يمكنك تقديم ورش عمل ودورات تدريبية معتمدة داخل صالونك وتدريب خبيرات التجميل الجدد.
              </p>
            </div>
          )}

          {/* VIEW: CLIENTS / ملفات العميلات */}
          {activeMenu === 'ملفات العميلات' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">سجل الزيارات وسجل صبغات الشعر</span>
                <h3 className="text-sm font-bold text-white">سجلات العميلات ونظام الولاء (CRM)</h3>
              </div>
              <p className="text-xs text-slate-400">
                احفظي تفاصيل كل عميلة، وألوان الصبغات المفضلة، ورقم هاتفها لتكرار الزيارات وتقديم عروض الولاء.
              </p>
            </div>
          )}

          {/* VIEW: REVIEWS / التقييمات */}
          {activeMenu === 'التقييمات' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold">تقييم 5 نجوم من العميلات الموثقات</span>
                <h3 className="text-sm font-bold text-white">آراء وتقييمات العميلات بعد إتمام الموعد</h3>
              </div>
              <p className="text-xs text-slate-400">
                تأتي التقييمات حصرياً من عميلات حقيقيات أتممن مواعيدهن لضمان الشفافية ومصداقية صالونك.
              </p>
            </div>
          )}

          {/* VIEW: ANALYTICS / الأداء والتحليلات */}
          {activeMenu === 'الأداء والتحليلات' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 font-bold">إحصائيات المبيعات والخدمات الأكثر طلباً</span>
                <h3 className="text-sm font-bold text-white">تحليلات نمو الصالون والذكاء التشغيلي</h3>
              </div>
              <p className="text-xs text-slate-400">
                تعرفي على أكثر الساعات ازدحاماً، والخدمة الأكثر ربحية، ومعدل عودة العميلات لصالونك.
              </p>
            </div>
          )}

          {/* VIEW: PROFILE / الملف الشخصي */}
          {activeMenu === 'الملف الشخصي' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">بيانات الفرع واللوكيشن ومعلومات التواصل</span>
                <h3 className="text-sm font-bold text-white">ملف الصالون التعريفي</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-slate-400">اسم الصالون التجاري:</div>
                  <div className="font-bold text-white text-sm mt-0.5">{salon.salonName}</div>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="text-slate-400">المدينة والعنوان:</div>
                  <div className="font-bold text-white mt-0.5">{salon.city} — حي الزهراء، المملكة العربية السعودية</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: VERIFICATION / الاتفاقية والتحقق */}
          {activeMenu === 'الاتفاقية والتحقق' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">موثق رسمياً برقم السجل التجاري</span>
                <h3 className="text-sm font-bold text-white">اتفاقية الصالون والتحقق القانوني</h3>
              </div>
              <p className="text-xs text-slate-400">
                صالونك موثق ونشط تحت مظلة المركز السعودي للأعمال ومنصة تدلّلي للوساطة التجارية المعتمدة.
              </p>
            </div>
          )}

          {/* VIEW: QR & Share / رابط المشاركة + QR */}
          {activeMenu === 'رابط المشاركة + QR' && (
            <div className="bg-[#121218] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-rose-400 font-bold">رمز QR جاهز للطباعة والاستقبال</span>
                <h3 className="text-sm font-bold text-white">رابط صالونك ورمز الاستجابة السريعة</h3>
              </div>
              <div className="flex flex-col items-center justify-center p-8 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center">
                  <QrCode className="w-36 h-36 text-slate-950" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{salon.salonName}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">https://tedallaly.com/ar/salons/-1787048765057</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
                  </button>
                  <a
                    href="https://wa.me/?text=احجز%20موعدك%20في%20صالوننا%20عبر%20تدللي:%20https://tedallaly.com/ar/salons/-1787048765057"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    مشاركة واتساب 💬
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
