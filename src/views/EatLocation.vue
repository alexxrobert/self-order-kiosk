<template>
  <SlideTransition :direction="getRouteDirection">
    <SafeArea :class="`app theme-${session.theme}`" v-if="session.started">
      <IdleTime/>
       <div style="position:fixed; float:left;margin-left:10px; margin-top:10px;"> 
     <img src="img/kiosk_logo.png" style="height: 72px;opacity: 0.8">
     </div>
      <div class="app-header">
        <span class="m-auto">
          {{ $t('title') }}
        </span>
      </div>
      <div class="app-content">
        <div class="d-flex">
          <button type="button" class="btn btn-outline-primary py-5 mr-3 flex-grow-1" @click="select('eatHere')">
            <FontAwesome icon="utensils" size="4x" class="mb-5"/>
            <h3 class="font-weight-normal">{{ $t('eat_here') }}</h3>
          </button>
          <button type="button" class="btn btn-outline-primary py-5 ml-3 flex-grow-1" @click="select('takeOut')">
            <FontAwesome icon="shopping-bag" size="4x" class="mb-5"/>
            <h3 class="font-weight-normal">{{ $t('take_out') }}</h3>
          </button>
        </div>
      </div>
      <div class="app-footer">
        <button type="button" class="btn btn-outline-primary" @click="back">
          <FontAwesome icon="arrow-left"/>
          <span class="ml-3">{{ $t('back') }}</span>
        </button>
      </div>
    </SafeArea>
  </SlideTransition>
</template>

<script>

export default {
  name: 'eatLocation',
  mounted() {
    if (!this.session.started) {
      this.restart()
      return
    }
  },
  methods: {
    back() {
      //this.$router.push({ name: 'orderSummary' })
      const routeName = this.orderHasItem ? 'orderSummary' : 'newOrder'
      this.$router.push({ name: routeName })
    },
    restart() {
      this.$router.push({ name: 'start' })
    },
    select(location) {
      this.session.order.takeOut = location === 'takeOut'
     // this.$router.push({ name: 'whoIAm' })
      this.$router.push({ name: 'chooseItemGroup' })
    }
  }
}
</script>

<i18n>
{
  "es": {
    "title": "¿Donde le gustaria comer?",
    "eat_here": "Local",
    "take_out": "Para llevar",
    "back": "Atras"
  },
  "en": {
    "title": "Where would you like to eat?",
    "eat_here": "Eat here",
    "take_out": "Take out",
    "back": "Back"
  }
}
</i18n>
