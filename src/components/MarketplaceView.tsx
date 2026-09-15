import React, { useState } from 'react';
import { Salon, Service, Category, Booking } from '../types.ts';
import { SalonsGoogleMap } from './SalonsGoogleMap.tsx';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  ChevronLeft, 
  CheckCircle2, 
  Phone,
  Filter,
  Map as MapIcon,
  LayoutGrid,
  Heart,
  Award
} from 'lucide-react';

interface Props {
  salons: Salon[];
  services: Service[];
  categories: Category[];
  onBookService: (salon: Salon, service: Service) => void;
}

export const MarketplaceView: React.FC<Props> = ({
  salons,
  services,
  categories,
  onBookService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [showMap, setShowMap] = useState<boolean>(true);

  const filteredSalons = salons.filter(s => {
    const matchesSearch = s.salonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.address && s.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.city && s.city.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCity = selectedCity === 'all' || s.city.toLowerCase().includes(selectedCity.toLowerCase());
    return matchesSearch && matchesCity;
  });

  const getCategoryServices = (salonId: string) => {
    return services.filter(srv => {
      const matchesSalon = srv.salonId === salonId;
      const matchesCat = selectedCategory === 'all' || srv.categoryId === selectedCategory;
      return matchesSalon && matchesCat;
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Luxury Banner with Search */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100/90 via-pink-50 to-white dark:from-rose-950/70 dark:via-slate-900 dark:to-indigo-950/60 border border-rose-200/80 dark:border-rose-500/20 p-6 sm:p-10 shadow-lg shadow-rose-900/5 transition-all">
        {/* Subtle decorative glow elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-400/10 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10"></div>

        <div className="relative max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/10 dark:bg-rose-500/15 border border-rose-600/20 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            منصة تدلّلي (Tedallaly) • بوابتك نحو الفخامة والجمال
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            احجزي أرقى خدمات الصالونات والتجميل بكل سهولة
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            اختاري من بين نخبة الصالونات المعتمدة في المملكة والخليج. تم تأمين ومزامنة كافة الحجوزات والخدمات سحابياً لتجربة استثنائية.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحثي عن صالون، خدمة، أو حي..."
                className="w-full bg-white dark:bg-slate-950/90 border border-rose-200 dark:border-slate-700/80 rounded-2xl pr-11 pl-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-xs transition-all"
              />
            </div>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-white dark:bg-slate-950/90 border border-rose-200 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-xs"
            >
              <option value="all">جميع المدن (الرياض، جدة...)</option>
              <option value="الرياض">الرياض</option>
              <option value="جدة">جدة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills with Brand Colors */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-500" />
            التصنيفات المتاحة ({categories.length} تصنيف)
          </h3>
          <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">✨ خدمات حصرية</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                : 'bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-slate-200 hover:border-rose-300'
            }`}
          >
            جميع التصنيفات
          </button>
          {categories.map(c => (
            <button
              key={c._id}
              onClick={() => setSelectedCategory(c._id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === c._id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                  : 'bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-slate-200 hover:border-rose-300'
              }`}
            >
              {c.nameAr || c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Google Map Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">خريطة الصالونات المعتمدة ومواقع الفروع</span>
          </div>

          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-white hover:border-rose-400 transition-colors shadow-xs"
          >
            {showMap ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-rose-500" />
                <span>إخفاء الخريطة مؤقتاً</span>
              </>
            ) : (
              <>
                <MapIcon className="w-3.5 h-3.5 text-rose-500" />
                <span>إظهار خريطة Google Maps</span>
              </>
            )}
          </button>
        </div>

        {showMap && (
          <SalonsGoogleMap
            salons={filteredSalons}
            selectedSalon={selectedSalon}
            onSelectSalon={(salon) => setSelectedSalon(salon)}
            userCity={selectedCity}
          />
        )}
      </div>

      {/* Salons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" />
            قائمة الصالونات المعتمدة ({filteredSalons.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map(salon => {
            const salonServices = getCategoryServices(salon._id);
            return (
              <div
                key={salon._id}
                className="bg-white dark:bg-[#13141f] border border-rose-100 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-rose-400/70 hover:shadow-xl hover:shadow-rose-950/5 dark:hover:border-rose-500/40 transition-all flex flex-col justify-between group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-rose-600 transition-colors">
                        {salon.salonName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{salon.city} {salon.address ? `• ${salon.address}` : ''}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      معتمد
                    </span>
                  </div>

                  {salon.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {salon.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-rose-100/70 dark:border-slate-800/80">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{salon.averageRating || '4.8'}</span>
                      <span className="text-slate-400 font-normal">({salon.totalReviews || 12})</span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      {salon.totalBookings ? `${salon.totalBookings} حجز سابق` : 'حجوزات نشطة'}
                    </div>
                  </div>

                  {/* Services preview */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
                      الخدمات المتوفرة ({salonServices.length}):
                    </span>
                    <div className="space-y-2">
                      {salonServices.length > 0 ? (
                        salonServices.slice(0, 3).map(s => (
                          <div
                            key={s._id}
                            className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-rose-50/40 dark:bg-slate-950/60 border border-rose-100/70 dark:border-slate-800/80 hover:border-rose-300 dark:hover:border-slate-700 transition-colors"
                          >
                            <span className="text-slate-800 dark:text-slate-200 font-bold">{s.nameAr || s.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-rose-600 dark:text-emerald-400">{s.price} {s.currency}</span>
                              <button
                                onClick={() => onBookService(salon, s)}
                                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition-all shadow-xs hover:shadow-md"
                              >
                                حجز
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 dark:text-slate-500 py-1">
                          لا توجد خدمات مطابقة للتصنيف المختار
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-rose-50/30 dark:bg-slate-950/60 border-t border-rose-100/70 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-400" />
                    <span className="font-mono">{salon.phone || '0500000000'}</span>
                  </div>
                  <button
                    onClick={() => setSelectedSalon(salon)}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1 transition-colors"
                  >
                    عرض الملف والخدمات
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Salon Details Modal */}
      {selectedSalon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-rose-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedSalon.salonName}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">{selectedSalon.city} • {selectedSalon.address}</span>
              </div>
              <button
                onClick={() => setSelectedSalon(null)}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-bold px-3 py-1.5 bg-rose-50 dark:bg-slate-800 rounded-xl"
              >
                إغلاق
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">قائمة الخدمات الكاملة</h4>
              <div className="space-y-2">
                {services
                  .filter(s => s.salonId === selectedSalon._id)
                  .map(s => (
                    <div
                      key={s._id}
                      className="p-3.5 bg-rose-50/40 dark:bg-slate-950 border border-rose-100 dark:border-slate-800 rounded-2xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{s.nameAr || s.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3 text-rose-400" />
                          <span>{s.durationMins} دقيقة</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-rose-600 dark:text-emerald-400 text-sm">{s.price} {s.currency}</span>
                        <button
                          onClick={() => {
                            onBookService(selectedSalon, s);
                            setSelectedSalon(null);
                          }}
                          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                        >
                          حجز الآن
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
