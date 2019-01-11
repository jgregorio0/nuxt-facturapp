<template>
    <div class="form" role="tablist">

      <!--ACCORDION HEADER-->
      <b-card-header class="accordion-header" header-tag="header" role="tab">
        <b-btn class="accordion-header-btn" block href="#" v-b-toggle.addInvoiceAccordion variant="default">
          <span>{{ accordionActive ? 'Ocultar' : 'Añadir facturas'}}</span>
          <span class="float-right">
            <fa icon="chevron-up" v-if="accordionActive" />
            <fa icon="chevron-down" v-else />
          </span>
        </b-btn>
      </b-card-header>

      <!--ACCORDION BODY-->
      <b-collapse id="addInvoiceAccordion" class="accordion-body" accordion="addInvoiceAccordion" role="tabpanel" v-model="accordionActive">
        <b-form @submit="onSubmit" validated>
          <b-container>
            <b-row>
              <b-col role="group">
                <label for="type">Tipo:</label>
                <b-form-select id="type"
                               :options="types"
                               required
                               v-model="invoice.type">
                </b-form-select>
              </b-col>

              <b-col role="group">
                <b-form-group id="priceGroup"
                              label="Importe:"
                              label-for="price">
                  <b-form-input id="price"
                                type="number"
                                step="0.01"
                                v-model="invoice.price"
                                required
                                placeholder="100.25">
                  </b-form-input>
                  <small>Separar decimales con coma ","</small>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col role="group">
                <b-form-group id="fromGroup"
                              label="Desde:"
                              label-for="from">
                  <b-form-input id="from"
                                type="date"
                                v-model="invoice.from"
                                required
                                placeholder="dd/mm/yyyy">
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col role="group">
                <b-form-group id="toGroup"
                              label="Hasta:"
                              label-for="to">
                  <b-form-input id="to"
                                type="date"
                                v-model="invoice.to"
                                required
                                placeholder="dd/mm/yyyy">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col role="group">
                <div class="form-submit">
                  <b-button class="form-submit" type="submit" variant="primary">Añadir</b-button>
                </div>
              </b-col>
            </b-row>

          </b-container>
        </b-form>
      </b-collapse>
    </div>
</template>

<script>
  import {initDateFrom, initDateTo} from '~/assets/js/utils/dateUtil'

  export default {
    name: 'InvoiceForm',
    data () {
      return {
        invoice: {
          type: '',
          from: initDateFrom(),
          to: initDateTo(),
          price: ''
        },
        types: ['GAS', 'LUZ', 'AGUA'],
        accordionActive: false
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        if (this.validateInvoice(this.invoice)) {
          this.$store.commit('addInvoice', this.invoice)
          this.reset()
        }
      },
      validateInvoice (invoice) {
        return true
      },
      reset () {
        this.invoice = {
          type: '',
          from: initDateFrom(),
          to: initDateTo(),
          price: ''
        }
        this.accordionActive = false
      }
    }
  }
</script>

<style scoped>
.form-submit {
  margin-top: 10px;
  text-align: center;
}
</style>
