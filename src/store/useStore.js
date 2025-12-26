// src/store/useStore.import { create } from "zusta

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { audioManager } from "../audio/AudioManager";

const useStore = create(
  persist(
    (set, get) => ({
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
      SELECT LANGUAGE
      ===================== */
      selectLanguage: {
        isOpen: false,
        toggle: () =>
          set((state) => ({
            selectLanguage: {
              ...state.selectLanguage,
              isOpen: !state.selectLanguage.isOpen,
            },
          })),
        open: () =>
          set((state) => ({
            selectLanguage: { ...state.selectLanguage, isOpen: true },
          })),
        close: () =>
          set((state) => ({
            selectLanguage: { ...state.selectLanguage, isOpen: false },
          })),
      },

      /* =====================
     MUSIC ENABLED/MUTE
  ===================== */
      musicEnabled: true, // En el root, no dentro de un objeto

      toggleMusic: () => {
        const state = get();
        const newValue = !state.musicEnabled;
        const currentSection = state.camera.current ?? "home";

        console.log("🎵 Toggling music:", {
          from: state.musicEnabled,
          to: newValue,
          section: currentSection,
        });

        // Actualizar estado
        set({ musicEnabled: newValue });

        // Manejar audio
        if (newValue) {
          console.log("▶️ Playing audio");
          setTimeout(() => audioManager.play(currentSection), 0);
        } else {
          console.log("⏸️ Stopping audio");
          setTimeout(() => audioManager.stop(), 0);
        }
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
        lastSource: null,
        sections: [
          "home",
          "mission",
          "stack",
          "work",
          "collaboration",
          "contact",
        ],
        current: "home",

        views: {
          home: {
            position: { x: 4, y: 2, z: 6 },
            target: { x: 0, y: 1, z: 0 },
            transition: "soft",
            lockScroll: true,
          },
          mission: {
            position: { x: 0, y: 2, z: 20 },
            target: { x: 0, y: 1, z: 20 },
            transition: "arc",
          },
          stack: {
            position: { x: 0, y: 2, z: 40 },
            target: { x: 0, y: 1, z: 40 },
            transition: "orbit",
          },
          work: {
            position: { x: 0, y: 2, z: 60 },
            target: { x: 0, y: 1, z: 60 },
            transition: "push",
          },
          collaboration: {
            position: { x: 0, y: 2, z: 80 },
            target: { x: 0, y: 1, z: 80 },
            transition: "slide",
          },
          contact: {
            position: { x: 0, y: 2, z: 100 },
            target: { x: 0, y: 1, z: 100 },
            transition: "rise",
          },
        },

        target: { x: 0, y: 1, z: 0 },

        goTo: (section, source = "ui") => {
          const state = get();
          const { current, isAnimating, sections } = state.camera;
          const musicEnabled = get().musicEnabled;

          if (isAnimating) return;
          if (!sections.includes(section)) return;
          if (section === current) return;

          console.log(
            "🎬 Navigate to:",
            section,
            "| Music enabled:",
            musicEnabled
          );

          // Cambiar música si está habilitada
          if (musicEnabled) {
            audioManager.play(section);
          }

          set((state) => ({
            camera: {
              ...state.camera,
              current: section,
              lastSource: source,
            },
          }));
        },

        setCurrentSection: (section) =>
          set((state) => ({
            camera: { ...state.camera, current: section },
          })),

        next: () => {
          const { sections, current, goTo } = get().camera;
          const index = sections.indexOf(current);
          if (index < sections.length - 1) {
            goTo(sections[index + 1], "scroll");
          }
        },

        prev: () => {
          const { sections, current, goTo } = get().camera;
          const index = sections.indexOf(current);
          if (index > 0) {
            goTo(sections[index - 1], "scroll");
          }
        },

        getPosition: (section) => get().camera.views[section],
        isAnimating: false,
        setAnimating: (value) =>
          set((state) => ({
            camera: { ...state.camera, isAnimating: value },
          })),
      },
    }),
    {
      name: "app-store",
      // Solo persistir el valor booleano, no las funciones
      partialize: (state) => ({
        musicEnabled: state.musicEnabled,
      }),
    }
  )
);

export default useStore;
