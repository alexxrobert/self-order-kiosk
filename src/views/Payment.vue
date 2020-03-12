<template>
  <SlideTransition :direction="getRouteDirection">
    <SafeArea :class="`app theme-${session.theme}`" v-if="session.started">
      <IdleTime :seconds="300"/>
     <div style="position:fixed; float:left;margin-left:10px; margin-top:10px;"> 
     <img src="img/kiosk_logo.png" style="height: 72px;opacity: 0.8">
     </div>
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
           <img src="img/gif_pay_white.gif" />
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
  data() {
    return {
      payment: [],
      polling: null
    }
  },
   async mounted() {
    if (!this.session.started) {
      this.restart()
    }
    //await this.getPaymentdata()
    //this.$nextTick(() => this.parsedata())
    //this.parsedata()
    const ppp = await this.$api.payment.get(this.session.order.total())
    //this.parsedata(ppp.version)
    let rrr = JSON.stringify(ppp)
    //console.log('paymentstatus= ' + ppp.paymentstatus);
    console.log(rrr)
  },
  methods: {
   parsedata(moc){
    //var moc = this.session.order.total();
    //var moc = this.payment.length;
      alert(moc);
      //setTimeout(function(){alert(moc); }, 5000);
    },
    async getPaymentdata() {
    this.payment = await this.$api.payment.get()
    //let authx = null
    //authx = await this.$api.Payment.get()
    //return true
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
