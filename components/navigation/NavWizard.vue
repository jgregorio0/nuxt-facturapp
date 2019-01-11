<template>
  <ul class="m-3 justify-content-center nav nav-pills nav-wizard">
    <b-nav-item
      :to="{ name: 'guests' }"
      :active="!this.$route.name || this.$route.name === 'guests'"
      title="Inquilinos">
      <fa icon="bed" class="mr-1"/>
      <span class="d-none d-sm-inline-block">Inquilinos</span>
    </b-nav-item>

    <b-nav-item :to="{ name: 'invoices' }" title="Facturas">
      <fa icon="receipt" class="mr-1"/>
      <span class="d-none d-sm-inline-block">Facturas</span>
    </b-nav-item>

    <b-nav-item :to="{ name: 'expenses' }" title="Gastos">
      <fa icon="dollar-sign" class="mr-1"/>
      <span class="d-none d-sm-inline-block">Gastos</span>
    </b-nav-item>

    <b-nav-item :to="{ name: 'graphs' }" title="Gráficos">
      <fa icon="chart-line" class="mr-1"/>
      <span class="d-none d-sm-inline-block">Gráficos</span>
    </b-nav-item>
  </ul>
</template>
