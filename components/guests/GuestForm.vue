<template>
  <div class="form" role="tablist">

    <!--ACCORDION HEADER-->
    <b-card-header class="accordion-header" header-tag="header" role="tab">
      <b-btn class="accordion-header-btn" block href="#" v-b-toggle.addGuestAccordion variant="default">
        <span>{{ accordionActive ? 'Ocultar' : 'Añadir inquilinos'}}</span>
        <span class="float-right">
          <fa icon="chevron-up" v-if="accordionActive" />
          <fa icon="chevron-down" v-else />
        </span>
      </b-btn>
    </b-card-header>

    <!--ACCORDION BODY-->
    <b-collapse id="addGuestAccordion" class="accordion-body" accordion="addGuestAccordion" role="tabpanel" v-model="accordionActive">
      <b-form @submit="onSubmit" validated>
        <b-container>
          <b-row>
            <b-col role="group">
              <b-form-group id="nameGroup"
                            label="Nombre:"
                            label-for="name">
                <b-form-input id="name"
                              type="text"
                              v-model="guest.name"
                              required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col role="group">
              <b-form-group id="fromGroup"
                            label="Primer día de estancia:"
                            label-for="from">
                <b-form-input id="from"
                              type="date"
                              v-model="guest.from"
                              required
                              placeholder="dd/mm/yyyy">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col role="group">
              <b-form-group id="toGroup"
                            label="Último día de estancia:"
                            label-for="to">
                <b-form-input id="to"
                              type="date"
                              v-model="guest.to"
                              placeholder="dd/mm/yyyy">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col role="group">
              <div class="form-submit">
                <b-button type="submit" variant="primary">Añadir</b-button>
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
    name: 'GuestForm',
    data () {
      return {
        guest: {
          name: '',
          from: initDateFrom(),
          to: initDateTo()
        },
        accordionActive: false
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        if (this.validateGuest(this.guest)) {
          this.$store.commit('addGuest', this.guest)
          this.reset()
        }
      },
      validateGuest (guest) {
        return true
      },
      reset () {
        this.guest = {
          name: '',
          from: initDateFrom(),
          to: initDateTo()
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
