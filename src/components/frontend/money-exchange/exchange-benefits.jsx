import {
  ShieldCheck,
  Plane,
  Clock,
  Banknote,
  FileCheck,
  CheckCircle,
  Headphones,
} from "lucide-react";

export default function ExchangeBenefits() {
  const steps = [
    {
      step: "০১",
      title: "মুদ্রা ও পরিমাণ নির্বাচন",
      desc: "আমাদের লাইভ রেট কনভার্টারে আপনি যে মুদ্রা দিতে এবং নিতে চান তা নির্বাচন করে পরিমাণ দিন।",
    },
    {
      step: "০২",
      title: "অনলাইনে রিকোয়েস্ট পাঠান",
      desc: "আপনার নাম, ফোন নম্বর এবং বিমানবন্দর বা ব্রাঞ্চ পিকআপ লোকেশন সিলেক্ট করে বুকিং কনফার্ম করুন।",
    },
    {
      step: "০৩",
      title: "১৫ মিনিটে কনফার্মেশন",
      desc: "আমাদের ফরেক্স এক্সিকিউটিভ কল করে ২৪ ঘণ্টার জন্য রেট লক করে আপনার অর্ডারটি প্রস্তুত রাখবেন।",
    },
    {
      step: "০৪",
      title: "ক্যাশ বুঝে নিন",
      desc: "ফ্লাইটের দিনে বিমানবন্দরে অথবা আমাদের নিকটস্থ ব্রাঞ্চে এসে পাসপোর্ট দেখিয়ে ক্যাশ গ্রহণ করুন।",
    },
  ];

  const features = [
    {
      icon: Banknote,
      title: "১০০% খাঁটি ও নতুন নোট",
      desc: "প্রতিটি কারেন্সি নোট আল্ট্রা-ভায়োলেট ও ম্যাগনেটিক ডিটেক্টর দ্বারা স্ক্যানকৃত এবং বিশ্বমানের নিখুঁত নোটের নিশ্চয়তা।",
    },
    {
      icon: Plane,
      title: "বিমানবন্দরে সরাসরি পিকআপ",
      desc: "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরের ডিপার্চার গেটে ফ্লাইট ছাড়ার পূর্বেই ক্যাশ আপনার হাতে পৌঁছে দেওয়া হবে।",
    },
    {
      icon: Clock,
      title: "২৪ ঘণ্টা রেট লক গ্যারান্টি",
      desc: "অনলাইনে একবার রিকোয়েস্ট পাঠালে বাজারে রেট বাড়লেও আপনার জন্য পূর্বের নির্ধারিত সেরা রেট বজায় থাকবে।",
    },
    {
      icon: FileCheck,
      title: "অফিসিয়াল পাসপোর্ট এনডোর্সমেন্ট",
      desc: "বাংলাদেশ ব্যাংকের অনুমোদিত নিয়ম অনুযায়ী পাসপোর্টে বৈধ মুদ্রা এনডোর্সমেন্ট সিল ও রসিদ প্রদান করা হয়।",
    },
  ];

  return (
    <div className="mt-14">
      {/* How it Works */}
      <div className="mb-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Easy 4-Step Process
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            যেভাবে মুদ্রা বিনিময় করবেন
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            ঝামেলাহীন ও দ্রুত প্রক্রিয়ায় আপনার ভ্রমণের প্রয়োজনীয় বৈদেশিক মুদ্রা নিশ্চিত করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition text-center"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-black text-lg">
                {s.step}
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">
                {s.title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Features */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-primary-dark to-[#083e68] p-6 sm:p-10 text-white shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-amber-300">
            <ShieldCheck className="h-4 w-4 text-amber-300" />
            Security & Reliability
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">
            কেন বরকত ট্রাভেলস থেকে কারেন্সি নিবেন?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-2">
            নিরাপদ লেনদেন, কোনো গোপন চার্জ নেই এবং বিমানবন্দর ডেলিভারির নিশ্চয়তা।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-gray-900 shadow">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  {f.title}
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white/10 border border-white/10 p-4 sm:p-5">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400 text-gray-950 font-bold">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                জরুরি মুদ্রা প্রয়োজন বা বিশেষ কারেন্সি রিকোয়েস্ট?
              </div>
              <div className="text-xs text-blue-200">
                আমাদের ২৪/৭ ফরেক্স হেল্পলাইন: +৮৮০১৭১২-৩৪৫৬৭৮
              </div>
            </div>
          </div>
          <a
            href="tel:+8801712345678"
            className="flex-shrink-0 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
          >
            সরাসরি কল করুন
          </a>
        </div>
      </div>
    </div>
  );
}
