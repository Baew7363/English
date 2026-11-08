import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ADSENSE_READINESS_CRITERIA } from '../data/adsensePolicies';
import { ChecklistItem } from '../types';

interface ReadinessCheckerProps {
  onGoToTab: (tab: string) => void;
}

export const AdsenseReadinessChecker: React.FC<ReadinessCheckerProps> = ({ onGoToTab }) => {
  const [items, setItems] = useState<ChecklistItem[]>(ADSENSE_READINESS_CRITERIA);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const scorePercent = Math.round((completedCount / totalCount) * 100);

  const getStatusBadge = () => {
    if (scorePercent === 100) {
      return {
        label: 'موقعك مؤهل وجاهز للتقديم على AdSense بنسبة 100%!',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        textColor: 'text-emerald-700',
        advice: 'تهانينا! موقعك يستوفي جميع اشتراطات وسياسات Google AdSense المعلنة. يمكنك التقديم الآن بثقة تامة.',
      };
    } else if (scorePercent >= 70) {
      return {
        label: 'جاهزية جيدة، ولكن توجد نقاط حرجة يجب استكمالها',
        color: 'bg-amber-100 text-amber-800 border-amber-300',
        textColor: 'text-amber-700',
        advice: 'أنت قريب جداً من القبول! استكمل البنود غير المكتملة أدناه (خاصة شروط المحتوى وملف ads.txt) قبل إرسال طلب المراجعة.',
      };
    } else {
      return {
        label: 'غير جاهز حالياً - احتمال الرفض مرتفع جداً',
        color: 'bg-red-100 text-red-800 border-red-300',
        textColor: 'text-red-700',
        advice: 'لا تقدم موقعك الآن لـ Google AdSense لتفادي الرفض الفوري بسبب "محتوى قليل الأهمية" أو نقص الصفحات القانونية. أصلح النقاط المحددة أولاً.',
      };
    }
  };

  const status = getStatusBadge();

  const filteredItems = items.filter(
    (item) => filterCategory === 'all' || item.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Overview Banner Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>فاحص الامتثال لسياسات Google AdSense</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              مدقق الجاهزية لقبول الموقع في قوقل أدسنس
            </h2>
            <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed">
              تراجع فرق Google مواقع الناشرين بناءً على قائمة معايير إلزامية محددة. قم بفحص موقعك خطوة بخطوة وتأكد من اكتمال كل شرط قبل الضغط على زر &quot;إرسال المراجعة&quot;.
            </p>
          </div>

          {/* Score Circular / Progress Badge */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-800/80 rounded-2xl border border-slate-700 shrink-0 w-44 text-center">
            <span className="text-4xl md:text-5xl font-black text-amber-400 tracking-tight">
              {scorePercent}%
            </span>
            <span className="text-xs text-slate-300 font-medium mt-1">
              مكتمل ({completedCount} من {totalCount})
            </span>
            <div className="w-full bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  scorePercent === 100
                    ? 'bg-emerald-400'
                    : scorePercent >= 70
                    ? 'bg-amber-400'
                    : 'bg-red-400'
                }`}
                style={{ width: `${scorePercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dynamic Status message */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${status.color}`}>
              {status.label}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {status.advice}
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'كافة المعايير (10)' },
          { id: 'legal', label: 'الصفحات والسياسات القانونية (5)' },
          { id: 'content', label: 'جودة المحتوى ومحاربة النسخ (2)' },
          { id: 'technical', label: 'المتطلبات التقنية وads.txt (2)' },
          { id: 'ux', label: 'تجربة المستخدم والتنقل (1)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-4 md:p-5 transition-all shadow-xs ${
                item.completed
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Checkbox and Title */}
                <div
                  onClick={() => toggleItem(item.id)}
                  className="flex items-start gap-3 cursor-pointer select-none flex-1"
                >
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 transition-transform active:scale-95"
                    aria-label="تحديد الاكتمال"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 hover:text-amber-500" />
                    )}
                  </button>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4
                        className={`font-bold text-sm md:text-base ${
                          item.completed ? 'text-slate-900' : 'text-slate-800'
                        }`}
                      >
                        {item.title}
                      </h4>
                      {item.importance === 'critical' && (
                        <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-200">
                          حرج جداً
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Details Accordion toggle */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 shrink-0"
                  title="مزيد من التفاصيل"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                    <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>المرجع في سياسات Google الرسمية: {item.adsenseRuleRef}</span>
                  </div>
                  <p className="leading-relaxed text-slate-600">
                    تدقق خوارزميات الذكاء الاصطناعي لـ Google والمراجعون البشريون في تواجد هذا العنصر وتكامله. غيابه هو السبب الأكثر شيوعاً لرسائل الرفض مثل &quot;الموقع غير جاهز لعرض الإعلانات&quot; أو &quot;انتهاك سياسات البرنامج&quot;.
                  </p>
                  {item.category === 'legal' && (
                    <button
                      onClick={() => onGoToTab('privacy')}
                      className="inline-flex items-center gap-1 text-amber-700 font-bold hover:underline pt-1"
                    >
                      <span>عرض وتوليد النص القانوني المعتمد لهذا البند</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
