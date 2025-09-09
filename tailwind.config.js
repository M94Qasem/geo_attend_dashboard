const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  // Using the modern 'content' property instead of 'purge'
  content: {
    files: [
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./public/index.html",
    ],
    // Safelist ensures these classes are never removed by PurgeCSS
    safelist: [
      'bg-lightBlue-600', // For the dashboard header
      'bg-blueGray-100',  // For the page background
      'bg-green-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-indigo-500',
      'text-lightBlue-500', // For active sidebar links
      'hover:text-lightBlue-600',
    ],
  },
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      // Your existing extensions are correct and remain unchanged
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
  variants: [
    "responsive", "group-hover", "focus-within", "first", "last",
    "odd", "even", "hover", "focus", "active", "visited", "disabled",
  ],
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      const screens = theme("screens", {});
      addComponents([
        { ".container": { width: "100%" } },
        { [`@media (min-width: ${screens.sm})`]: { ".container": { "max-width": "640px" } } },
        { [`@media (min-width: ${screens.md})`]: { ".container": { "max-width": "768px" } } },
        { [`@media (min-width: ${screens.lg})`]: { ".container": { "max-width": "1024px" } } },
        { [`@media (min-width: ${screens.xl})`]: { ".container": { "max-width": "1280px" } } },
        { [`@media (min-width: ${screens["2xl"]})`]: { ".container": { "max-width": "1280px" } } },
      ]);
    }),
  ],
};
