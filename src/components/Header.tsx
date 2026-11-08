import React from 'react';
import { ShieldCheck, Search, CheckCircle2, FileText, CheckSquare, Sparkles } from 'lucide-react';
import { PolicyTab } from '../types';

interface HeaderProps {
  currentTab: PolicyTab;
  onSelectTab: (tab: PolicyTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
}) => {
  const tabs: { id: PolicyTab; label: string; icon: string; highlight?: boolean }[] = [
    { id: 'privacy', label: 'سياسة الخصوصية', icon: '🔒' },
    { id: 'terms', label: 'شروط الاستخدام', icon: '📜' },
    { id: 'cookies', label: 'ملفات الكوكيز', icon: '🍪' },
    { id: 'disclaimer', label: 'إخلاء المسؤولية', icon: '⚖️' },
    { id: 'publisher-guidelines', label: 'سياسات المحتوى', icon: '🛡️' },
    { id: 'about', label: 'من نحن', icon: '👥' },
    { id: 'contact', label: 'اتصل بنا', icon: '✉️' },
    { id: 'ads-txt', label: 'منشئ ads.txt', icon: '📄', highlight: true },
    { id: 'readiness-checker', label: 'فاحص الجاهزية', icon: '🔍', highlight: true },
    { id: 'customizer', label: 'توليد لموقعك', icon: '⚡', highlight: true },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top AdSense Notice bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold tracking-wider">
              Google AdSense
            </span>
            <span>جميع السياسات والصفحات الإلزامية لقبول المواقع وتفادي الرفض</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-black/15 px-3 py-0.5 rounded-full text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>متوافق 100% مع لوائح 2026 وGDPR</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div
              onClick={() => onSelectTab('privacy')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                    سياسات قوقل أدسنس المعتمدة
                  </h1>
                  <span className="bg-amber-100 text-amber-800 text-[11px] px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                    الناشر المعتمد
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  الحل الشامل لصفحات الخصوصية، ads.txt، وفحص جاهزية قبول الموقع
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث في بنود السياسات (مثلاً: DART, كوكيز, الزيارات)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full text-sm bg-slate-100/80 border border-slate-300 focus:border-amber-500 focus:bg-white rounded-lg py-2 pr-9 pl-4 outline-none transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-3 md:mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs font-semibold'
                    : tab.highlight
                    ? 'bg-amber-50/80 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.highlight && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
