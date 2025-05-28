import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Available locales in your app
  locales: ["en", "uk"],
  // Fallback if no locale is set
  defaultLocale: "en",
  // Detect locale from cookie
  localeDetection: true,
  localePrefix: "never",
});
