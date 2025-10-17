import { useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  return (
    <div className={`loading-screen ${active ? "" : "loading-screen--hidden"}`}>
      <div className="loading-screen__container">
        <h1 className="loading-screen__title">
          3D-Portfolio: Three.js || Jesús de la Fuente
        </h1>
        <div className="progress__container">
          <div
            className="progress__bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>Loading... ({parseInt(progress)}%)</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
