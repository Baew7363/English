import React from 'react';
import { ShieldCheck, Cookie, ExternalLink, Heart } from 'lucide-react';
import { PolicyTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const triggerCookieModal = () => {
    window.dispatchEvent(new CustomEvent('open_cookie_preferences'));
  };

  return (
    <footer className="bg-slate-900 text-slate-400 mt-16 border-t border-slate-800 text-xs">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Col 1: About & AdSense compliance badge */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>Google AdSense Compliance</span>
            </div>
            <p className="leading-relaxed text-slate-400 text-xs">
              المركز المرجعي الشامل للسياسات والشروط والصفحات الإلزامية المطلوبة لتأهيل وقبول المواقع الإلكترونية في شبكة إعلانات Google AdSense.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 font-medium text-[11px] border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>مُحدّث لسياسات 2026 الرسمية</span>
            </div>
          </div>

          {/* Col 2: Mandatory Legal Pages */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">الصفحات القانونية الإلزامية</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('privacy')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  سياسة الخصوصية (Privacy Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('terms')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  شروط الاستخدام ومكافحة النقرات غير الشرعية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('cookies')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  سياسة ملفات تعريف الارتباط (Cookies)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('disclaimer')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  إخلاء المسؤولية وإفصاح الإعلانات
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Publisher & Verification Tools */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">أدوات الفحص والتحقق</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('ads-txt')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  منشئ ومصحح ملف ads.txt
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('readiness-checker')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  فاحص جاهزية القبول في أدسنس (10 نقاط)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('publisher-guidelines')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  إرشادات المحتوى وتفادي &quot;محتوى قليل القيمة&quot;
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('customizer')}
                  className="hover:text-amber-400 transition-colors text-right text-amber-400 font-semibold"
                >
                  مولد السياسات المخصص لموقعك
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparency & Consent */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">الشفافية والموافقة</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  من نحن (E-E-A-T Identity)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="hover:text-amber-400 transition-colors text-right"
                >
                  اتصل بنا ونموذج المراسلة
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={triggerCookieModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
                >
                  <Cookie className="w-3.5 h-3.5 text-amber-400" />
                  <span>إدارة تفضيلات الكوكيز</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} - المركز المعتمد لسياسات ناشري Google AdSense.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://support.google.com/adsense/answer/48182"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 flex items-center gap-1"
            >
              <span>مركز مساعدة سياسات AdSense الرسمي</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 flex items-center gap-1"
            >
              <span>إعدادات إعلانات Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
