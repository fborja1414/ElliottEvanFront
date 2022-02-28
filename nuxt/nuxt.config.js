export default {
  /*
   ** .env
   */
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
    kirbyUrl: process.env.KIRBY_URL,
    devState: process.env.DEV_STATE,
    maintenance: process.env.MAINTENANCE,
    showLanding: process.env.SHOW_LANDING === 'false' ? false : true
  },
  vue: {
    config: {
      devtools: process.env.DEV_STATE === 'development' ? true : false
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "ELLIOTT EVAN",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://use.typekit.net/urf7fnr.css" }, // garamond
      { rel: "stylesheet", href: "https://use.typekit.net/hvb3jfi.css" }, // neue haas grotesk

      { rel: "preconnect", href: "https://app.snipcart.com" },
      { rel: "preconnect", href: "https://cdn.snipcart.com" },
      { rel: "stylesheet", href: "https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" },
      // snipcart v2
      // { rel: "stylesheet", href: "https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css", type: "text/css" },
      // { rel: "stylesheet", href: "/snipcart.min.css", type: "text/css" },
    ],
    script: [
      { async: true, src: "https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [ 
    '~/plugins/LoadImage.js',
    '~/plugins/Slugify.js',
    { src: '~/plugins/VueFlickity.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
