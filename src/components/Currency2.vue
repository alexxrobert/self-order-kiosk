  
<template>
  <p style="margin-top: 1rem !important;">
   {{ amount | numeral(locale) }} {{ symbol }}
  </p>
</template>

<script>
export default {
  name: 'currency',
  props: {
    amount: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    symbol() {
      return this.locale === 'br' ? 'R$' : '€'
    }
  }
}
</script>
