<template>
  <div class="table">

    <!--TITLE-->
    <!--<h1 class="m-3 text-center">Gráficos</h1>-->
    <GraphLine :chartData="totalCostPerDayData"
                    :options="totalCostPerDayOptions"
                    heigth="200px">
    </GraphLine>
  </div>
</template>

<script>
  import {formatTimeMillis} from '~/assets/js/utils/dateUtil'
  import {daysSorted, sumPricePerDayForAllAndTypes} from '~/assets/js/utils/expensesUtil'
  import GraphLine from '~/components/graphs/GraphLine'

  export default {
    name: 'GraphTotalCostPerDay',
    components: {
      GraphLine
    },
    data () {
      return {
        colors: [
          '#f87979',
          '#5e8b8c',
          '#f8de4d',
          '#2819f8'
        ],
        totalCostPerDayOptions: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Total de gastos / día'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Día'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Gasto/Dia'
              }
            }]
          }
        }
      }
    },
    computed: {
      guests () {
        return this.$store.getters.guests
      },
      invoices () {
        return this.$store.getters.invoices
      },
      validateInvoices () {
//        console.log('validateInvoices')
        return !(this.invoices === undefined ||
          this.invoices === null ||
          this.invoices.length === 0)
      },

      /**
       * JSON containing all and type as key and sum of prices per day for all and each type:
       * {all: {}, GAS: {}, AGUA: {}, LUZ: {}, ...}
       * For all and each type key, value is JSON that includes day as key and sum of prices for this day:
       * {all: {1500501600000: 3.45, 1500674400000: 3}, AGUA: {1500501600000: 2, 1500674400000: 1.5}, ...},
       */
      costsPerDayForAllAndTypes () {
//        console.log('costsPerDayForAllAndTypes')
        return this.validateInvoices
          ? sumPricePerDayForAllAndTypes(this.invoices, this.timeArrayDaysInvoicesSorted)
          : {}
      },

      /**
       * Array of each date from and to of all invoices converted to milliseconds
       * @return {Array.<Number>}
       */
      timeArrayDaysInvoicesSorted () {
//        console.log('timeArrayDaysInvoicesSorted')
        return this.validateInvoices
          ? daysSorted(this.invoices)
          : []
      },

      /**
       * Data for graph
       * data:
       * {
             *      labels: {Array<String>},
             *      datasets: [
             *          {
             *              label: {String},
             *              data: {Array<Number>}
             *          },
             *          {
             *              label: {String},
             *              data: {Array<Number>}
             *          }
             *      ]
             * }
       * @return {{}}
       */
      totalCostPerDayData () {
        // labels
        let labels = this.timeArrayDaysInvoicesSorted.map((k) => {
          return formatTimeMillis(Number(k))
        })

        // create datasets, one dataset for each type
        let datasets = []
        let types = Object.keys(this.costsPerDayForAllAndTypes)
        let iType = -1
        for (let type of types) {
          iType++

          let data = Object.values(this.costsPerDayForAllAndTypes[type]).map(v => {
            return v.toFixed(2)
          })

          // Set label and color
          let dataset = {
            label: type === 'all' ? 'TOTAL' : type,
            backgroundColor: this.colors[iType % this.colors.length],
            borderColor: this.colors[iType % this.colors.length],
            fill: false,
            data: data
          }

          // add to datasets
          datasets.push(dataset)
        }

        // chart data
        let chartData = {
          labels: labels,
          datasets: datasets
        }

        return chartData
      }
    }
  }
</script>
