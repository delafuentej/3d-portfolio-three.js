const LanguageOption = ({ code, label, onClick }) => {
  return (
    <li onClick={() => onClick(code)} className="language-option">
      {label}
    </li>
  );
};

export default LanguageOption;
