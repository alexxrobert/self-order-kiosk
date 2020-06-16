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
	  <div class="text-center mb-4 font-weight-bold" v-if="hayDinero">
	{{ $t('ammount-paid') }}<Currency :amount="payment.totalpaid" class="font-weight-bold"/>
	 </div>
	 <div class="swiper-slide swiper-slide" data-swiper-column="0" data-swiper-row="0" style="order: 0; width: 331px; height:290px; margin-right: 30px; position: absolute; top: 190px; left: 20px; ">
		<button type="button" class="btn btn-card" style="transform-origin: 50% 50% 0px; visibility: inherit; opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);"><span class="img-progressive" alt="{{ session.order.items[0].name }}"><svg><filter id="svgBlurFilter"><feGaussianBlur stdDeviation="5"></feGaussianBlur><feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"></feColorMatrix><feComposite in2="SourceGraphic" operator="in"></feComposite></filter></svg><img src="http://kiosk2.maskekebab.com/burger-place/gallery/{{ session.order.items[0].id }}.item.standard.jpg" class="original"></span><div style="font-size: 13pt; font-weight: bold; text-align: center; width: 100%;"><div>
        {{ session.order.items[0].name }}
      </div><p>
 <Currency :amount="session.order.total()" class="font-weight-bold"/>
</p></div></button>
</div>
          <p class="text-center mb-4">
           <img src="img/gif_pay_white.gif" />
          </p>
          <h3 class="text-center mb-4" v-if="isPaymentdone">
            {{ $t('thank_you') }}</h3>
	  <h3 class="text-center mb-4" v-else>
            {{ $t('wait') }}</h3>  
          <p class="text-center">
            {{ $t('instructions') }}
          </p>
        </div>
      </div>
      <div class="app-footer">
        <button type="button" class="btn btn-primary mx-auto" @click="exit" v-if="isPaymentdone">
          {{ $t('exit') }}
        </button>
	<button type="button" class="btn btn-primary mx-auto" @click="exit" v-else>
          {{ $t('cancel') }}
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
      payment: {paymentstatus:"sent", totalpaid: "0"},
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
    const totx = this.session.order.total()
    this.session.order.totale = totx.toPrecision(4)
   // const ppp = await this.$api.payment.get(this.session.order.total())
    //this.parsedata(ppp.version)
   // let rrr = JSON.stringify(ppp)
    //console.log('paymentstatus= ' + ppp.paymentstatus);
   // console.log(rrr)
    this.pollData()
  },
  methods: {
   pollData () {
		this.polling = setInterval(() => {
		 this.getPaymentdata()
		}, 3000)
	},
   parsedata(moc){
    //var moc = this.session.order.total();
    //var moc = this.payment.length;
      alert(moc);
      //setTimeout(function(){alert(moc); }, 5000);
    },
    async getPaymentdata() {
    this.payment = await this.$api.payment.get(this.session.order)
    this.session.order.opid = this.payment.opid
    console.log('pstatus= '+ this.payment.paymentstatus+' amm=' + this.payment.ammount)
    let vvv = JSON.stringify(this.session.order)
    console.log(vvv)
    //let authx = null
    //authx = await this.$api.Payment.get()
    //return true
    },
    
    exit() {
      this.session.order.tocancel = 1
      this.$api.payment.get(this.session.order)
      this.$router.push({ name: 'newOrder' })
    },
    restart() {
      this.$router.push({ name: 'start' })
    },
     finishorder() {
      this.$router.push({ name: 'orderCompleted' })
    }
  },
  computed: {
  	isPaymentdone(){
    if (this.payment.paymentstatus === 'finished'){
        clearInterval(this.polling)
	//setTimeout(()=>{ this.exit(); }, 10000)
	setTimeout(()=>{ finishorder(); }, 5000)
    	return true
	}
    console.log('pstatus= '+ this.payment.paymentstatus+' amm=' + this.payment.ammount + this.payment.opid)
    return false
    },
    hayDinero(){
    	 if (this.payment.totalpaid !== '0' & this.payment.totalpaid !== ''){
	 
    	return true
	}
    return false
    
    }
  }
  ,
  beforeDestroy () {
	clearInterval(this.polling)
}

}
</script>

<i18n>
{
  "es": {
    "title": "Pago en efectivo",
    "thank_you": "Gracias",
    "wait": "Por favor, use la maquina de abajo para pagar",
    "instructions": "Tome su ticket despues de pagar",
    "exit": "Salir",
    "cancel": "Cancelar pedido",
    "ammount-text": "Importe total",
    "ammount-paid": "Importe introducido"
  },
  "en": {
    "title": "Payment by cash",
    "thank_you": "Thank you!",
    "wait": "Please pay using the machine below",
    "instructions": "Take your ticket when payment is finished",
    "exit": "Exit",
    "cancel": "Cancel order",
    "ammount-text": "Total ammount",
    "ammount-paid": "Money paid"
  }
}
</i18n>
