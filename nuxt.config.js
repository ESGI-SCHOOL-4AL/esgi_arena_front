export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/styles/main.scss"],
  styleResources: {
    scss: ["~styles/vars/*.scss"]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/b-components"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/style-resources",
    "nuxtjs-mdi-font"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    "@nuxtjs/bulma",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // TODO handle multiple envs
    baseURL: "http://localhost:8080",
    headers: {
      post: {
        "Content-Type": "application/json"
      },
      put: {
        "Content-Type": "application/json"
      },
      patch: {
        "Content-Type": "application/json"
      }
    }
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/api/options
   */
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/games",
      home: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: "/login", method: "post", propertyName: "token" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user/", method: "get", propertyName: false }
        },
        tokenRequired: true,
        tokenType: "Bearer",
        globalToken: true,
        autoFetchUser: true
      }
    },
    resetOnError: true,
    watchLoggedIn: true
  },
  router: {
    middleware: ["auth"]
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
