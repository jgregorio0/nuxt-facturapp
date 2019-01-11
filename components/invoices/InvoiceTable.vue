<template>
  <div class="table">

    <!--TABLE-->
    <b-table striped hover small responsive
             :items="invoices" :fields="fields"
             sort-by="to" :sort-desc="true">
      <template slot="days" slot-scope="data">
        {{ diffDays(data.item) }}
      </template>
      <template slot="pricePerDay" slot-scope="data">
        {{ pricePerDay(data.item) }}
      </template>
      <template slot="actions" slot-scope="data">
        <b-button variant="danger" @click="rmInvoice(data.item.index)">
          Eliminar
        </b-button>
      </template>
    </b-table>

    <!--SUMMARY-->
    <b-container>
      <b-list-group>
        <b-row>
          <b-col>
            <b-list-group-item>
              <b-container>
                <b-row>
                  <b-col><span class="d-block font-weight-bold p-1">Importe total</span></b-col>
                  <b-col><span class="float-right money p-1">{{ totalCost }}</span></b-col>
                </b-row>
              </b-container>
            </b-list-group-item>
          </b-col>
          <b-col>
            <b-list-group-item>
              <b-container>
                <b-row>
                  <b-col><span class="d-block font-weight-bold p-1">Media diaria</span></b-col>
                  <b-col><span class="float-right money p-1">{{ averagePerDay }}</span></b-col>
                </b-row>
              </b-container>
            </b-list-group-item>
          </b-col>
        </b-row>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
  import {diffDaysStr} from '~/assets/js/utils/dateUtil'
  import {calcCostByInvoices, calcAveragePricePerDay} from '~/assets/js/utils/expensesUtil'

  export default {
    name: 'InvoiceTable',
    data () {
      return {
        fields: [
          {
            key: 'type',
            label: 'Tipo',
            sortable: true
          },
          {
            key: 'price',
            label: 'Importe',
            sortable: true,
            variant: 'danger'
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
            key: 'days',
            label: 'Días',
            sortable: true
          },
          {
            key: 'pricePerDay',
            label: 'Importe/Dia',
            variant: 'danger'
          },
          {
            key: 'actions',
            label: 'Acciones'
          }
        ]
      }
    },
    computed: {
      invoices () {
        return this.$store.getters.invoices
      },
      validateInvoices () {
        return !(this.invoices === undefined ||
          this.invoices === null ||
          this.invoices.length === 0)
      },
      totalCost () {
        return this.validateInvoices ? calcCostByInvoices(this.invoices).toFixed(2) : ''
      },
      averagePerDay () {
        return this.validateInvoices ? calcAveragePricePerDay(this.invoices).toFixed(2) : ''
      }
    },
    methods: {
      rmInvoice (index) {
        this.$store.dispatch('rmInvoice', {index: index})
      },
      pricePerDay (invoice) {
        return this.validateInvoices ? invoice.pricePerDay.toFixed(2) : ''
      },
      diffDays (invoice) {
        return this.validateInvoices ? diffDaysStr(invoice.from, invoice.to).toFixed(0) : ''
      }
    }
  }
</script>

<style scoped>
  .money {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    position: relative;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
</style>
