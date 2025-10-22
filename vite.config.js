import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 ECCO LA CONFIGURAZIONE COMPLETA
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js' // ← se il file setupTests è lì
  }
});
