<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary" @click="showModal">
      <fa icon="info"/>
    </b-button>
    <b-modal ref="expensesModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <b-tabs>
          <b-tab title="Ver detalle de un inquilino" active>
            <b-img thumbnail fluid src="/img/gif/expenses_collapse.gif"></b-img>
          </b-tab>
          <b-tab title="Descargar resumen de gastos">
            <b-img thumbnail fluid src="/img/gif/expenses_download_pdf.gif"></b-img>
          </b-tab>
          <b-tab title="Coste de las facturas por huesped">
            <ol class="modal-list">
              <li>
                <span>Cada huesped paga las facturas que entren entre su periodo de estancia, deesde el primer y hasta el ultimo dia de estancia ambos inlcusive.</span>
              </li>
              <li>El importe de la factura se divide por el periodo de facturacion con lo que se obtiene el importe/dia</li>
              <li>El coste para cada huesped se calcula
                <ol>
                  <li>multiplicando el importe/dia X numero de dias de estancia</li>
                  <li>dividiento entre el total de huespedes entre los que dividir la factura</li>
                </ol>
              </li>
              <li>En caso de que un huesped se marche en mitad del periodo de facturacion de una factura solo pagara los dias correspondientes a su estancia</li>
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
  name: 'ExpensesModal',
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
      this.$refs.expensesModal.show()
    },
    hideModal () {
      this.$refs.expensesModal.hide()
    }
  }
}
</script>

<style scoped>
ol.modal-list {
  text-align: left;
}
ol.modal-list ol {
  list-style-type: upper-alpha;
}
</style>
