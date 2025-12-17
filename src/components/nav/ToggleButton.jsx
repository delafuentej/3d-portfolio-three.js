import { ImSwitch } from "react-icons/im";
import useStore from "../../store/useStore";
import { useAudioUnlock } from "../../hooks/useAudioUnlock";
import { playSound } from "../../audio/audioEngine";

const ToggleButton = () => {
  const toggleMenu = useStore((state) => state.menu.toggle);
  const isMenuOpen = useStore((state) => state.menu.isOpen);

  const { unlock } = useAudioUnlock();

  const handlePointerDown = async () => {
    // 🔓 desbloqueo real del audio
    await unlock();
    playSound(isMenuOpen ? "close" : "open");

    // 🔁 cambia estado DESPUÉS
    toggleMenu();
  };
  // switch-on
  return (
    <div className="menu-toggle-btn" onPointerDown={handlePointerDown}>
      <ImSwitch className={`${isMenuOpen ? "switch-off" : "switch-on"}`} />
    </div>
  );
};

export default ToggleButton;
