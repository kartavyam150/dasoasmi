import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import history from 'connect-history-api-fallback'
import type { Connect } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    // 👇 Custom plugin for React Router SPA fallback
    {
      name: 'spa-fallback',
      configureServer(server) {
        // `connect-history-api-fallback` returns a middleware function
        const fallback = history({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        })

        // 👇 Force type cast to match Vite's middleware signature
        server.middlewares.use(fallback as unknown as Connect.NextHandleFunction)
      },
    },
  ],
  // base: "./", // <-- Add this if your app isn't served from root
  server: {
    proxy: {
      '/api': {
        target: 'https://docs.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // // 👇 this part makes React Router work locally
  //   setupMiddlewares(middlewares, { app }) {
  //     app.use(
  //       history({
  //         index: '/index.html',
  //       })
  //     )
  //     return middlewares
  //   },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

})
