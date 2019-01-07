<template>
  <div>
    <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight">
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
</template>

<script>
export default {
  name: 'Cookies',
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
  }
}
</script>
<style scoped>
.jumbotron {
  padding: 1rem 2rem;
}
</style>
