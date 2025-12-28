// components/settings/SettingsPanel.tsx

import { LanguageSelect } from "./language";
import { MusicToggleBtn } from "./music";

const SettingsPanel = () => {
  return (
    <div className="settings-panel">
      <LanguageSelect />
      <MusicToggleBtn />
    </div>
  );
};

export default SettingsPanel;
