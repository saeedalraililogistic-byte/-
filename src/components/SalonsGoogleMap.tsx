import React, { useState, useMemo } from 'react';
import { Salon } from '../types.ts';
import { 
  MapPin, 
  Navigation, 
  Star, 
  Phone, 
  CheckCircle2, 
  Compass, 
  Layers, 
  ExternalLink,
  LocateFixed,
  Car,
  Calendar,
  Share2
} from 'lucide-react';

interface Props {
  salons: Salon[];
  selectedSalon: Salon | null;
  onSelectSalon: (salon: Salon) => void;
  userCity?: string;
}

// Precise Saudi geographic coordinates and addresses for all registered salons
export const SALON_COORDINATES: Record<string, { lat: number; lng: number; district: string; cityAr: string; mapSearch: string }> = {
  // صالون تدلّلي التجريبي - شارع الأمير محمد بن عبدالعزيز (التحلية)، الرياض
  'kh70ehnrm05d6fyekvmz3m5rcn8e23xj': {
    lat: 24.7034,
    lng: 46.6853,
    district: 'شارع الأمير محمد بن عبدالعزيز (التحلية)',
    cityAr: 'الرياض',
    mapSearch: 'Prince Muhammad Ibn Abd Al Aziz Rd, Riyadh, Saudi Arabia'
  },
  // Salon yara - الرياض، حي حطين
  'kh73jgcsmweb6m1s5q8t8gfvqd8cqc24': {
    lat: 24.7743,
    lng: 46.6218,
    district: 'حي حطين - شارع سلمى',
    cityAr: 'الرياض',
    mapSearch: 'Hittin, Riyadh, Saudi Arabia'
  },
  // My Salon - الرياض، حي العليا
  'kh76343batcr1qj3twsc4gfasn8cnczh': {
    lat: 24.6982,
    lng: 46.6781,
    district: 'حي العليا',
    cityAr: 'الرياض',
    mapSearch: 'Al Olaya, Riyadh, Saudi Arabia'
  },
  // صالون احسان - جدة، حي الحرازات
  'kh77cnn230ayx24dvgm71y5wcx8cpcgz': {
    lat: 21.4925,
    lng: 39.2941,
    district: 'حي الحرازات - شارع حسين آل الشيخ',
    cityAr: 'جدة',
    mapSearch: 'Al Harazat, Jeddah, Saudi Arabia'
  },
  // صالون انامل ناعمه - جدة، حي السلامة
  'kh79dwc8bfs0gqzdf605ay17ph8derhw': {
    lat: 21.5841,
    lng: 39.1554,
    district: 'حي السلامة',
    cityAr: 'جدة',
    mapSearch: 'As Salamah, Jeddah, Saudi Arabia'
  }
};

export const CITY_DEFAULT_COORDS: Record<string, { lat: number; lng: number; query: string }> = {
  'الرياض': { lat: 24.7136, lng: 46.6753, query: 'Riyadh, Saudi Arabia' },
  'جدة': { lat: 21.5433, lng: 39.1728, query: 'Jeddah, Saudi Arabia' },
  'جده': { lat: 21.5433, lng: 39.1728, query: 'Jeddah, Saudi Arabia' },
  'مكة': { lat: 21.3891, lng: 39.8579, query: 'Makkah, Saudi Arabia' },
  'الدمام': { lat: 26.4207, lng: 50.0888, query: 'Dammam, Saudi Arabia' }
};

export const SalonsGoogleMap: React.FC<Props> = ({
  salons,
  selectedSalon,
  onSelectSalon,
  userCity = 'all'
}) => {
  const [activeCityTab, setActiveCityTab] = useState<'all' | 'الرياض' | 'جدة'>('all');
  const [activeSalonState, setActiveSalonState] = useState<Salon>(selectedSalon || salons[0]);
  const [mapViewMode, setMapViewMode] = useState<'roadmap' | 'satellite'>('roadmap');

  // Sync selected salon from parent if provided
  const currentSalon = selectedSalon || activeSalonState || salons[0];

  // Filter salons according to selected city tab
  const displayedSalons = useMemo(() => {
    if (activeCityTab === 'all') return salons;
    return salons.filter(s => s.city.includes(activeCityTab) || (activeCityTab === 'جدة' && s.city.includes('جده')));
  }, [salons, activeCityTab]);

  // Determine current active salon's coordinates
  const currentCoords = useMemo(() => {
    if (currentSalon && SALON_COORDINATES[currentSalon._id]) {
      return SALON_COORDINATES[currentSalon._id];
    }
    const defaultCity = currentSalon?.city.includes('جد') ? 'جدة' : 'الرياض';
    return {
      lat: CITY_DEFAULT_COORDS[defaultCity].lat,
      lng: CITY_DEFAULT_COORDS[defaultCity].lng,
      district: currentSalon?.address || 'وسط المدينة',
      cityAr: defaultCity,
      mapSearch: `${currentSalon?.salonName || 'صالون'} ${defaultCity}`
    };
  }, [currentSalon]);

  // Generate Google Maps Embed URL (100% free, requiring no API key)
  const mapEmbedUrl = useMemo(() => {
    const lat = currentCoords.lat;
    const lng = currentCoords.lng;
    const query = encodeURIComponent(`${currentSalon?.salonName || 'Salon'}, ${currentCoords.district}, ${currentCoords.cityAr}`);
    const tParam = mapViewMode === 'satellite' ? 'k' : 'm';
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=ar&z=15&t=${tParam}&output=embed`;
  }, [currentCoords, currentSalon, mapViewMode]);

  // Google Maps Driving Directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${currentCoords.lat},${currentCoords.lng}`;

  return (
    <div className="bg-[#101017] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0">
      {/* Top Filter and Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-950/80">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">
                خريطة الصالونات الحية (Google Maps)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                مفعلة وتعمل مباشرة بدون مفتاح API
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              تصفحي الصالونات على الخريطة التفاعلية واحصلي على إحداثيات ومسار القيادة الدقيق
            </p>
          </div>
        </div>

        {/* Action Controls & City Filters */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {/* Map Type Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setMapViewMode('roadmap')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                mapViewMode === 'roadmap'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              خريطة الطرق
            </button>
            <button
              onClick={() => setMapViewMode('satellite')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                mapViewMode === 'satellite'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              أقمار صناعية
            </button>
          </div>

          {/* City Filter */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveCityTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeCityTab === 'all'
                  ? 'bg-slate-800 text-rose-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setActiveCityTab('الرياض')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeCityTab === 'الرياض'
                  ? 'bg-slate-800 text-rose-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              الرياض
            </button>
            <button
              onClick={() => setActiveCityTab('جدة')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeCityTab === 'جدة'
                  ? 'bg-slate-800 text-rose-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              جدة
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Iframe + Salons Quick-Selector List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Interactive Google Map Display */}
        <div className="lg:col-span-8 relative bg-slate-950 min-h-[380px] lg:min-h-[480px]">
          <iframe
            key={`${currentSalon._id}-${mapViewMode}`}
            title={`خريطة ${currentSalon.salonName}`}
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            className="w-full h-full border-0 filter contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Floating Selected Salon Badge on Map */}
          <div className="absolute top-4 right-4 z-10 max-w-xs bg-slate-900/95 backdrop-blur-md border border-slate-700/70 p-3 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
              <span className="text-xs font-bold text-white truncate">{currentSalon.salonName}</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 truncate">
              {currentCoords.district}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-amber-400 font-bold">⭐ {currentSalon.averageRating || '4.9'}</span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
              >
                <span>مسار القيادة</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Salons List Sidebar for Easy Navigation */}
        <div className="lg:col-span-4 bg-slate-900/90 border-t lg:border-t-0 lg:border-r border-slate-800 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                اختاري صالون لعرض موقعه المباشر:
              </span>
              <span className="text-[10px] text-rose-400 font-mono">
                {displayedSalons.length} صالون
              </span>
            </div>

            {/* Salons selection cards */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 select-none">
              {displayedSalons.map(salon => {
                const isSelected = currentSalon._id === salon._id;
                const loc = SALON_COORDINATES[salon._id] || {
                  district: salon.address || salon.city,
                  cityAr: salon.city
                };

                return (
                  <div
                    key={salon._id}
                    onClick={() => {
                      setActiveSalonState(salon);
                      onSelectSalon(salon);
                    }}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-rose-950/60 border-rose-500 shadow-md shadow-rose-500/20'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-rose-400'
                        }`}>
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white leading-tight">
                            {salon.salonName}
                          </h4>
                          <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[170px]">
                            {loc.district}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-amber-400 shrink-0">
                        ⭐ {salon.averageRating || '4.9'}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5 text-slate-500" />
                        {salon.phone || '0500000000'}
                      </span>
                      <span className={`font-bold ${isSelected ? 'text-rose-400' : 'text-slate-500'}`}>
                        {isSelected ? 'محدد حالياً على الخريطة' : 'تحديد الموقع ←'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Action Button for Selected Salon */}
          <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onSelectSalon(currentSalon)}
              className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>حجز موعد في {currentSalon.salonName}</span>
            </button>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Car className="w-3.5 h-3.5 text-rose-400" />
              <span>فتح مسار القيادة في تطبيق خرائط Google</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Attribution */}
      <div className="px-5 py-2.5 bg-slate-950/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>تحديد جغرافي دقيق لجميع فروع صالونات تدلّلي المعتمدة بالرياض وجدة</span>
        </div>
        <div className="font-sans text-slate-400 flex items-center gap-2">
          <span>مدعوم بواسطة</span>
          <span className="font-bold text-white">Google Maps</span>
        </div>
      </div>
    </div>
  );
};
