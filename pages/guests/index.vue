<template>
  <div class="guests mb-5">
    <GuestModal></GuestModal>
    <GuestForm></GuestForm>
    <GuestTable></GuestTable>
  </div>
</template>

<script>
  import GuestModal from '~/components/guests/GuestModal.vue'
  import GuestForm from '~/components/guests/GuestForm.vue'
  import GuestTable from '~/components/guests/GuestTable.vue'

  export default {
    name: 'guests',
    components: {
      GuestModal ,
      GuestForm,
      GuestTable
    }
  }
</script>

<style>
</style>
