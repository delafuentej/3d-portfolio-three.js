import LanguageOption from "./LanguageOption";

export default function LanguageDropdown({ languages, onSelect }) {
  return (
    <ul className="language-dropdown">
      {languages.map((lang) => (
        <LanguageOption key={lang.code} {...lang} onClick={onSelect} />
      ))}
    </ul>
  );
}
