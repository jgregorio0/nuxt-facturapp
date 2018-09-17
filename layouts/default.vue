<template>
  <div>
    <header>
      <NavBar></NavBar>
    </header>

    <section>
      <!--<app-nav-wizard v-show="this.$route.name != 'home'"></app-nav-wizard>-->
      NAV_WIZARD
      <transition
        appear
        appear-active-class="animated zoomIn"
        mode="out-in"
        :name="direction">
        <nuxt/>
      </transition>
      <!--<app-nav-wizard v-show="this.$route.name != 'home'"></app-nav-wizard>-->
      NAV_WIZARD
    </section>

    <!--<footer></footer>-->
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'
  // import NavWizard from '@/components/NavWizard.vue'

  export default {
    components: {
      NavBar,
      // 'app-nav-wizard': NavWizard
    },
    computed: {
      direction () {
        return this.$store.getters.direction
      }
    }
  }
</script>

<style scoped>
  .left-enter {
  }

  .left-enter-active {
    animation: fadeInLeft 0.4s ease-out forwards;
  }

  .left-leave {
  }

  .left-leave-active {
    animation: fadeOutRight 0.2s ease-out forwards;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutRight {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }

  .right-enter {
  }

  .right-enter-active {
    animation: fadeInRight 0.4s ease-out forwards;
  }

  .right-leave {
  }

  .right-leave-active {
    animation: fadeOutLeft 0.2s ease-out forwards;
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOutLeft {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
