import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite port
  },
  build: {
    outDir: 'dist', // Coolify will serve files from this folder
  },
});