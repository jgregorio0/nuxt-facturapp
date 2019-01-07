<template>
  <div class="table">

    <!--TABLE-->
    <b-table striped hover small
             :items="guests" :fields="fields"
             sort-by="to" :sort-desc="true">
      <template slot="actions" slot-scope="data">
        <b-button variant="danger" @click="rmGuest(data.item.index)">
          Eliminar
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fields: [
          {
            key: 'name',
            label: 'Nombre',
            sortable: true
          },
          {
            key: 'from',
            label: 'Desde',
            sortable: true
          },
          {
            key: 'to',
            label: 'Hasta',
            sortable: true
          },
          {
            key: 'actions',
            label: 'Acciones'
          }]
      }
    },
    computed: {
      guests () {
        return this.$store.getters.guests
      }
    },
    methods: {
      rmGuest (index) {
        this.$store.commit('rmGuest', {index: index})
      }
    }
  }
</script>

<style>
</style>
