import { dateUtils } from '@/utils/date'

export default {
  install(Vue) {
    Vue.filter('date', date => { // 日期格式化
      if (!date) {
        return ''
      } else {
        return dateUtils(date).format('YYYY-MM-DD')
      }
    })
    Vue.filter('time', date => {
      if (!date) {
        return ''
      } else {
        return dateUtils(date).format('HH:mm:ss')
      }
    })
    Vue.filter('time2', date => { //
      if (!date) {
        return ''
      } else {
        return dateUtils(date).format('HH:mm')
      }
    })
    Vue.filter('datetime', date => { // 时间格式化
      if (!date) {
        return ''
      } else {
        return dateUtils(date).format(`YYYY-MM-DD HH:mm:ss`)
      }
    })

    Vue.filter('datetime2', date => {
      if (!date) {
        return ''
      } else {
        return dateUtils(date).format('YYYY-MM-DD HH:mm')
      }
    })
    Vue.filter('fromNow', date => { // 日期友好显示，例如显示成三分钟前
      if (!date) {
        return ''
      } else {
        return dateUtils(date).fromNow()
      }
    })
    Vue.filter('localtime', date => { // localtime 转 date
      const { year, monthValue, dayOfMonth, hour, minute, second } = date
      return new Date(year, monthValue - 1, dayOfMonth, hour, minute, second).getTime()
    })
  }
}

export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
