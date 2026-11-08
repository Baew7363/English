import React, { useState } from 'react';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const AdsTxtGenerator: React.FC = () => {
  const [pubId, setPubId] = useState('pub-0000000000000000');
  const [copied, setCopied] = useState(false);

  // Clean and format pub ID
  const cleanPubId = pubId.trim().startsWith('pub-')
    ? pubId.trim()
    : `pub-${pubId.trim()}`;

  const isValidFormat = /^pub-\d{16}$/.test(cleanPubId);
  const adsTxtContent = `google.com, ${cleanPubId}, DIRECT, f08c47fec0942fa0`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(adsTxtContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([adsTxtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ads.txt';
    link.click;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Authorized Digital Sellers (ads.txt)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              منشئ ومصحح ملف ads.txt الرسمي لـ AdSense
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              تطلب Google من جميع الناشرين إضافة ملف <code>ads.txt</code> في المجلد الجذري للموقع لحماية مخزونك الإعلاني من التزييف وتفادي رسالة التحذير الشهيرة: &quot;أرباحك في خطر&quot;.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl shrink-0 max-w-xs text-xs text-amber-900 leading-relaxed">
            <span className="font-bold block mb-1">المعرّف الأمني لقوقل:</span>
            <code>f08c47fec0942fa0</code> هو المعرّف الثابت الرسمي المعتمد من هيئة IAB لشركة Google LLC.
          </div>
        </div>

        {/* Form Input */}
        <div className="max-w-xl space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              رقم تعريف الناشر الخاص بك (Publisher ID)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثال: pub-1234567890123456"
                value={pubId}
                onChange={(e) => setPubId(e.target.value)}
                className={`w-full text-base font-mono bg-slate-50 border rounded-xl px-4 py-2.5 outline-none transition-all ${
                  isValidFormat
                    ? 'border-emerald-500 bg-emerald-50/20 focus:ring-2 focus:ring-emerald-200'
                    : 'border-slate-300 focus:border-amber-500 focus:bg-white'
                }`}
              />
              <span className="absolute left-3 top-3 text-xs text-slate-400 font-mono">
                {cleanPubId.length}/20 حرف
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              يمكنك العثور عليه في حساب AdSense &gt; الحساب &gt; معلومات الحساب &gt; رقم تعريف الناشر.
            </p>
          </div>

          {!isValidFormat && pubId !== 'pub-0000000000000000' && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                تنبيه: يجب أن يتكون رقم الناشر من بادئة <code>pub-</code> متبوعة بـ 16 رقماً بالضبط.
              </span>
            </div>
          )}
        </div>

        {/* Output Code Block */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-800 mb-2">
            محتوى ملف <code>ads.txt</code> الناتج:
          </label>
          <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-x-auto">
            <span className="select-all tracking-wide">{adsTxtContent}</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ السطر</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تنزيل ملف ads.txt</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Instructions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* WordPress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
            <span>🌐 لمواقع ووردبريس (WordPress)</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            ثبّت إضافة مجانية مثل <strong>Ads.txt Manager</strong>، ثم توجّه إلى إعدادات &gt; Ads.txt، والصق السطر أعلاه واضغط حفظ. أو ارفع الملف يدوياً إلى مجلد <code>public_html</code> عبر مدير الملفات.
          </p>
          <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg font-mono">
            الرابط النهائي: example.com/ads.txt
          </div>
        </div>

        {/* Blogger */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
            <span>📝 لمدونات بلوجر (Blogger)</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            انتقل إلى لوحة تحكم مدونتك &gt; <strong>الإعدادات (Settings)</strong> &gt; مرر لأسفل إلى قسم <strong>تحقيق الربح (Monetization)</strong> &gt; فعّل &quot;تفعيل ملف ads.txt مخصص&quot;، والصق السطر بالكامل واضغط حفظ.
          </p>
          <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg font-mono">
            يتفعل تلقائياً خلال دقائق في بلوجر
          </div>
        </div>

        {/* Custom Server / Next.js / Vite */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
            <span>⚙️ الخوادم المخصصة وبرمجة الويب</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            ضع الملف مباشرة في المجلد العام (Public Root Directory) ليكون متاحاً برمجياً على المسار الأساسي <code>/ads.txt</code> مع كود استجابة HTTP 200 ونوع المحتوى <code>text/plain</code>.
          </p>
          <div className="text-[11px] text-slate-700 bg-slate-100 p-2 rounded-lg font-mono">
            HTTP 200 OK Content-Type: text/plain
          </div>
        </div>
      </div>
    </div>
  );
};
