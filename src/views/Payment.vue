<template>
  <SlideTransition :direction="getRouteDirection">
    <SafeArea :class="`app theme-${session.theme}`" v-if="session.started">
      <IdleTime :seconds="300"/>
      <div class="app-header">
        <div class="m-auto">
          {{ $t('title') }}
        </div>
      </div>
      <div class="app-content">
        <div class="px-3">
        <div class="text-center mb-4 font-weight-bold">
         {{ $t('ammount-text') }} <Currency :amount="session.order.total()" class="text-primary font-weight-bold"/>
         </div>
          <p class="text-center mb-4">
            <video src="css/money.mp4" autoplay loop height="300">
  Tu navegador no admite el elemento <code>video</code>.
</video>
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
    parsedata()
  },
  methods: {
   parsedata(){
    var moc = this.session.order.total();
      alert(moc);
    },
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
