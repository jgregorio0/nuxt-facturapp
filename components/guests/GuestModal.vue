<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary"
              @click="showModal">
      <fa icon="info"/>
    </b-button>
    <b-modal ref="guestModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <b-tabs>
          <b-tab title="Añadir inquilino" active>
            <small>Desde el primer dia de estancia hasta el ultimo dia de estancia</small>
            <b-img thumbnail fluid src="/img/gif/guests_new.gif"></b-img>
          </b-tab>
          <b-tab title="Eliminar inquilino" >
            <b-img thumbnail fluid src="/img/gif/guests_rm.gif"></b-img>
          </b-tab>
        </b-tabs>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-btn>
    </b-modal>
  </div>
</template>

<script>
  import GuestModalCarousel from "~/components/guests/GuestModalCarousel"

  export default {
    components: {
      GuestModalCarousel
    },
    mounted () {
      if (this.guests.length === 0) {
        this.showModal()
      } else {
        this.hideModal()
      }
    },
    computed: {
      guests () {
        return this.$store.getters.guests
      }
    },
    methods: {
      showModal () {
        this.$refs.guestModal.show()
      },
      hideModal () {
        this.$refs.guestModal.hide()
      }
    }
  }
</script>
