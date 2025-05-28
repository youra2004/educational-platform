"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChangeEvent } from "react";
import Cookies from "js-cookie";

const locales = [
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
];

export function LanguageSelector() {
  const currentLocale = useLocale();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    Cookies.set("NEXT_LOCALE", newLocale, { path: "/" });
    router.refresh();
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="rounded-md border bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  );
}
