// src/store/useStore.import { create } from "zustand";
import { create } from "zustand";

const useStore = create((set, get) => ({
  /* =====================
     APP
  ===================== */
  app: {
    ready: false,
    setReady: (ready) =>
      set((state) => ({
        app: { ...state.app, ready },
      })),
  },

  /* =====================
     LOADING
  ===================== */
  loading: {
    visible: true,
    finished: false,
    showExitAnimation: false,

    startExit: () =>
      set((state) => ({
        loading: { ...state.loading, showExitAnimation: true },
      })),

    finish: () =>
      set((state) => ({
        loading: {
          ...state.loading,
          visible: false,
          finished: true,
        },
      })),

    hide: () =>
      set((state) => ({
        loading: { ...state.loading, visible: false },
      })),
  },

  /* =====================
     VIEW
  ===================== */
  view: {
    current: "home",
    setCurrent: (view) =>
      set((state) => ({
        view: { ...state.view, current: view },
      })),
  },

  /* =====================
     MENU
  ===================== */
  menu: {
    isOpen: false,
    toggle: () =>
      set((state) => ({
        menu: {
          ...state.menu,
          isOpen: !state.menu.isOpen,
        },
      })),

    open: () =>
      set((state) => ({
        menu: { ...state.menu, isOpen: true },
      })),

    close: () =>
      set((state) => ({
        menu: { ...state.menu, isOpen: false },
      })),
  },

  /* =====================
     CAMERA
  ===================== */
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
