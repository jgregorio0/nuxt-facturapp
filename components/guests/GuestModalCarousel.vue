<template>
  <b-carousel id="carousel"
              class="carousel"
              controls
              indicators
              :interval="4000"
              background="#ababab"
              img-width="1200"
              img-height="480"
              label-prev="Volver a la diapositiva anterior"
              label-next="Ir a la siguiente diapositiva"
              label-goto-slide="Ir a la diapositiva"
              label-indicators="Selecciona una diapositiva">

    <!--CAROUSEL GUESTS-->
    <b-carousel-slide
      caption="¿Cuantos inquilinos sois?"
      img-src="/static/img/carousel/guests_with_form_1200w480h.png"
      class="item">
      <p>Añade/Elimina inquilinos desde la pestaña 'Inquilinos'</p>
      <p>
        <b-button size="sm" variant="primary" :to="{ name: 'guests' }">Ir a Inquilinos</b-button>
      </p>
    </b-carousel-slide>

    <!--CAROUSEL INVOICES-->
    <b-carousel-slide
      caption="Gestiona tus facturas"
      img-src="/static/img/carousel/invoices-with-form_1200w480h.png"
      class="item">
      <p>Añade/Elimina facturas desde la pestaña 'Facturas'</p>
      <p>
        <b-button size="sm" variant="primary" :to="{ name: 'invoices' }">Ir a Facturas</b-button>
      </p>
    </b-carousel-slide>

    <!--CAROUSEL EXPENSES-->
    <b-carousel-slide
      caption="¿Cuanto tiene que pagar cada inquilino?"
      img-src="/static/img/carousel/expenses-overwiew_1200w480h.png"
      class="item">
      <p>Visualiza los gastos de cada inquilino</p>
      <p>
        <b-button size="sm" variant="primary" :to="{ name: 'expenses' }">Ir a Gastos</b-button>
      </p>
    </b-carousel-slide>

    <!--CAROUSEL EXPENSES DETAIL-->
    <b-carousel-slide
      caption="El gasto en detalle"
      img-src="/static/img/carousel/expenses-detail_1200w480h.png"
      class="item">
      <p>Despliega en detalle el gasto correspondiente a cada inquilino por factura</p>
      <p>
        <b-button size="sm" variant="primary" :to="{ name: 'expenses' }">Ir a Gastos</b-button>
      </p>
    </b-carousel-slide>

    <!--CAROUSEL GRAPHS-->
    <b-carousel-slide
      caption="Controla los gastos"
      img-src="/static/img/carousel/graphs_1200w480h.png"
      class="item">
      <p>Gráfico de gasto diario que supone cada factura el conjunto de todas ellas</p>
      <p>
        <b-button size="sm" variant="primary" :to="{ name: 'graphs' }">Ir a Gráficos</b-button>
      </p>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
  export default {
  }
</script>

<style>
  .carousel-caption {
    background: rgba(0, 0, 0, 0.50);
    border-radius: 55px 55px 55px 55px;
  }

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
    color: black;
  }

  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
    color: black;
  }
</style>
