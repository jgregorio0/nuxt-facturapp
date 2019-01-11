<template>
  <div class="info-modal">
    <b-button class="m-1" sm variant="outline-primary" @click="showModal">
      <fa icon="info"/>
    </b-button>
    <b-modal ref="invoiceModal" title="Ayuda" hide-footer size="lg">
      <div class="d-block text-center">
        <b-tabs>
          <b-tab title="Añadir factura" active>
            <b-img thumbnail fluid src="/img/gif/invoices_new.gif"></b-img>
          </b-tab>
          <b-tab title="Eliminar factura">
            <b-img thumbnail fluid src="/img/gif/guests_rm.gif"></b-img>
          </b-tab>
          <b-tab title="Facturacion">
            <ol>
              <li>
                <span>La fecha 'hasta' de una factura debe coincidir con la fecha 'desde' de la factura siguiente.</span>
              </li>
              <li>
                <span>
                  Es decir, dadas 2 facturas, la primera desde 2018-05-21 hasta
                  <strong>2018-07-20</strong> la siguiente desde
                  <strong>2018-07-20</strong> hasta 2018-09-25.
                </span>
              </li>
              <li>
                <span>El pago de la factura se contabiliza de forma que la fecha de inicio "desde" es incluyente y la de fin "hasta" excluyente.</span>
              </li>
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
  name: 'InvoiceModal',
  mounted () {
    if (this.invoices.length === 0) {
      this.showModal()
    } else {
      this.hideModal()
    }
  },
  computed: {
    invoices () {
      return this.$store.getters.invoices
    }
  },
  methods: {
    showModal () {
      this.$refs.invoiceModal.show()
    },
    hideModal () {
      this.$refs.invoiceModal.hide()
    }
  }
}
</script>
