// src/store/useStore.import { create } from "zustand";
import { create } from "zustand";

const useStore = create((set, get) => ({
  app: {
    ready: false,
    setReady: (ready) =>
      set((state) => ({
        app: { ...state.app, ready },
      })),
  },

  loading: {
    visible: true,
    finished: false,
    showExitAnimation: false,

    startExit: () =>
      set((state) => ({
        loading: {
          ...state.loading,
          showExitAnimation: true,
        },
      })),

    finish: () =>
      set((state) => ({
        loading: {
          ...state.loading,
          visible: false,
          finished: true, // Marca la carga como terminada
        },
      })),

    hide: () =>
      set((state) => ({
        loading: {
          ...state.loading,
          visible: false,
        },
      })),
  },

  view: {
    current: "home",
    setCurrent: (view) =>
      set((state) => ({
        view: { ...state.view, current: view },
      })),
  },
  /* MENU SLICE */
  menu: {
    isOpen: false,

    toggle: () => {
      const isOpen = get().menu.isOpen;

      // audio
      new Audio(
        isOpen ? "/audio/menu-close.mp3" : "/audio/menu-open.mp3"
      ).play();

      set((state) => ({
        menu: {
          ...state.menu,
          isOpen: !isOpen,
        },
      }));
    },

    open: () =>
      set((state) => ({
        menu: { ...state.menu, isOpen: true },
      })),

    close: () =>
      set((state) => ({
        menu: { ...state.menu, isOpen: false },
      })),
  },
  camera: {
    positions: {
      home: { x: 4, y: 2, z: 6 },
      projects: { x: 0, y: 0, z: 5 },
      about: { x: -10, y: 5, z: 0 },
      contact: { x: 0, y: 8, z: 3 },
    },
  },
}));

export default useStore;
