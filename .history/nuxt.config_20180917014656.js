module.exports = {
  /*
  ** Build configuration
  */
  build: {},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Global CSS
  */
  // css: ['bootstrap/dist/css/bootstrap.css.map'],
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome'
  ],

  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faSave'/*, 'faFolder-open', 'trash', 'bed', 'receipt', 'dollar', 'line-chart'*/]
      }
    ]
  },
  /*
   ** plugins
   */
  plugins: [{src: '~/plugins/persisteStateInCookies.js', ssr: false}],
  /*
  ** Router 
  */
  router: {
    middleware: 'stats'
  }

}
