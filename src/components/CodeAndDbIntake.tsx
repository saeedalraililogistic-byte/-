import React, { useState } from 'react';
import { UploadCloud, FileCode, Database, Terminal, Check, Copy, Sparkles, Send, HelpCircle, Layers } from 'lucide-react';

export const CodeAndDbIntake: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'stack' | 'database' | 'checklist'>('upload');
  const [copied, setCopied] = useState(false);
  const [stackInfo, setStackInfo] = useState({
    frontend: 'React / Vite',
    backend: 'Node.js (Express)',
    database: 'PostgreSQL / SQL Dump',
    state: 'جاهز للاستيراد',
  });

  const [pastedCode, setPastedCode] = useState('');
  const [pastedSql, setPastedSql] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleCopyQuestions = () => {
    const questions = `بيانات المشروع المطلوب استكمالها:
1. نوع السورس كود (Front-end: React, Vue, Next.js / Back-end: Node.js, Laravel, Python...)
2. نوع قاعدة البيانات الحالية (PostgreSQL, MySQL, Firebase, MongoDB...)
3. ملفات الإعدادات والبيئة (.env) وبوابات الدفع المستخدمة
4. الدومين المطلوب ربطه للحملة الإعلانية`;
    navigator.clipboard.writeText(questions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyze = () => {
    if (!pastedCode.trim() && !pastedSql.trim()) {
      setAnalysisResult('يرجى لصق كود (package.json أو مسارات السيرفر) أو سكربت الـ SQL للبدء في الفحص والتشغيل.');
      return;
    }
    setAnalysisResult('تم استلام المدخلات بنجاح! نحن جاهزون لتركيب الحزم وإنشاء السيرفر والجداول فوراً.');
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden mb-8">
      {/* Navigation tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 pt-3 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('upload')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'upload'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          طريقة رفع الملفات
        </button>

        <button
          onClick={() => setActiveTab('stack')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'stack'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          تحديد لغات وتقنيات المشروع
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'database'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          إعداد الداتابيس (SQL / NoSQL)
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          درع الحماية القانونية والتقنية
        </button>
      </div>

      <div className="p-6">
        {/* TAB 1: HOW TO UPLOAD */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h4 className="font-bold text-white text-sm mb-2">
                  سحب وإفلات في متصفح الملفات
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  يمكنك سحب مجلد السورس كود أو ملفات المشروع مباشرة وإفلاتها داخل قائمة الملفات (File Tree) على يسار الشاشة في بيئة العمل.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h4 className="font-bold text-white text-sm mb-2">
                  إرسال الملفات أو الكود في المحادثة
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  يمكنك إرفاق ملفات الكود أو ملف قاعدة البيانات (مثل .sql أو .json أو .env) مباشرة في خانة الدردشة هنا.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h4 className="font-bold text-white text-sm mb-2">
                  لصق محتوى الكود مباشرة أدناه
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  إذا كان لديك ملف package.json أو روابط مستودع Github أو ملفات التكوين، يمكنك لصقها في المربع أدناه للفحص الفوري.
                </p>
              </div>
            </div>

            {/* Direct Paste Area */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  لصق كود حزم المشروع (package.json أو بنية الملفات):
                </label>
                <button
                  onClick={handleCopyQuestions}
                  className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'تم نسخ الأسئلة' : 'نسخ قائمة البيانات المطلوبة'}
                </button>
              </div>
              <textarea
                value={pastedCode}
                onChange={(e) => setPastedCode(e.target.value)}
                placeholder="الصق هنا محتوى package.json أو ملخص ملفات السورس كود أو قائمة المكتبات..."
                rows={5}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-slate-500">
                  بمجرد مشاركتك للملفات، سنقوم بتركيبها وتشغيل السيرفر تلقائياً.
                </span>
                <button
                  onClick={handleAnalyze}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  فحص وتجهيز البناء
                </button>
              </div>
              {analysisResult && (
                <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  {analysisResult}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: TECH STACK */}
        {activeTab === 'stack' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-300">
              اختر أو حدد تقنيات مشروعك الحالية لنقوم بتهيئة السيرفر ومترجم الأكواد بالطريقة المناسبة:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'الواجهة الأمامية (Frontend)', val: 'React / Next.js / Vue / HTML5', current: stackInfo.frontend },
                { label: 'الباك إند (Backend / API)', val: 'Node.js / Express / Python / Laravel', current: stackInfo.backend },
                { label: 'قاعدة البيانات (Database)', val: 'PostgreSQL / MySQL / Firebase / MongoDB', current: stackInfo.database },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">{item.label}</span>
                  <div className="text-sm font-bold text-emerald-300">{item.current}</div>
                  <span className="text-[11px] text-slate-500 mt-2 block">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-200 leading-relaxed">
              💡 <strong>ملاحظة مهمة:</strong> أياً كانت تقنية تطبيقك (React, Vite, Node.js, Express, Next, إلخ)، بيئة العمل هنا تدعم تشغيل الواجهات الكاملة والـ Full-stack APIs وقواعد البيانات السحابية بدون أي مشكلة.
            </div>
          </div>
        )}

        {/* TAB 3: DATABASE */}
        {activeTab === 'database' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">إعداد وتشغيل قاعدة البيانات</h3>
                <p className="text-xs text-slate-400 mt-1">
                  إذا كان لديك ملف .sql أو بيانات JSON أو رابط اتصال (Connection String)، يمكنك إدخاله هنا
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg">
                دعم كامل لـ SQL و Firebase
              </span>
            </div>

            <textarea
              value={pastedSql}
              onChange={(e) => setPastedSql(e.target.value)}
              placeholder="الصق هنا سكربت الـ SQL مثل: CREATE TABLE users (...); أو بيانات الجداول أو رابط الـ Database URL..."
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                <h4 className="text-xs font-bold text-slate-200 mb-2">خيارات الاستضافة المجانية/الاقتصادية:</h4>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>قاعدة بيانات Cloud SQL (PostgreSQL سحابي بدون إدارة معقدة)</li>
                  <li>Firebase Firestore (لقواعد البيانات اللحظية والتوثيق الآمن)</li>
                  <li>Supabase أو Neon (داتابيس PostgreSQL مجانية ومستقلة 100%)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                <h4 className="text-xs font-bold text-slate-200 mb-2">كيف تحمي بياناتك من الحذف؟</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تأكد من تنزيل نسخة احتياطية كاملة (Backup / SQL Dump) محلياً على جهازك فوراً، ولا تترك أي بيانات فقط لدى خوادم الشركة التي تطالبك برسوم غير مبررة.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEGAL & FINANCIAL SHIELD */}
        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2">
              إجراءات حماية مشروعك وعدم الخضوع للابتزاز:
            </h3>

            <div className="space-y-3">
              {[
                {
                  title: 'امتلاك السورس كود محلياً',
                  status: 'لديك الملفات كاملة',
                  details: 'طالما تم تسليمك الكود بالكامل، فأنت قانونياً وتقنياً تملك البرمجية بالكامل ولا يحق لأي طرف تعطيلها.',
                  ok: true,
                },
                {
                  title: 'استخراج وتصدير قاعدة البيانات (Database Dump)',
                  status: 'مهم فوراً',
                  details: 'قم بعمل Export لملف الـ SQL أو JSON حتى تكون بيانات العملاء والطلبات بيدك بنسبة 100%.',
                  ok: true,
                },
                {
                  title: 'نقل الدومين (Domain Name) لحسابك الخاص',
                  status: 'خطوة أساسية للحملة',
                  details: 'تأكد أن دومين موقعك (مثل yourbrand.com) مسجل في حسابك (Cloudflare, GoDaddy, Namecheap) وليس تحت حساب الشركة.',
                  ok: true,
                },
                {
                  title: 'تغيير مفاتيح الدفع والخدمات (Payment Gateways & APIs)',
                  status: 'أمان مالي',
                  details: 'تأكد أن بوابات الدفع (Stripe, Moyasar, HyperPay, Tap) تستقبل الأموال مباشرة في حساباتك البنكية.',
                  ok: true,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
