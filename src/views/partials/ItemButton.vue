<template>
  <ScaleTransition>
    <button type="button" class="btn btn-card" @click="$emit('click', item)">
      <ProgressiveImage ref="image" :image="item" :alt="item.name" @preload="$emit('imagePreload')"/>
      <div style="font-size:15pt; font-weight: bold; text-align: center">
        <div >
          {{ item.name }}
        </div>
        <Currency :amount="item.price"/>
      </div>
    </button>
  </ScaleTransition>
</template>

<script>
import { Item } from '@/models'

export default {
  name: 'itemButton',
  props: {
    item: {
      type: Item,
      required: true
    }
  },
  computed: {
    image() {
      return this.$refs.image
    }
  }
}
</script>
