const LanguageTrigger = ({ label, open, onToggle }) => {
  return (
    <button onClick={onToggle} className="language-trigger">
      {label}
      {/* <span className={`transition-transform ${open ? "rotate-180" : ""}`}> */}
      {/* ▾ */}
      {/* </span> */}
    </button>
  );
};

export default LanguageTrigger;
