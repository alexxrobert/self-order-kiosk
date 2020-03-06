import numeral from 'numeral'

numeral.register('locale', 'es', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mmillones',
    billion: 'billiones',
    trillion: 'triliones'
  },
  ordinal: function () {
    return 'º'
  },
  currency: {
    symbol: '€'
  }
})


numeral.register('locale', 'en', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'thousand',
    million: 'million',
    billion: 'billion',
    trillion: 'trillion'
  },
  ordinal: function () {
    return 'º'
  },
  currency: {
    symbol: '€'
  }
})


export default function (value, locale) {
  numeral.locale(locale)

  if (value === undefined || value === null) return ''

  return numeral(value).format('0,0.00')
}
