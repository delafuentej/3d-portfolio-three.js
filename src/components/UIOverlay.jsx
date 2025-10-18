import { Html } from "@react-three/drei";
import { useStore } from "../store";

export default function UIOverlay() {
  const currentView = useStore((state) => state.currentView);
  const setCurrentView = useStore((state) => state.setCurrentView);
  const isExpanded = useStore((state) => state.isExpanded);
  const setIsExpanded = useStore((state) => state.setIsExpanded);

  return (
    <Html fullscreen>
      {/* Botones de navegación entre vistas */}
      <div className="absolute  top-0 left-1/2 -translate-x-1/2 flex gap-4 bg-white/10 px-6 py-3 rounded-2xl shadow-md">
        {["home", "projects", "about", "contact"].map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`px-3 py-1 rounded-lg transition ${
              currentView === view
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Botón entrar/salir proyectos */}
      {currentView === "projects" && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              Ver proyectos
            </button>
          ) : (
            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 bg-white text-black rounded-xl shadow-md hover:bg-gray-200 transition"
            >
              Salir
            </button>
          )}
        </div>
      )}
    </Html>
  );
}
