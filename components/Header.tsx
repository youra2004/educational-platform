"use client";

import { useEffect, useState } from "react";
import { Link } from "./Link";
import { Button } from "./Button";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";

export const Header = () => {
  const t = useTranslations();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else if (lastScrollY - currentScrollY > 5) {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const signOut = () => {
    localStorage.removeItem("user-token");
    window.location.href = "/auth/sign-in";
  };

  return (
    <header
      className={`sticky top-0 z-10 flex items-center justify-between bg-white px-16 py-8 transition-transform duration-300 lg:px-28 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <h2 className="text-3xl font-bold text-secondary">
        {t("educational_platform")}
      </h2>

      <div className="flex gap-4">
        <Link href="/courses">{t("courses")}</Link>
        <Link href="/leaders">{t("leaderboards")}</Link>
        <Link href="/study-notes">{t("study_notes")}</Link>
      </div>

      <div className="flex gap-4">
        <LanguageSelector />
        <Button variant="outline" onClick={signOut}>
          {t("leave")}
        </Button>
      </div>
    </header>
  );
};
