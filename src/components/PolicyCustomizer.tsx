import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Code2,
  FileText,
  Globe,
  Mail,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { ADSENSE_POLICIES } from '../data/adsensePolicies';
import { CustomSiteConfig, PolicyTab } from '../types';

export const PolicyCustomizer: React.FC = () => {
  const [config, setConfig] = useState<CustomSiteConfig>({
    siteName: 'موقعي الإخباري',
    siteUrl: 'https://example.com',
    contactEmail: 'contact@example.com',
    country: 'المملكة العربية السعودية',
    pubId: 'pub-1234567890123456',
  });

  const [selectedPolicyId, setSelectedPolicyId] = useState<PolicyTab>('privacy');
  const [outputFormat, setOutputFormat] = useState<'plain' | 'html' | 'markdown'>('plain');
  const [copied, setCopied] = useState(false);

  const selectedPolicy =
    ADSENSE_POLICIES.find((p) => p.id === selectedPolicyId) || ADSENSE_POLICIES[0];

  // Replace placeholders in text
  const customizeText = (text: string) => {
    return text
      .replace(/موقعنا/g, config.siteName || 'موقعنا')
      .replace(/https:\/\/adssettings\.google\.com/g, 'https://adssettings.google.com')
      .replace(/صفحة "اتصل بنا"/g, `صفحة اتصل بنا أو عبر البريد (${config.contactEmail})`)
      .replace(/إدارة الموقع/g, `إدارة ${config.siteName}`);
  };

  const getCustomizedDocument = () => {
    let header = `${selectedPolicy.title} - ${config.siteName}\n`;
    header += `رابط الموقع: ${config.siteUrl}\n`;
    header += `البريد الرسمي للتواصل: ${config.contactEmail}\n`;
    header += `الدولة والولاية القضائية: ${config.country}\n`;
    header += `تاريخ التحديث: نوفمبر 2026\n\n`;

    const body = selectedPolicy.sections
      .map(
        (sec) =>
          `### ${sec.title}\n\n${customizeText(sec.content)}\n\n`
      )
      .join('--------------------------------------------\n\n');

    if (outputFormat === 'markdown') {
      return `# ${selectedPolicy.title}\n\n**${config.siteName}** (${config.siteUrl})\n\n${selectedPolicy.summary}\n\n` +
        selectedPolicy.sections
          .map((sec) => `## ${sec.title}\n\n${customizeText(sec.content)}`)
          .join('\n\n');
    }

    if (outputFormat === 'html') {
      return `<article dir="rtl" class="legal-policy-document">\n  <h1>${selectedPolicy.title} - ${config.siteName}</h1>\n  <p class="meta">آخر تحديث: نوفمبر 2026 | الموقع: <a href="${config.siteUrl}">${config.siteUrl}</a></p>\n  <p class="lead">${selectedPolicy.summary}</p>\n\n` +
        selectedPolicy.sections
          .map(
            (sec) =>
              `  <section>\n    <h2>${sec.title}</h2>\n    <p>${customizeText(
                sec.content
              ).replace(/\n\n/g, '</p>\n    <p>').replace(/\n/g, '<br/>')}</p>\n  </section>`
          )
          .join('\n\n') +
        `\n</article>`;
    }

    return header + selectedPolicy.summary + '\n\n' + body;
  };

  const generatedContent = getCustomizedDocument();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const ext = outputFormat === 'html' ? 'html' : outputFormat === 'markdown' ? 'md' : 'txt';
    const mime = outputFormat === 'html' ? 'text/html' : 'text/plain';
    const blob = new Blob([generatedContent], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedPolicyId}-${config.siteName || 'policy'}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>مولد السياسات المخصص لموقعك</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          تخصيص سياسات Google AdSense باسم ورابط موقعك
        </h2>
        <p className="text-amber-100 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
          أدخل بيانات موقعك أدناه لتوليد مستندات قانونية جاهزة فوراً للنسخ واللصق في ووردبريس أو بلوجر كصفحات مستقلة جاهزة لمراجعة أدسنس.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Inputs Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>بيانات موقعك المطلوبة</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              اسم الموقع أو المدونة
            </label>
            <input
              type="text"
              value={config.siteName}
              onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
              placeholder="مثال: عالم التقنية"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 outline-none focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              رابط الموقع الإلكتروني (URL)
            </label>
            <input
              type="url"
              value={config.siteUrl}
              onChange={(e) => setConfig({ ...config, siteUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 outline-none focus:border-amber-500 focus:bg-white transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              البريد الإلكتروني الرسمي للتواصل
            </label>
            <input
              type="email"
              value={config.contactEmail}
              onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
              placeholder="contact@example.com"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 outline-none focus:border-amber-500 focus:bg-white transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-amber-500" />
              الدولة أو المقر القانوني
            </label>
            <input
              type="text"
              value={config.country}
              onChange={(e) => setConfig({ ...config, country: e.target.value })}
              placeholder="مثال: المملكة العربية السعودية"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 outline-none focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              اختر الوثيقة المراد استخراجها:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {ADSENSE_POLICIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPolicyId(p.id)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-right transition-all border ${
                    selectedPolicyId === p.id
                      ? 'bg-amber-50 text-amber-900 border-amber-400 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Preview & Output */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs flex flex-col">
          {/* Output Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            {/* Format Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setOutputFormat('plain')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  outputFormat === 'plain'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                نص عادي
              </button>
              <button
                onClick={() => setOutputFormat('html')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  outputFormat === 'html'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                كود HTML جاهز
              </button>
              <button
                onClick={() => setOutputFormat('markdown')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  outputFormat === 'markdown'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Markdown
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
                    <span>نسخ النص</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تنزيل</span>
              </button>
            </div>
          </div>

          {/* Preview Box */}
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-y-auto max-h-[500px]">
            <pre className="text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
              {generatedContent}
            </pre>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            جاهز للاستخدام الفوري على ووردبريس، بلوجر، أو أي موقع آخر للاستيفاء الكامل لسياسات Google AdSense.
          </p>
        </div>
      </div>
    </div>
  );
};
