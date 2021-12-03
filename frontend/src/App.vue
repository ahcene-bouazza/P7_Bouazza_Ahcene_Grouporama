<template>
  <div class="bg-gray-900" id="app">
    <header-top :is-connected="isConnected" class="header"></header-top>
    <router-view class="router"></router-view>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: true,
              mode: 'repulse'
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.4,
              size: 40
            },
            push: {
              quantity: 2
            },
            repulse: {
              distance: 200,
              duration: 0.8
            }
          }
        },
        particles: {
          color: {
            value: '#ffffff'
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1
          },
          collisions: {
            enable: true
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 1,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value_area: 800
            },
            value: 80
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            random: true,
            value: 5
          }
        },
        detectRetina: true
      }"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    'header-top': Header
  },
  mounted() {
    this.check()
  },
  methods: {
    check() {
      if (this.user.id == 0 && this.$router.currentRoute.path != '/') {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapState(['user']),

    isConnected() {
      return this.user.id > 0
    }
  }
}
</script>

<style>
.header {
  z-index: 1;
}
#tsparticles {
  z-index: -1;
}
</style>
