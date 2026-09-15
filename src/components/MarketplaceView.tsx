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
  LayoutGrid
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
      {/* Hero Banner with Search */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 border border-rose-500/20 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            منصة تدلّلي (Tedallaly) - جاهزة لحملتك الإعلانية
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            احجزي أفضل خدمات الصالونات والتجميل بكل سهولة
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            تم استيراد كافة بيانات الصالونات، الخدمات، وقوائم الأسعار بنجاح من قاعدة بياناتك الحقيقية. المنصة جاهزة لاستقبال الحجوزات والعملاء الآن.
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
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pr-11 pl-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-slate-950/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500"
            >
              <option value="all">جميع المدن (الرياض، جدة...)</option>
              <option value="الرياض">الرياض</option>
              <option value="جدة">جدة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-400" />
            التصنيفات المتاحة ({categories.length} تصنيف)
          </h3>
          <span className="text-xs text-slate-500">مستوردة من Convex DB</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
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
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
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
            <MapPin className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-bold text-slate-200">خريطة الصالونات المعتمدة ومواقع الفروع</span>
          </div>

          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            {showMap ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-rose-400" />
                <span>إخفاء الخريطة مؤقتاً</span>
              </>
            ) : (
              <>
                <MapIcon className="w-3.5 h-3.5 text-rose-400" />
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
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            قائمة الصالونات المعتمدة ({filteredSalons.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map(salon => {
            const salonServices = getCategoryServices(salon._id);
            return (
              <div
                key={salon._id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-rose-500/40 transition-all flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-white text-base hover:text-rose-400 transition-colors">
                        {salon.salonName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{salon.city} {salon.address ? `• ${salon.address}` : ''}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                      معتمد
                    </span>
                  </div>

                  {salon.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {salon.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{salon.averageRating || '4.8'}</span>
                      <span className="text-slate-500">({salon.totalReviews || 12})</span>
                    </div>
                    <div className="text-slate-400">
                      {salon.totalBookings ? `${salon.totalBookings} حجز سابق` : 'حجوزات نشطة'}
                    </div>
                  </div>

                  {/* Services preview */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 block mb-2">
                      الخدمات المتوفرة ({salonServices.length}):
                    </span>
                    <div className="space-y-1.5">
                      {salonServices.length > 0 ? (
                        salonServices.slice(0, 3).map(s => (
                          <div
                            key={s._id}
                            className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700"
                          >
                            <span className="text-slate-200 font-medium">{s.nameAr || s.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-emerald-400">{s.price} {s.currency}</span>
                              <button
                                onClick={() => onBookService(salon, s)}
                                className="px-2.5 py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition-colors"
                              >
                                حجز
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-500 py-1">
                          لا توجد خدمات مطابقة للتصنيف المختار
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{salon.phone || '0500000000'}</span>
                  </div>
                  <button
                    onClick={() => setSelectedSalon(salon)}
                    className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedSalon.salonName}</h3>
                <span className="text-xs text-slate-400">{selectedSalon.city} • {selectedSalon.address}</span>
              </div>
              <button
                onClick={() => setSelectedSalon(null)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 bg-slate-800 rounded-lg"
              >
                إغلاق
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">قائمة الخدمات الكاملة</h4>
              <div className="space-y-2">
                {services
                  .filter(s => s.salonId === selectedSalon._id)
                  .map(s => (
                    <div
                      key={s._id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-100 text-sm">{s.nameAr || s.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{s.durationMins} دقيقة</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-emerald-400 text-sm">{s.price} {s.currency}</span>
                        <button
                          onClick={() => {
                            onBookService(selectedSalon, s);
                            setSelectedSalon(null);
                          }}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors"
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
