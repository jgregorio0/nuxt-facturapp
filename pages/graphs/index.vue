<template>
  <div class="graphs mb-5">
    <GraphsModal></GraphsModal>
    <GraphTotalCostPerDay></GraphTotalCostPerDay>
  </div>
</template>

<script>
  import GraphTotalCostPerDay from '~/components/graphs/GraphTotalCostPerDay.vue'
  import GraphsModal from '~/components/graphs/GraphsModal.vue'

  export default {
    name: 'graphs',
    components: {
      GraphTotalCostPerDay,
      GraphsModal
    }
  }
</script>

<style>
</style>
