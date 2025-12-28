import useStore from "../../../store/useStore";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { useAudioUnlock } from "../../../hooks/useAudioUnlock";
import { playSound } from "../../../audio/audioEngine";

const MusicToggleBtn = () => {
  // 🔹 Asegurarnos de que estamos leyendo correctamente del store
  const isEnabled = useStore((state) => state.musicEnabled);
  const toggle = useStore((state) => state.toggleMusic);

  // audio click button
  const { unlock } = useAudioUnlock();

  const handleClick = async () => {
    await unlock();
    playSound("select");
    toggle();
  };

  return (
    <button
      onClick={() => handleClick()}
      className={`music-toggle-btn ${isEnabled ? "ring-1 ring-[#00897B]" : ""}`}
    >
      <div className="music-toggle-content">
        {!isEnabled && <IoMusicalNotesSharp className="music-icon" />}

        {isEnabled &&
          [1, 2, 3, 4].map((i) => (
            <div key={i} className={`indicator-line  active bar-${i - 1}`} />
          ))}
      </div>
    </button>
  );
};

export default MusicToggleBtn;
