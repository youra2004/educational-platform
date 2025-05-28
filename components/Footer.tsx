import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-[#244877] px-16 py-12 text-white lg:px-28">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="mb-4 text-lg font-bold">
            {t("educational_platform")}
          </h3>
          <p className="max-w-xs text-gray-300">{t("develop_your_skills")}</p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">{t("contacts")}</h3>
          <p className="text-gray-300">{t("email")}: info@osvita.com</p>
          <p className="text-gray-300">{t("phone")}: +380 44 123 4567</p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">{t("follow_us")}</h3>
          <div className="flex gap-4 text-xl text-white">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter" />
            </a>
          </div>
        </div>
      </div>

      <div className="my-8 border-t border-gray-400/30" />

      <p className="text-center text-sm text-gray-300">
        {t("all_rights_reserved")}
      </p>
    </footer>
  );
};
