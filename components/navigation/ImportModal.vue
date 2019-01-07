<template>
  <!-- IMPORT MODAL -->
  <b-modal id="import">
    <b-list-group v-if="isErrors" class="mb-2">
      <b-list-group-item variant="danger" class="mb-1"
                         v-for="error in errors" :key="error">{{ error }}
      </b-list-group-item>
    </b-list-group>

    <b-list-group v-if="isSuccesses" class="mb-2">
      <b-list-group-item variant="success" class="mb-1"
                         v-for="success in successes" :key="success">{{ success }}
      </b-list-group-item>
    </b-list-group>

    <b-list-group v-if="isInfos" class="mb-2">
      <b-list-group-item variant="info" class="mb-1"
                         v-for="info in infos" :key="info">{{ info }}
      </b-list-group-item>
    </b-list-group>

    <b-form-file id="import-file"
                 :state="importFileState"
                 placeholder="Selecciona un fichero..."
                 accept="application/json"
                 @input="importFile"></b-form-file>
  </b-modal>
</template>

<script>
  import {readFile} from '~/assets/js/utils/fileUtil'

  export default {
    data () {
      return {
        errors: [],
        infos: ['Seleccione el fichero .json con las facturas y los inquilinos'],
        successes: [],
        importFileState: 'invalid'
      }
    },
    computed: {
      isErrors () {
        return this.errors.length !== 0
      },
      isInfos () {
        return this.infos.length !== 0
      },
      isSuccesses () {
        return this.successes.length !== 0
      }
    },
    methods: {
      importFile (file) {
        this.resetImport()

        try {
          if (this.validateFile(file)) {
            this.importFileState = 'valid'
            readFile(file, 'utf-8', this.importData)
          }
        } catch (e) {
          console.error(e)
          this.errors.push('No se han podido importar los datos')
        }
      },
      validateFile (file) {
        if (!file.name.endsWith('.json')) {
          this.errors.push('Debe ser un fichero de tipo .json')
          throw new Error('File invalid')
        }

        return true
      },
      resetImport () {
        this.errors = []
        this.infos = ['Seleccione el fichero .json con las facturas y los inquilinos']
        this.successes = []
        this.importFileState = 'invalid'
      },
      importData (data) {
        let json = JSON.parse(data)
        this.$store.commit('setGuests', json.guests)
        this.$store.commit('setInvoices', json.invoices)
        // console.log('Las facturas y los inquilinos se han importado correctamente')
        this.successes = ['Las facturas y los inquilinos se han importado correctamente']
      }
    }
  }
</script>
