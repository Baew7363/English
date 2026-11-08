import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { PolicyViewer } from './components/PolicyViewer';
import { AdsenseReadinessChecker } from './components/AdsenseReadinessChecker';
import { AdsTxtGenerator } from './components/AdsTxtGenerator';
import { PolicyCustomizer } from './components/PolicyCustomizer';
import { ContactView } from './components/ContactView';
import { ADSENSE_POLICIES } from './data/adsensePolicies';
import { PolicyTab } from './types';
import {
  ShieldCheck,
  CheckCircle2,
  FileCode2,
  Sliders,
  CheckSquare,
  Sparkles,
  Award,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PolicyTab>('privacy');
  const [searchQuery, setSearchQuery] = useState('');

  const currentPolicy = ADSENSE_POLICIES.find((p) => p.id === currentTab);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Quick AdSense Approval Checklist Quick Bar */}
        <section className="mb-6 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm md:text-base text-slate-900">
                حزمة سياسات Google AdSense الكاملة (2026)
              </h2>
              <p className="text-xs text-slate-600">
                تشمل سياسة الخصوصية الإلزامية، إفصاح كوكيز DART، حظر النقرات غير الشرعية، ومولد ads.txt
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setCurrentTab('readiness-checker')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'readiness-checker'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>فحص جاهزية موقعي</span>
            </button>

            <button
              onClick={() => setCurrentTab('customizer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'customizer'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>استخراج نصوص لموقعي</span>
            </button>
          </div>
        </section>

        {/* Dynamic Tab Views */}
        {currentTab === 'readiness-checker' && (
          <AdsenseReadinessChecker onGoToTab={(tab) => setCurrentTab(tab as PolicyTab)} />
        )}

        {currentTab === 'ads-txt' && <AdsTxtGenerator />}

        {currentTab === 'customizer' && <PolicyCustomizer />}

        {currentTab === 'contact' && <ContactView />}

        {/* Regular Policy Documents (privacy, terms, cookies, disclaimer, publisher-guidelines, about) */}
        {currentPolicy && currentTab !== 'contact' && (
          <PolicyViewer
            policy={currentPolicy}
            searchQuery={searchQuery}
            onGoToCustomizer={() => setCurrentTab('customizer')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Interactive EU User Consent / GDPR Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
