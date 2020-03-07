<template>
  <SlideTransition :direction="getRouteDirection">
    <SafeArea :class="`app theme-${session.theme}`" v-if="session.started" @click="newOrder">
      <div class="app-header d-none d-lg-flex">
        <h1 class="m-auto font-weight-bold">
          {{ $t('order_here') }}
        </h1>
      </div>
      <div class="app-content">
        <Logo class="m-auto"/>
         <div class="text-center">
                <button type="button" class="btn btn-flag" @click="changeLocale('es')">
                  <span class="flag-icon flag-icon-br"></span>
                </button>
                <button type="button" class="btn btn-flag" @click="changeLocale('en')">
                  <VectorFlagUS>
                </button>
              </div>
      </div>
     
      <div class="app-footer bg-primary p-3 p-md-5">
        <span class="text-uppercase m-auto">
          {{ $t('start_button') }}
        </span>
      </div>
    </SafeArea>
  </SlideTransition>
</template>

<script>
import { Order } from '@/models'
import VectorFlagBR from '../vectors/VectorFlagBR'
import VectorFlagUS from '../vectors/VectorFlagUS'

export default {
  name: 'newOrder',
   components: {
    VectorFlagUS, VectorFlagBR
  },
  async mounted() {
  this.$api.virtualPath = "burger-place"
          this.$api.token = "AccessTokenUsedByTheApplicationForAuthentication=="
          this.session.started = true
  
  
    if (!this.session.started) {
      this.restart()
      return
    }

    const app = await this.$api.settings.get()
    this.session.theme = app.theme
  },
  methods: {
    changeLocale(locale) {
      this.$api.locale = locale
      this.$i18n.locale = locale
      this.$session.locale = locale
      this.$router.push({ name: 'newOrder' })
    },
    newOrder() {
      this.session.order = new Order()
      //this.$router.push({ name: 'chooseItemGroup' })
      this.$router.push({ name: 'eatLocation' })
    },
    restart() {
      this.$router.push({ name: 'start' })
    }
  },
  computed: {
    url() {
      return `${process.env.VUE_APP_BASE_URL}#?code=${this.session.code}`
    }
  }
}
</script>

<i18n>
{
  "es": {
    "order_here": "Pedir aqui",
    "start_button": "Toque para comenzar"
  },
  "en": {
    "order_here": "Order here",
    "start_button": "Touch to start"
  }
}
</i18n>
