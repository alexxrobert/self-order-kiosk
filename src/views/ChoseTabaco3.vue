<template>
  <SlideTransition :direction="getRouteDirection">
    <SafeArea :class="`app theme-${session.theme}`" v-if="session.started">
      <IdleTime/>
       <div style="position:fixed; float:left;margin-left:10px; margin-top:10px;"> 
     <img src="img/kiosk_logo.png" style="height: 72px;opacity: 0.8">
     </div>
      <div class="app-header">
        <div class="m-auto">
          {{ $t('title') }}
        </div>
      </div>
      <div class="app-content">
        <div class="d-block" >
          <div ref="swiper" >
            <div class="swiper-wrapper" >
              <div class="swiper-slide" v-for="item in session.itemGroup.items" :key="item.fakeId" v-if="(item.takeout =='mixto') ||  (session.order.takeOut == (item.takeout =='llevar')) || (!session.order.takeOut == (item.takeout =='aqui'))">
                <ItemButton ref="itemButton" :item="item" @click="select(item)" @imagePreload="loadImages"/>
              </div>
            </div>
          </div>
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
import Swiper from 'swiper'
import ItemButton from './partials/ItemButton'
import breakpoints from '@/constants/breakpoints'
export default {
  name: 'chooseTabaco',
  components: {
    ItemButton
  },
  async mounted() {
    if (!this.session.started) {
      this.restart()
      return
    }
    this.session.order.takeOut = true
    this.session.order.mobile = true  ///////////////HERE
    //this.session.itemGroup = 9
    let vvv = JSON.stringify(this.session)
    console.log("FIRST= " + vvv)
    await this.listItemGroups()
    await this.listItems()
     vvv = JSON.stringify(this.session)
    console.log("SECOND= " + vvv)
    this.$nextTick(() => this.initSwipeGesture())
  },
  methods: {
    async listItems() {
      //this.session.itemGroup = 9
      this.session.itemGroup.items = await this.$api.tabaco.list(3)
      let ttt = JSON.stringify(this.session.itemGroup.items)
      console.log("session.itemGroup.items = " + ttt)
    },
           
     async listItemGroups() {
      this.tabacoGroups = await this.$api.tabacoGroups.list()
      this.session.itemGroup = this.tabacoGroups[0]
      let yyy = JSON.stringify(this.tabacoGroups)
      console.log("GROUPS= " + yyy)
            
    },        
    
    back() {
      this.$router.push({ name: 'choseTabaco2' })
    },
    initSwipeGesture() {
      if (!this.$refs.swiper) return
      const swiper = new Swiper(this.$refs.swiper, {
        direction: 'horizontal',
        //slidesPerView: Math.min(this.session.itemGroup.items.length, 3.25),//CHANGED
        //slidesPerView: 4.50,
        slidesPerView: Math.min(this.session.itemGroup.items.length, 4.33) ,
        slidesPerViewFit : false,
        //roundLengths: false,
        slidesPerColumn: this.slidesPerColumn(),
        spaceBetween: 30,
        centeredSlides: false,//CHANGED
        breakpoints: {
          [breakpoints[1280]]: {
            slidesPerView: Math.min(this.session.itemGroup.items.length, 2.25),
            spaceBetween: 30,
            centeredSlides: false
          },
          [breakpoints[600]]: {
            slidesPerView: Math.min(this.session.itemGroup.items.length, 1.5),
            spaceBetween: 20,
            centeredSlides: true
          }
        }
      })
      window.addEventListener('resize', () => {
        swiper.params.slidesPerColumn = this.slidesPerColumn()
        swiper.update()
      })
    },
    loadImages() {
      const preloading = this.$refs.itemButton
        .map(card => card.image.preloading)
        .includes(true)
      if (preloading) return
      this.$refs.itemButton.forEach(card => card.image.load())
    },
    restart() {
      this.$router.push({ name: 'start' })
    },
    select(item) {
      this.session.item = item
      this.$router.push({ name: 'customizeItem' })
    },
    slidesPerColumn() {
      if (this.$device.screen.safeArea.height() >= breakpoints[900]) return 2
      else return 2
    }
  }
}
</script>

<i18n>
{
  "es": {
    "back": "Atrás",
    "tap_to_select": "Toque para selecionar",
    "title": "Elige el tabaco tocando la foto"
  },
  "en": {
    "back": "Back",
    "tap_to_select": "Tap to select",
    "title": "Click to buy cigarettes"
  }
}
</i18n>
