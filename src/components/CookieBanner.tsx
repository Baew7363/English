import React, { useState, useEffect } from 'react';
import { Cookie, ShieldAlert, Check, Settings2, X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean; // Google AdSense & personalized ads
}

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('adsense_cookie_consent');
    if (!saved) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allOn: CookiePreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
    };
    saveAndClose(allOn);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      advertising: false,
    };
    saveAndClose(essentialOnly);
  };

  const handleSaveCustom = () => {
    saveAndClose(preferences);
    setShowModal(false);
  };

  const saveAndClose = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    localStorage.setItem('adsense_cookie_consent', JSON.stringify(prefs));
    setShowBanner(false);
  };

  // Expose global trigger for footer "إدارة الكوكيز"
  useEffect(() => {
    const handler = () => {
      setShowModal(true);
    };
    window.addEventListener('open_cookie_preferences', handler);
    return () => window.removeEventListener('open_cookie_preferences', handler);
  }, []);

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Floating Bottom Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-700 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom duration-300">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p className="font-semibold text-white text-sm sm:text-base mb-1 flex items-center gap-2">
                  <span>إشعار الخصوصية وملفات تعريف الارتباط (Google AdSense & GDPR)</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded">
                    متطلب إلزامي
                  </span>
                </p>
                نحن وشركاؤنا الإعلانيون (بما في ذلك شركة <strong>Google</strong>) نستخدم ملفات تعريف الارتباط وتقنيات مماثلة لجمع المعلومات، وقياس كفاءة الإعلانات، وعرض إعلانات ملائمة ومخصصة استناداً إلى زياراتك السابقة. يمكنك اختيار قبول جميع ملفات تعريف الارتباط أو رفض غير الضرورية أو تخصيص تفضيلاتك.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={handleAcceptAll}
                className="flex-1 md:flex-initial bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs md:text-sm transition-colors shadow-sm"
              >
                قبول الكل
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="flex-1 md:flex-initial bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-3.5 py-2 rounded-lg text-xs md:text-sm transition-colors border border-slate-700"
              >
                رفض غير الضرورية
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-2 text-slate-400 hover:text-white text-xs md:text-sm flex items-center gap-1 transition-colors underline"
              >
                <Settings2 className="w-3.5 h-3.5" />
                تخصيص الخيارات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base md:text-lg text-slate-900">
                  إدارة تفضيلات ملفات تعريف الارتباط (Cookies)
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              وفقاً لسياسة موافقة المستخدم في الاتحاد الأوروبي (EU User Consent Policy) الصادرة عن Google، يمكنك تحديد فئات ملفات تعريف الارتباط المسموح بتفعيلها على هذا المتصفح:
            </p>

            <div className="space-y-3">
              {/* Category 1: Strictly Necessary */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-slate-900">
                    ملفات تعريف الارتباط الأساسية (Strictly Necessary)
                  </span>
                  <span className="text-[11px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                    مفعّلة دائماً
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  ضرورية لعمل وظائف الموقع وحمايته وأمان الجلسة. لا يمكن تعطيلها.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-3 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-slate-900">
                    ملفات التحليلات والإحصاء (Analytics)
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  تساعدنا على فهم كيفية تفاعل الزوار مع صفحات الموقع لتطوير المحتوى.
                </p>
              </div>

              {/* Category 3: Google AdSense & Personalized Ads */}
              <div className="p-3 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors bg-amber-50/40">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-slate-900">
                      ملفات الإعلانات المخصصة (Google AdSense)
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                      أدسنس
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) =>
                      setPreferences({ ...preferences, advertising: e.target.checked })
                    }
                    className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  تسمح لشركة Google ومورديها المعتمدين بعرض إعلانات ملائمة لاهتماماتك. في حال التعطيل، ستظل ترى إعلانات ولكنها ستكون غير مخصصة.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs md:text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveCustom}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs md:text-sm transition-colors"
              >
                حفظ التفضيلات
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
