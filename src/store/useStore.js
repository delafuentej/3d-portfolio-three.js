import { create } from "zustand";

export const useStore = create((set) => ({
  currentView: "home", // "projects", "about", "contact"
  setCurrentView: (view) => set({ currentView: view }),

  cameraPositions: {
    home: { x: 0, y: 5, z: 10 },
    projects: { x: 10, y: 5, z: 0 },
    about: { x: -10, y: 5, z: 0 },
    contact: { x: 0, y: 15, z: 0 },
  },

  isExpanded: false,
  setIsExpanded: (value) => set({ isExpanded: value }),
}));
