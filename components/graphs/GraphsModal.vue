<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary"
              @click="showModal">
      <fa icon="info"/>
    </b-button>
    <b-modal ref="graphsModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <b-tabs>
          <b-tab title="Ejes de coordenadas" active>
            <ol>
              <li>X: Secuencia de dias donde da comienzo o termina una factura</li>
              <li>Y: Gasto diario</li>
            </ol>
          </b-tab>
        </b-tabs>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-btn>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'GraphsModal',
    mounted () {
      if (this.guests.length === 0 || this.invoices.length === 0) {
        this.showModal()
      } else {
        this.hideModal()
      }
    },
    computed: {
      guests () {
        return this.$store.getters.guests
      },
      invoices () {
        return this.$store.getters.invoices
      }
    },
    methods: {
      showModal () {
        this.$refs.graphsModal.show()
      },
      hideModal () {
        this.$refs.graphsModal.hide()
      }
    }
  }
</script>
