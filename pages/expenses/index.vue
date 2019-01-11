<template>
  <div class="expenses mb-5">
    <ExpensesTable></ExpensesTable>
    <ExpensesModal></ExpensesModal>
  </div>
</template>

<script>
  import ExpensesTable from '~/components/expenses/ExpensesTable.vue'
  import ExpensesModal from '~/components/expenses/ExpensesModal.vue'

  export default {
    name: 'guests',
    components: {
      ExpensesTable,
      ExpensesModal
    }
  }
</script>

<style>
</style>
