import { ImSwitch } from "react-icons/im";

const ToggleButton = ({ onClick }) => {
  return (
    <div className="menu-toggle-btn" onClick={onClick}>
      <ImSwitch className="switch-on" />
    </div>
  );
};

export default ToggleButton;
