import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      primary: "#EAE6DF",
      secondary: "#274C77",
      accent: "#6096BA",
      highlight: "#A3CEF1",
      warm: "#E7C8A0",
      grey: "#747A84",
    },
  },
};
export const plugins = [typography];
