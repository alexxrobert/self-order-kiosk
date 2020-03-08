<template>
  <SlideTransition :direction="getRouteDirection">
    <SafeArea :class="`app theme-${session.theme}`" v-if="session.started">
      <IdleTime :seconds="30"/>
      <div class="app-header">
        <div class="m-auto">
          {{ $t('title') }}
        </div>
      </div>
      <div class="app-content">
        <div class="px-3">
         {{ $t('tammount-text') }} <Currency :amount="session.order.total()" class="text-primary font-weight-bold"/>
          <p class="text-center mb-4">
            <FontAwesome :icon="['far', 'smile']" size="4x"/>
          </p>
          <h3 class="text-center mb-4">
            {{ $t('thank_you') }}
          </h3>
          <p class="text-center">
            {{ $t('instructions') }}
          </p>
        </div>
      </div>
      <div class="app-footer">
        <button type="button" class="btn btn-primary mx-auto" @click="exit">
          {{ $t('exit') }}
        </button>
      </div>
    </SafeArea>
  </SlideTransition>
</template>

<script>
export default {
  name: 'payment',
  mounted() {
    if (!this.session.started) {
      this.restart()
    }
  },
  methods: {
    exit() {
      this.$router.push({ name: 'newOrder' })
    },
    restart() {
      this.$router.push({ name: 'start' })
    }
  }
}
</script>

<i18n>
{
  "es": {
    "title": "Pago en efectivo",
    "thank_you": "Gracias",
    "instructions": "Tome su ticket despues de pagar",
    "exit": "Salir",
    "ammount-text": "Importe total"
  },
  "en": {
    "title": "Payment by cash",
    "thank_you": "Thank you!",
    "instructions": "Take your ticket when payment is finished",
    "exit": "Exit",
    "ammount-text": "Total ammount"
  }
}
</i18n>
