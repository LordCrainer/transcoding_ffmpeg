import Vue from 'vue'

Vue.mixin({
  methods: {
    imagenURL(...route) {
      const path = route.join('/')
      try {
        if (route.length > 0) return require(`@/assets/${path}`)
      } catch (error) {
        console.log('ERROR_IMAGEN_UNDEFINED:', 'Path:', 'plugins/imagenURL.js', 'Message:', error.message)
      }
      return ''
    }
  }
})
