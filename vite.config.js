 import { defineConfig } from 'vite';
 import react from '@vitejs/plugin-react';

 export default defineConfig({
   plugins: [react()],
   base: './', // Ensure paths are relative
   build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'bundle.js',
      },
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ['http://192.168.8.135', 'http://localhost']
  },
  preview: {
    open: true,
    port: 5000, // Change if needed
  }
});






// export default defineConfig({
//   plugins: [React()],
//   base: './', // Ensures assets are loaded correctly
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       output: {
//         format: 'iife',
//         entryFileNames: 'bundle.js',
//       },
//     },
//   },
// });