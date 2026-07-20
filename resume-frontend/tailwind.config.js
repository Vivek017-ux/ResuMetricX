// import themes from 'daisyui/theme/object.js';

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//        "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require("daisyui")
//   ],
//   daisyui:{
//     themes:["light", "dark", "night"],
//   }
// };


import themes from 'daisyui/theme/object.js';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: ["light", "dark", "night"],
  }
};