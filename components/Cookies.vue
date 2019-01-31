<template>
  <div :style="this.hideWhenLoading">
    <div class="coockie-container">
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
      >
        <div v-if="showCookiesEnabled" id="cookieConsent">
          <b-jumbotron
            lead="Los datos introducidos solo seran accesibles desde su ordenador. Para que esto sea posible es necesario que nos autorice a utilizar cookies."
          >
            <div>
              <a href="https://cookiesandyou.com/" target="_blank">Informacion sobre cookies aqui...</a>
            </div>
            <!-- <b-button @click="cookieClickedDecline" variant="danger">Rechazar</b-button> -->
            <b-button @click="cookieClickedAccept" variant="success">Autorizar</b-button>
          </b-jumbotron>
        </div>
      </transition>
    </div>
    <div v-show="showCookiesEnabled" class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'Cookies',
  data: function () {
    return { hideWhenLoading: 'display:none' }
  },
  methods: {
    cookieClickedAccept () {
      this.$store.commit('cookiesEnabled', true)
    },
    cookieClickedDecline () {
      this.$store.commit('cookiesEnabled', false)
    }
  },
  computed: {
    status () {
      return this.$store.getters.cookiesEnabled
    },
    showCookiesEnabled () {
      return this.status === null
    }
  },
  mounted () {
    this.hideWhenLoading = ''
  }
}
</script>
<style scoped>
.jumbotron {
  padding: 1rem 2rem;
}

.coockie-container {
  z-index: 9999;
  position: fixed;
}

/*black transparent midle layer */
.overlay {
  /* full screen */
  width: 100vw;
  height: 100vh;
  /* transparent black */
  background: rgba(99, 99, 99, 0.8);
  /*position fixed top left corner*/
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 9998;
}
</style>
