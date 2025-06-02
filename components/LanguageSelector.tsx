"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";

const locales = [
  { code: "en", label: "English" },
  { code: "uk", label: "Ukrainian" },
];

export function LanguageSelector() {
  const currentLocale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    () => locales.find((l) => l.code === currentLocale) || locales[0],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (locale: typeof selected) => {
    setSelected(locale);
    Cookies.set("NEXT_LOCALE", locale.code);
    router.refresh();
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-grey bg-white px-4 py-2 text-sm font-medium text-secondary shadow-sm transition hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {selected.label}
        <i
          className={`fas fa-chevron-down ml-2 text-xs text-grey transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border border-grey bg-white py-1 shadow-lg">
          {locales.map((locale) => (
            <li
              key={locale.code}
              onClick={() => handleSelect(locale)}
              className={`cursor-pointer px-4 py-2 text-sm transition-colors duration-150 ${
                selected.code === locale.code
                  ? "bg-accent text-white"
                  : "text-secondary hover:bg-highlight hover:text-secondary"
              }`}
            >
              {locale.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
