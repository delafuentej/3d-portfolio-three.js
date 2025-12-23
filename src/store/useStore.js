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
    // 🔹 Orden de las secciones
    sections: ["home", "mision", "stack", "work", "collaboration", "contact"],
    current: "home",

    // 🔹 Posiciones de cámara para cada sección
    views: {
      home: {
        position: { x: 4, y: 2, z: 6 },
        target: { x: 0, y: 1, z: 0 },
        transition: "soft", // introducción elegante
        lockScroll: true,
      },

      mision: {
        position: { x: 0, y: 2, z: 20 },
        target: { x: 0, y: 1, z: 20 },
        transition: "arc", // viaje narrativo
      },

      stack: {
        position: { x: 0, y: 2, z: 40 },
        target: { x: 0, y: 1, z: 40 },
        transition: "orbit", // mostrar tecnología
      },

      work: {
        position: { x: 0, y: 2, z: 60 },
        target: { x: 0, y: 1, z: 60 },
        transition: "push", // foco en proyectos
      },

      collaboration: {
        position: { x: 0, y: 2, z: 80 },
        target: { x: 0, y: 1, z: 80 },
        transition: "slide", // transición lateral humana
      },

      contact: {
        position: { x: 0, y: 2, z: 100 },
        target: { x: 0, y: 1, z: 100 },
        transition: "rise", // cierre / call to action
      },
    },

    target: { x: 0, y: 1, z: 0 },

    // 🔹 Cambiar sección
    setCurrentSection: (section) =>
      set((state) => ({
        camera: { ...state.camera, current: section },
      })),

    // 🔹 Avanzar a la siguiente sección
    next: () => {
      const { sections, current } = get().camera;
      const currentIndex = sections.indexOf(current);
      const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
      set((state) => ({
        camera: { ...state.camera, current: sections[nextIndex] },
      }));
    },

    // 🔹 Volver a la sección anterior
    prev: () => {
      const { sections, current } = get().camera;
      const currentIndex = sections.indexOf(current);
      const prevIndex = Math.max(currentIndex - 1, 0);
      set((state) => ({
        camera: { ...state.camera, current: sections[prevIndex] },
      }));
    },

    // 🔹 Obtener posición actual de la cámara
    getPosition: (section) => get().camera.positions[section],
    isAnimating: false, // nuevo estado
    setAnimating: (value) =>
      set((state) => ({
        camera: { ...state.camera, isAnimating: value },
      })),
  },
}));

export default useStore;
