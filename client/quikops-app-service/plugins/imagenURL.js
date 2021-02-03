import Vue from 'vue'

Vue.mixin({
  methods: {
    imagenURL (...route) {
      const path = route.join('/')
      console.log(path);
      console.log(require(`@/assets/${path}`))
      try {
        if (route.length > 0) { return require(`@/assets/${path}`) }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('ERROR_IMAGEN_UNDEFINED:', 'Path:', 'plugins/imagenURL.js', 'Message:', error.message)
      }
      return ''
    }
  }
})
