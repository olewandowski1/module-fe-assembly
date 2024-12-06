// Import global styles
import '@node_modules/@module/fe-core/src/styles/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppContainer } from '@/components/app-container';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer />
  </StrictMode>
);
