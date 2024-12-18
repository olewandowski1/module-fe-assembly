import { Module, ModulesManagerType, Ref, Route } from '@module/fe-core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create a store to manage modules and its refs
export const useModulesManager = create<ModulesManagerType>()(
  persist(
    (set, get) => ({
      modules: [],
      refs: [],
      routes: [],

      // Load and cache all modules
      loadModules: () => {
        const modulesImports = import.meta.glob(
          '/node_modules/@module/*/dist/index.es.js',
          { eager: true, import: 'default' }
        );

        const modules = Object.entries(modulesImports)
          .map(([path, module]) => {
            const match = path.match(/node_modules\/(.*)\/dist/);
            const moduleName = match?.[1];

            if (!moduleName || !module) {
              console.error(
                `[USE_MODULES]: Skipping module - ${
                  moduleName || path
                }. Ensure the module is named correctly and has a valid entry point.`
              );
              return null;
            }

            return { name: moduleName, entry: module };
          })
          .filter(Boolean) as Module[];

        set({ modules });
      },

      // Load and cache all refs from modules
      loadRefs: () => {
        const { modules } = get();
        const refs: Ref[] = modules
          .map((module) => module.entry['refs'])
          .filter(Boolean)
          .flat();

        set({ refs });
      },

      getRef: (name: string) => {
        const { refs } = get();
        return refs.find((ref) => ref.key === name);
      },

      loadRoutes: () => {
        const { modules } = get();
        const routes: Route[] = modules
          .map((module) => module.entry['routes'])
          .filter(Boolean)
          .flat();

        set({ routes });
      },
    }),
    {
      name: 'modules-manager',
    }
  )
);
