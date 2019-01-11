<template>
  <div class="invoices mb-5">
    <InvoiceModal></InvoiceModal>
    <InvoiceForm></InvoiceForm>
    <InvoiceTable></InvoiceTable>
  </div>
</template>

<script>
  import InvoiceModal from '~/components/invoices/InvoiceModal.vue'
  import InvoiceForm from '~/components/invoices/InvoiceForm.vue'
  import InvoiceTable from '~/components/invoices/InvoiceTable.vue'

  export default {
    name: 'Invoices',
    components: {
      InvoiceModal,
      InvoiceForm,
      InvoiceTable
    }
  }
</script>

<style>
</style>
