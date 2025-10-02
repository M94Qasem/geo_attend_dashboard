const plugin = require("tailwindcss/plugin");

module.exports = {
  // المسارات التي تخبر Tailwind أين يبحث عن الكلاسات
  content: [
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./public/index.html",
  ],

  // 1. تفعيل الوضع الليلي باستخدام استراتيجية الكلاس
  darkMode: 'class',

  // 2. قائمة الأمان لضمان بناء الكلاسات الديناميكية المستخدمة في الجداول
  safelist: [
    'text-emerald-500',
    'text-orange-500',
    'text-yellow-500',
    'text-red-500',
    'text-amber-500', // تمت الإضافة لضمان عمل لون حالة "Override"
  ],

  theme: {
    // استخدم `extend` لإضافة أو تعديل الكلاسات دون حذف الإعدادات الافتراضية
    extend: {
      // 3. إضافة ألوان مخصصة للوضع الليلي لتسهيل الاستخدام
      colors: {
        dark: {
          background: '#1a202c', // لون الخلفية الرئيسي للوضع الليلي
          card: '#2d3748',       // لون خلفية البطاقات في الوضع الليلي
          text: '#e2e8f0',        // لون النص الأساسي في الوضع الليلي
          subtext: '#a0aec0',     // لون النص الفرعي في الوضع الليلي
        },
      },
      
      // كل التخصيصات الخاصة بك محفوظة هنا
      minHeight: { "screen-75": "75vh" },
      fontSize: { 55: "55rem" },
      opacity: { 80: ".8" },
      zIndex: { 2: 2, 3: 3 },
      inset: {
        "-100": "-100%", "-225-px": "-225px", "-160-px": "-160px",
        "-150-px": "-150px", "-94-px": "-94px", "-50-px": "-50px",
        "-29-px": "-29px", "-20-px": "-20px", "25-px": "25px",
        "40-px": "40px", "95-px": "95px", "145-px": "145px",
        "195-px": "195px", "210-px": "210px", "260-px": "260px",
      },
      height: {
        "95-px": "95px", "70-px": "70px", "350-px": "350px",
        "500-px": "500px", "600-px": "600px",
      },
      maxHeight: { "860-px": "860px" },
      maxWidth: {
        "100-px": "100px", "120-px": "120px", "150-px": "150px",
        "180-px": "180px", "200-px": "200px", "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: { "140-px": "140px", 48: "12rem" },
      backgroundSize: { full: "100%" },
    },
  },

  plugins: [
    // إضافة النماذج ضرورية لتنسيق حقول الإدخال
    require("@tailwindcss/forms"),
  ],
};
