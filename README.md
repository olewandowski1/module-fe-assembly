## Introduction

The `module-fe-assembly` is an experimental environment created to demonstrate a modular app architecture. This module acts as the entry point for the entire application, linking and managing other modules as NPM packages. This `assembly` module has to be linked with `[module-fe-core](https://github.com/olewandowski1/module-fe-core)`.

### Purpose

The primary purpose of the `assembly` module is to:

- Enable modular development with linked reusable packages.
- Provide a standardized, pre-configured development environment.
- Serve as the central entry point for initializing and integrating all modules.
- Create a high-performance environment with features like Hot Module Replacement (HMR).

## Tech Stack

The `assembly` module leverages modern technologies to create a robust and efficient development environment:

- Foundation: **React 19 with TypeScript**
- Build Tool: **Vite 6**
- Styling: **Tailwind CSS**
- UI Library: **shadcn/ui**
- State Management: **Zustand**

## Getting Started

### Cloning the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/olewandowski1/module-fe-assembly.git
   cd module-fe-assembly
   ```

### Installing Dependencies

2. Install the required dependencies:
   ```bash
   pnpm install
   ```

### Linking Modules for Development

3. If you are developing with other modules (e.g., `core`), link them for local development. First, create a link from the package you want to attach to `assembly`. Then, inside the `assembly` module, link it.

   ```bash
   cd ../module-fe-core
   pnpm link --global

   cd ../module-fe-assembly
   pnpm link --global @module/fe-core
   ```

### Running the Development Server

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Tech Doc

- **useModulesManager**: The `useModulesManager` hook is a custom hook that manages the loading and caching of modules, references, and routes in the application. It leverages Zustand for state management and provides methods to load modules, load references, get a specific reference, and load routes. The hook is defined in `src/hooks/use-modules-manager.ts`.

  - **Methods**:

    - `loadModules`: Asynchronously loads and caches all modules.
    - `loadRefs`: Loads and caches all references from the modules.
    - `getRef(name: string)`: Retrieves a specific reference by its name.
    - `loadRoutes`: Loads and caches all routes from the modules.

  - **Usage**: After initialization, the `ModulesManager` is passed to the `App` component. This is provided by `module-fe-core` package.

- **useInitializeApp**: The `useInitializeApp` hook initializes the application by loading modules, references, routes, and translations. It uses two managers: `modulesManager` and `localesManager`. The hook is defined in `src/hooks/use-initialize-app.ts`.

  - **Methods**:

    - `loadModules`: Loads and caches all modules.
    - `loadRefs`: Loads and caches all references from the modules.
    - `loadRoutes`: Loads and caches all routes from the modules.
    - `loadTranslations`: Loads translations for the modules.
    - `addDynamicTranslations`: Adds dynamic translations to the application.

- **useLocalesManager**: The `useLocalesManager` hook is a custom hook that manages the loading and caching of translations in the application. It leverages Zustand for state management and provides methods to load translations and format messages. The hook is defined in `src/hooks/use-locales-manager.ts`.

  - **Methods**:

    - `loadTranslations(modules: ModulesManagerType['modules'])`: Loads and caches all translations from the modules.
    - `formatMessage(namespace: string, key: string)`: Formats a message based on the provided namespace and key.
