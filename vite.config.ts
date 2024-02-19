import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { SvelteKitPWA } from "@vite-pwa/sveltekit";

const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line

const prerenderedPages = [
  "/settings",
  "/explore",
  "/",
  "/notifications",
  "/settings",
  "/error",
  "/mint",
  "/monetize",
  "/about",
  "/feed",
];

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      mode: "development",
      scope: "/",
      base: "/",
      registerType: "autoUpdate",
      strategies: "generateSW",
      includeAssets: ["favicon.png", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "PWA Reproduction",
        short_name: "PWA",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        start_url: "/?fullscreen=true",
        display: "fullscreen",
        scope: "/",
        background_color: "#12131A",
        theme_color: "#FFFFFF",
      },
      workbox: {
        // prettier-ignore
        navigateFallbackDenylist: [new RegExp("/^\/[^\/]+\/?$|^\/[^\/]+\/posts\/[^\/]+\/?$|^\/profile\/[^\/]+\/?$|^\/posts\/[^\/]+\/?$|^\/topics\/[^\/]+\/?$/")] /* eslint-disable-line */,
        globPatterns: ["client/**/*.{js,css,png}"],
        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) =>
              // prettier-ignore
              sameOrigin && !prerenderedPages.includes(url.pathname.toLowerCase()) && url.pathname.match("/^\/[^\/]+\/?$|^\/[^\/]+\/posts\/[^\/]+\/?$|^\/profile\/[^\/]+\/?$|^\/posts\/[^\/]+\/?$|^\/topics\/[^\/]+\/?$/") /* eslint-disable-line */,
            handler: "NetworkFirst",
            options: {
              cacheName: "ssr-pages-cache",
              /* cache only 200 responses */
              cacheableResponse: {
                statuses: [200],
              },
              /* check the options in the workbox-build docs*/
              matchOptions: {
                ignoreVary: true,
                ignoreSearch: true,
              },
              plugins: [
                {
                  /* this callback will be called when the fetch call fails */
                  handlerDidError: async () =>
                    Response.redirect("/error?offline", 302),
                  /* this callback will prevent caching the response */
                  cacheWillUpdate: async ({ response }) =>
                    response.status === 200 ? response : null,
                },
              ],
            },
          },
        ],
      },
      injectRegister: "auto",
      manifestFilename: "site.webmanifest",
      devOptions: {
        enabled: process.env.NODE_ENV === "development",
        type: "module",
        navigateFallback: "/",
      },
    }),
  ],
  resolve: {
    alias: {
      $stores: resolve(__dirname, "./src/stores"),
      $components: resolve(__dirname, "./src/lib/shared/components"),
      $ui: resolve(__dirname, "./src/lib/shared/ui"),
      $layouts: resolve(__dirname, "./src/lib/layouts"),
      $shared: resolve(__dirname, "./src/lib/shared"),
      $models: resolve(__dirname, "./src/lib/models"),
      $data: resolve(__dirname, "./src/lib/data"),
      $core: resolve(__dirname, "./src/lib/core"),
      $utils: resolve(__dirname, "./src/lib/utils"),
      $environment: resolve(__dirname, "./src/environments"),
      $src: resolve(__dirname, "./src"),
    },
  },
  build: {
    ssr: true,
    rollupOptions: {
      output: {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        // to improve the speed of page loading, we can manually split chunks
        manualChunks: undefined,
      },
    },
    cssMinify: true,
  },
  define: {
    "globalThis.process.env.NODE_ENV": `'${process.env.NODE_ENV}'`,
    "process.env.NODE_ENV":
      process.env.NODE_ENV === "production" ? '"production"' : '"development"',
  },
  envPrefix: ["VITE_", "SVELTEKIT_STARTER_"],
  ssr: {
    external: [
      "@milkdown/*",
      "debug",
      "fs",
      "@toast-ui/*",
      "lodash",
      "isomorphic-fetch",
      "node-fetch",
      "markdown-to-text",
    ],
  },
});
