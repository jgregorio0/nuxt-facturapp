<template>
  <li class="nav-item">

    <!--BUTTONS GROUP-->
    <b-button-group vertical class="w-100">
      <b-btn v-b-modal.import variant="outline-secondary">
        <!--<Icon name="folder-open" class="float-left mr-3 mt-1"></Icon>-->
            <fa icon="folder-open" />

        <span class="float-left">Abrir</span>
      </b-btn>
      <b-btn @click="exportData" variant="outline-secondary">
        <!--<Icon name="save" class="float-left mr-3 mt-1"></Icon>-->
            <fa icon="save" />

        <span class="float-left">Guardar</span>
      </b-btn>
      <b-btn @click="reset" variant="outline-danger">
        <!--<Icon name="trash" class="float-left mr-3 mt-1"></Icon>-->
            <fa icon="trash" />
I
        <span class="float-left">Borrar</span>
      </b-btn>
    </b-button-group>

    <!-- IMPORT MODAL -->
    <ImportModal></ImportModal>
  </li>
</template>

<script>
import ImportModal from "@/components/ImportModal.vue";
// import Icon from 'vue-awesome/components/Icon'

// import 'vue-awesome/icons/save'
// import 'vue-awesome/icons/folder-open'
// import 'vue-awesome/icons/trash'

import { download } from "~/assets/js/utils/fileUtil";

export default {
  components: {
    ImportModal //,
    //   Icon
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
    }
  }
};
</script>
