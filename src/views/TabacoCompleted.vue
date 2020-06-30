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
  name: 'orderCompleted',
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
    "title": "Venta de tabaco completada.",
    "thank_you": "Gracias por su compra!",
    "instructions": "Recoje su paquete de la maquina detras",
    "exit": "Cerrar"
  },
  "en": {
    "title": "Cigarretes order complete",
    "thank_you": "Thank you!",
    "instructions": "Collect your cigarretes from machine from the back!",
    "exit": "Close"
  }
}
</i18n>
