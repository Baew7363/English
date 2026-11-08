import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert, Clock, AlertCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
          <Mail className="w-3.5 h-3.5" />
          <span>صفحة إلزامية في برنامج قوقل أدسنس</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          اتصل بنا وقنوات التواصل المباشرة
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          تشترط Google وجود وسيلة اتصال حقيقية ومفعلة للتأكد من هوية الناشر وإتاحة وسيلة للقراء والمعلنين للإبلاغ عن أي انتهاكات أو استفسارات.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Information & Publisher Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
              معلومات الاتصال والتحقق
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">البريد الإلكتروني المعتمد:</span>
                <span className="text-sm font-semibold text-slate-900 font-mono">
                  contact@yourdomain.com
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  مخصص للاستفسارات العامة، والامتثال، وحقوق النشر.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">وقت الاستجابة المتوقع:</span>
                <span className="text-sm font-semibold text-slate-900">
                  خلال 24 إلى 48 ساعة كحد أقصى
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  من الأحد إلى الخميس (ساعات العمل الرسمية).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">المقر الإداري للناشر:</span>
                <span className="text-sm font-semibold text-slate-900">
                  المملكة العربية السعودية / الشرق الأوسط
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>ملاحظة أمان Google AdSense:</span>
            </div>
            <p className="leading-relaxed">
              إذا كنت تتواصل للإبلاغ عن مشكلة في إعلان تابع لشبكة Google يظهر على الموقع، يرجى تزويدنا برابط الصفحة ولقطة شاشة لتسهيل التبليغ المباشر في مركز إدارة جودة إعلانات Google.
            </p>
          </div>
        </div>

        {/* Interactive Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <h3 className="font-bold text-lg text-slate-900 mb-1">
            أرسل لنا رسالة مباشرة
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            يرجى تعبئة النموذج أدناه وسيصل إشعار فوري لفريق الإدارة للرد عليك.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-950">
                تم استلام رسالتك بنجاح!
              </h4>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                شكراً لتواصلك معنا. سنقوم بمراجعة طلبك والرد على بريدك الإلكتروني المدخل في غضون 24 ساعة.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', subject: 'general', message: '' });
                }}
                className="mt-3 text-xs bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="مثال: عبد الله محمد"
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-500 focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  موضوع الرسالة
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-500 focus:bg-white transition-all"
                >
                  <option value="general">استفسار عام حول الموقع</option>
                  <option value="dmca">إشعار حقوق الطبع والنشر (DMCA)</option>
                  <option value="adsense">إبلاغ عن إعلان غير لائق أو مخالف</option>
                  <option value="privacy">طلب بموجب سياسة الخصوصية وGDPR</option>
                  <option value="partnership">شراكة تجارية أو اقتراح محتوى</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نص الرسالة <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="اكتب رسالتك أو استفسارك بالتفصيل..."
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl p-3.5 outline-none focus:border-amber-500 focus:bg-white transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة الآن</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
