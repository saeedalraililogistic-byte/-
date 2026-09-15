import React from 'react';
import { Category } from '../types.ts';
import { 
  Sparkles, 
  Scissors, 
  Sparkle, 
  HeartHandshake, 
  Eye, 
  Home, 
  Smile, 
  Flame, 
  Bath, 
  Palette 
} from 'lucide-react';

interface Props {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesView: React.FC<Props> = ({ categories, onSelectCategory }) => {
  // Map icons to match the rich visual screenshot provided by the user
  const iconMap: Record<string, { icon: string; label: string }> = {
    hair: { icon: '✂️', label: 'شعر' },
    nails: { icon: '💅', label: 'أظافر' },
    makeup: { icon: '💄', label: 'مكياج' },
    facial: { icon: '✨', label: 'عناية بالوجه' },
    skincare: { icon: '🌿', label: 'العناية بالبشرة' },
    spa: { icon: '🧖‍♀️', label: 'سبا' },
    lashes: { icon: '👁️', label: 'رموش' },
    brows: { icon: '🪞', label: 'حواجب' },
    waxing: { icon: '🌸', label: 'إزالة الشعر' },
    barber: { icon: '💈', label: 'حلاقة' },
  };

  return (
    <div className="space-y-6">
      <div className="text-right">
        <h2 className="text-2xl font-black text-white">التصنيفات</h2>
        <p className="text-xs text-slate-400 mt-1">اختاري التصنيف المناسب لاستكشاف الصالونات والخدمات</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map(c => {
          const item = iconMap[c.slug] || { icon: '✨', label: c.nameAr || c.name };
          return (
            <div
              key={c._id}
              onClick={() => onSelectCategory(c._id)}
              className="bg-[#121218] border border-slate-800/80 hover:border-rose-500/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-[1.02] group"
            >
              <div className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-rose-300 transition-colors">
                {c.nameAr || item.label}
              </div>
            </div>
          );
        })}

        {/* Extra Home Service Tile (seen in user screenshots) */}
        <div
          onClick={() => onSelectCategory('homeservice')}
          className="bg-[#121218] border border-rose-500/30 hover:border-rose-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-[1.02] group"
        >
          <div className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform">
            🏠
          </div>
          <div className="text-xs font-bold text-rose-300">
            خدمات منزلية
          </div>
        </div>
      </div>
    </div>
  );
};
