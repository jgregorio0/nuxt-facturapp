<template>
  <li class="nav-item">

    <!--BUTTONS GROUP-->
    <b-button-group vertical class="w-100">
      <b-btn @click="cookieRemovedCookie" variant="outline-secondary">
        <fa icon="cog" class="float-left mr-3 mt-1"/>
        <span class="float-left">Cookies</span>
      </b-btn>
      <b-btn v-b-modal.import variant="outline-secondary">
        <fa icon="folder-open" class="float-left mr-3 mt-1"/>
        <span class="float-left">Abrir</span>
      </b-btn>
      <b-btn @click="exportData" variant="outline-secondary">
        <fa icon="save" class="float-left mr-3 mt-1"/>
        <span class="float-left">Guardar</span>
      </b-btn>
      <b-btn @click="reset" variant="outline-danger">
        <fa icon="trash" class="float-left mr-3 mt-1"/>
        <span class="float-left">Borrar</span>
      </b-btn>
    </b-button-group>

    <!-- IMPORT MODAL -->
    <ImportModal></ImportModal>
  </li>
</template>

<script>
import ImportModal from "~/components/navigation/ImportModal.vue";

import { download } from "~/assets/js/utils/fileUtil";

export default {
  components: {
    ImportModal
  },
  computed: {
    invoices() {
      return this.$store.getters.invoices;
    },
    guests() {
      return this.$store.getters.guests;
    }
  },
  methods: {
    exportData() {
      download("data.json", {
        invoices: this.invoices,
        guests: this.guests
      });
    },
    reset() {
      this.$store.commit("setGuests", []);
      this.$store.commit("setInvoices", []);
    },
    cookieRemovedCookie () {
      this.$store.commit('cookiesEnabled', null)
      this.$store.commit('setShowNavSideBar', false)
    }
  }
};
</script>
