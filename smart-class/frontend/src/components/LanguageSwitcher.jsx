import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900 p-1">

      <button
        type="button"
        onClick={() => changeLanguage("fr")}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          i18n.language === "fr"
            ? "bg-blue-600 text-white"
            : "text-slate-400 hover:text-white"
        }`}
      >
        🇫🇷 FR
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("en")}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          i18n.language === "en"
            ? "bg-blue-600 text-white"
            : "text-slate-400 hover:text-white"
        }`}
      >
        🇬🇧 EN
      </button>

    </div>
  );
}