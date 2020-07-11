<template>
  <SlideTransition direction="left" v-if="hasOptions">
    <div ref="swiper" class="swiper-container flex-grow-1">
      <div class="swiper-wrapper">
        <div class="swiper-slide d-flex align-items-center border-bottom p-3 p-lg-5 m-0"
          v-for="option in optionGroup.options" :key="option.id" v-if="(!option.outofstock) && ( (option.takeout =='mixto')  || ( session.order.takeOut == (option.takeout=='llevar') ) || ( !session.order.takeOut == (option.takeout=='aqui') ) )">
              <div class="checkbox checkbox-primary" v-if="optionGroup.multichoice">
                <input type="checkbox" v-model="option.checked" @change="toggle2($event,option)">
                <span class="check-mark"></span> {{ option.name }}
                <img v-bind:id="'img' +option.id" v-bind:style="option.checked ? 'opacity: 1;': 'opacity: 0.20' " style="position: absolute; left:300px;  box-sizing:border-box;"  v-bind:src="imageUrl + option.id +'.jpg' " />
              </div>
              <div style="position: absolute; left: 480px" class="checkbox2 checkbox-primary" v-if="optionGroup.multichoice && option.modifier == false ">
                <input type="checkbox" id="more" name="" value="true" v-model="option.more" >
                <span class="check-mark2" id="more2"></span>Mas {{ option.name }}
               </div>
              <div class="radio radio-primary" v-else-if="optionGroup.multichoice == false">
                <input type="checkbox" v-model="option.checked" @change="toggle($event, option)">
                <span class="check-mark"></span> {{ option.name }}
              </div>
              <div class="ml-auto text-primary" v-if="option.price > 0">
                <Currency :amount="option.price"/>
              </div>
              <div class="pl-3 ml-auto text-muted" v-else>
                {{ $t('no_cost') }}
             </div> 
        </div> <!-- label -->
      </div>
    </div>
  </SlideTransition>
</template>

<script>
import Swiper from 'swiper';
import { OptionGroup } from '@/models'
import breakpoints from '@/constants/breakpoints'

export default {
  name: 'OptionCheckMark',
  props: {
    optionGroup: {
      type: OptionGroup,
      required: true
    }
  },
  async mounted() {
    if (!this.optionGroup.options) {
      this.optionGroup.options = await this.$api.options.list(this.optionGroup.id)
      let ooo = JSON.stringify(this.optionGroup.options)
      console.log("this.optionGroup.options = " + ooo)
      let urlx = `${process.env.VUE_APP_API_BASE_URL}/gallery`
      console.log("imgurl = " + urlx)
      
    }

    this.$nextTick(() => this.initSwipeGesture())
  },
  methods: {
    initSwipeGesture() {
      if (!this.$refs.swiper) return

      const swiper = new Swiper(this.$refs.swiper, {
        slidesPerView: this.slidesPerView(),
        direction: 'vertical'
      })

      window.addEventListener('resize', () => {
        swiper.params.slidesPerView = this.slidesPerView()
        swiper.update()
      })
    },
    slidesPerView() {
      if (this.$device.screen.safeArea.height() >= breakpoints[1280]) return 12.5
      else if (this.$device.screen.safeArea.height() >= breakpoints[960]) return 9.5
      else if (this.$device.screen.safeArea.height() >= breakpoints[800]) return 8.5
      else if (this.$device.screen.safeArea.height() >= breakpoints[600]) return 5.5
      else return 4.5
    },
    toggle($event, current) {
      this.optionGroup.options
        .filter(option => option.id !== current.id)
        .forEach(option => option.checked = false)

      $event.target.checked = true
      current.checked = true
    },
    toggle2($event, current) {
      if (current.modifier == true && current.checked == true) {
        this.optionGroup.options
          .filter( (option => option.id !== current.id) && (option => option.price == 0) )
          .forEach(option => option.checked = false)

        $event.target.checked = true
        current.checked = true
        }else{
        
        if(current.checked==true) document.getElementById("img" + current.id).style.opacity = 1
        if(current.checked==false) document.getElementById("img" + current.id).style.opacity = 0.20
        }
    },
    toggle3($event, current) {
      if (current.modifier == true && current.checked == true) {
        this.optionGroup.options
          .filter( (option => option.id !== current.id) && (option => option.price == 0) )
          .forEach(option => option.checked = false)

        $event.target.checked = true
        current.checked = true
        }else{
        
        if(current.checked==true) document.getElementById("img" + current.id).style.opacity = 1
        if(current.checked==false) document.getElementById("img" + current.id).style.opacity = 0.20
        }
    }
    
  },
  computed: {
    hasOptions() {
      return !!this.optionGroup.options
    },
    imageUrl() {
      return `${process.env.VUE_APP_API_BASE_URL}${this.$api.virtualPath}/gallery/` 
      }
  }
}
</script>

<i18n>
{
  "es": {
    "no_cost": "gratis"
  },
  "en": {
    "no_cost": "no cost"
  }
}
</i18n>
