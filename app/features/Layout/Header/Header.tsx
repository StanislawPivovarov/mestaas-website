import { useTranslation } from "react-i18next";

import { changeAppLanguage } from "~/shared/i18n";
import logo from "~/shared/vectors/logo.svg";

const Header = () => {
    const { i18n, t } = useTranslation();
    const activeLanguage = i18n.resolvedLanguage ?? i18n.language;

    return (
        <header className="flex h-12 items-center justify-between border-b border-[#252525] px-6">
            <img src={logo} />
            <div
                aria-label={t("language.select")}
                className="inline-flex border border-[#252525]"
                role="group"
            >
                <button
                    aria-label={t("language.russian")}
                    aria-pressed={activeLanguage === "ru"}
                    className={`px-3 py-1 text-xs transition-colors ${activeLanguage === "ru"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                        }`}
                    onClick={() => void changeAppLanguage("ru")}
                    type="button"
                >
                    RU
                </button>
                <button
                    aria-label={t("language.english")}
                    aria-pressed={activeLanguage === "en"}
                    className={`px-3 py-1 text-xs transition-colors ${activeLanguage === "en"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                        }`}
                    onClick={() => void changeAppLanguage("en")}
                    type="button"
                >
                    EN
                </button>
            </div>
        </header>
    );
};

export default Header;
