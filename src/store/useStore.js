import { create } from "zustand";
const useStore = create((set) => ({
  currentView: "home", // "projects", "about", "contact"
  setCurrentView: (view) => set({ currentView: view }),

  cameraPositions: {
    home: { x: 4, y: 2, z: 6 },
    projects: { x: 0, y: 0, z: 5 },
    about: { x: -10, y: 5, z: 0 },
    contact: { x: 0, y: 8, z: 3 },
  },
}));

export default useStore;
