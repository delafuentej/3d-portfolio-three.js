import { useI18nStore } from "../../store/useI18nStore";
import useStore from "../../store/useStore";
import { LANGUAGES } from "../../constants";
import LanguageTrigger from "./LanguageTrigger";
import LanguageDropdown from "./LanguageDropdown";
import { useAudioUnlock } from "../../hooks/useAudioUnlock";
import { playSound } from "../../audio/audioEngine";

const LanguageSelect = () => {
  const lang = useI18nStore((s) => s.lang);
  const setLang = useI18nStore((s) => s.setLang);
  // state select language dropdown
  const open = useStore((s) => s.selectLanguage.isOpen);
  const toggle = useStore((s) => s.selectLanguage.toggle);
  const close = useStore((s) => s.selectLanguage.close);
  // audio:
  const { unlock } = useAudioUnlock();

  const current = LANGUAGES.find((l) => l.code === lang);

  const handleToggle = async () => {
    await unlock(); // desbloqueo del audio
    playSound(open ? "close" : "open"); // sonido según estado actual
    toggle(); // cambia estado
  };
  const handleSelectLanguage = async (code) => {
    await unlock(); // desbloquea audio
    playSound("select"); // sonido al seleccionar
    setLang(code); // cambia idioma
    close(); // cierra dropdown
  };

  return (
    <div className="language-select">
      <div className="relative w-15">
        <LanguageTrigger
          label={current.label}
          open={open}
          onToggle={handleToggle}
        />

        {open && (
          <LanguageDropdown
            languages={LANGUAGES}
            onSelect={handleSelectLanguage}
          />
        )}
      </div>
    </div>
  );
};

export default LanguageSelect;
