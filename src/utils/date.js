/**
 * 日期库
 * 基于momentjs, 官网：https://momentjs.com/
 */
import moment from 'moment'
moment.locale('zh-cn')

export const dateUtils = moment

export default {
  install(Vue) {
    Vue.prototype.$moment = dateUtils
  }
}

export const getCurrentDayMinutes = function(date) {
  const currentDate = moment(date)
  return currentDate.hour() * 60 + currentDate.minute()
}
