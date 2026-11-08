import React, { useState } from 'react';
import {
  Copy,
  Check,
  Printer,
  Download,
  AlertTriangle,
  Info,
  Sliders,
  BookmarkCheck,
  Share2,
} from 'lucide-react';
import { PolicyDocument, PolicyTab } from '../types';

interface PolicyViewerProps {
  policy: PolicyDocument;
  searchQuery: string;
  onGoToCustomizer: () => void;
}

export const PolicyViewer: React.FC<PolicyViewerProps> = ({
  policy,
  searchQuery,
  onGoToCustomizer,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    policy.sections[0]?.id || ''
  );

  const handleCopyAll = async () => {
    const fullText = `${policy.title}\n${policy.englishTitle}\nآخر تحديث: ${policy.lastUpdated}\n\n${policy.summary}\n\n` +
      policy.sections
        .map((s) => `${s.title}\n\n${s.content}\n\n-------------------------\n`)
        .join('\n');

    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const fullText = `${policy.title} - ${policy.englishTitle}\nتاريخ التحديث: ${policy.lastUpdated}\n\n` +
      policy.summary +
      '\n\n' +
      policy.sections.map((s) => `${s.title}\n\n${s.content}\n`).join('\n\n======================\n\n');

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${policy.id}-adsense-policy.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper to highlight matching text
  const highlightMatches = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery.trim()})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark
              key={index}
              className="bg-amber-300 text-slate-900 px-0.5 rounded font-semibold"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const filteredSections = policy.sections.filter(
    (sec) =>
      !searchQuery.trim() ||
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sec.adsenseNote && sec.adsenseNote.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Table of Contents sidebar (Desktop) */}
      <div className="hidden lg:block lg:col-span-3 sticky top-36 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-1.5 pb-2 border-b border-slate-100">
          <BookmarkCheck className="w-4 h-4 text-amber-500" />
          <span>فهرس بنود السياسة</span>
        </h3>
        <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {policy.sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSectionId(sec.id);
                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block text-xs py-2 px-2.5 rounded-lg transition-colors leading-snug ${
                activeSectionId === sec.id
                  ? 'bg-amber-50 text-amber-900 font-bold border-r-3 border-amber-500'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-start gap-1">
                {sec.isAdsenseStrictRequirement && (
                  <span className="text-amber-500 font-black shrink-0">★</span>
                )}
                <span className="line-clamp-2">{sec.title}</span>
              </div>
            </a>
          ))}
        </nav>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={onGoToCustomizer}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>تخصيص بنودها لموقعك</span>
          </button>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-5 md:p-8 shadow-xs">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {policy.badge}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              آخر مراجعة وتحديث: {policy.lastUpdated}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            {policy.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-mono mb-4 dir-ltr text-right">
            {policy.englishTitle}
          </p>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {policy.summary}
          </p>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={handleCopyAll}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>تم نسخ السياسة كاملة!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ السياسة للنشر</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>تنزيل (TXT)</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>طباعة</span>
            </button>

            <button
              onClick={onGoToCustomizer}
              className="mr-auto flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              <span>استبدال اسم موقعك وبريدك تلقائياً</span>
            </button>
          </div>
        </div>

        {/* Section List */}
        {filteredSections.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl">
            <p className="text-slate-500 text-sm">
              لا توجد بنود تطابق بحثك: &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-44 border-b border-slate-100 pb-7 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">
                    {highlightMatches(section.title)}
                  </h3>
                  {section.isAdsenseStrictRequirement && (
                    <span className="shrink-0 text-[11px] bg-red-50 text-red-700 font-bold border border-red-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      شرط صارم لقبول أدسنس
                    </span>
                  )}
                </div>

                {/* AdSense Explanation Callout Box */}
                {section.adsenseNote && (
                  <div className="mb-4 bg-amber-50/80 border-r-4 border-amber-500 p-3 rounded-lg flex items-start gap-2.5 text-xs text-amber-950">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-amber-900 block mb-0.5">
                        لماذا تطلب Google AdSense هذا البند بالتحديد؟
                      </strong>
                      <span className="text-amber-900/90 leading-relaxed">
                        {section.adsenseNote}
                      </span>
                    </div>
                  </div>
                )}

                {/* Main Text Content */}
                <div className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line font-normal space-y-2">
                  {highlightMatches(section.content)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
