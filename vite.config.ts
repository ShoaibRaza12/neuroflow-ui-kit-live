import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable fast refresh
      fastRefresh: true,
      // Include .jsx and .tsx files
      include: "**/*.{jsx,tsx}",
    })
  ],
  
  // Path resolution
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/styles": path.resolve(__dirname, "./styles"),
      "@/lib": path.resolve(__dirname, "./lib"),
      "@/utils": path.resolve(__dirname, "./utils"),
    },
  },
  
  // Development server configuration
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true, // Open browser on start
    cors: true,
    hmr: {
      overlay: true, // Show HMR overlay for errors
    },
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
    cors: true,
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
    
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'radix-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip'
          ],
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion'],
          // Component chunks
          'dashboard-components': [
            './components/SmartOverviewPage',
            './components/WorkflowBuilderPage',
            './components/TaskStreamPage',
            './components/TeamAnalyticsPage',
            './components/SettingsBillingPage'
          ],
          'ui-components': [
            './components/ui/card',
            './components/ui/button',
            './components/ui/badge',
            './components/ui/progress',
            './components/ui/input'
          ]
        },
        // Generate descriptive chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') : 'unknown';
          return `chunks/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          let extType = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff2?|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            extType = 'styles';
          }
          
          return `${extType}/[name]-[hash][extname]`;
        }
      }
    },
    
    // Bundle size warnings
    chunkSizeWarningLimit: 1000,
  },
  
  // CSS configuration
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
    devSourcemap: true,
  },
  
  // Optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'recharts',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip'
    ],
    exclude: [],
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  
  // Base public path for deployment
  base: './',
  
  // Enable/disable specific features for production
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})