import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import { getAuthModel } from './utils/auth'

import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
// import './mock' // simulation data
import AudioMixIn from '@/components/AudioPlayer/audioMixin'

import * as filters from './filters' // global filters
import Page from '@/utils/page'
import http from '@/utils/http'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import dateUtils from '@/utils/date'
import filter from '@/filters/index'
import loading from '@/utils/loading'
import validator from '@/constant/validator'

import Table from '@/components/Table/index.vue'
import LoadingPanel from '@/components/LoadingPanel/index.vue'
import PageComponent from '@/components/Page/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import SlideoutPanel from '@/components/SlideoutPanel/index.vue'
import ExpandButton from '@/components/ExpandButton/index.vue'
import DownloadButton from '@/components/DownloadButton/index.vue'
import LrDatePicker from '@/components/LrDatePicker/index'
import FormEditor from '@/components/FormEditor/index'
import DialogConfirm from '@/components/DialogConfirm/index'
import AudioPlayer from '@/components/AudioPlayer/index.vue'
import BatchUpload from '@/components/Upload/batch.vue'
import Upload from '@/components/Upload/index.vue'
import CallRangePicker from '@/components/CallRange/index.vue'
import DatePicker from '@/components/DatePicker/index.vue'
import ButtonGroup from '@/components/ButtonGroup/index.vue'
import MessageBox from '@/components/MessageBox/MessageBox.js'
import Toast from '@/components/Toast/index.js'
import MessageBar from '@/components/MessageBar/index.vue'
import ExpandContainer from '@/components/ExpandContainer/index.vue'
import Focus from '@/directive/focus'
import ClickoutSide from '@/directive/clickout-side'

import Api from '@/api/index'
import '@/mock'
Vue.use(loading)
Vue.component(PageComponent.name, PageComponent)
Vue.component(Table.name, Table)
Vue.component(LoadingPanel.name, LoadingPanel)
Vue.component(Dialog.name, Dialog)
Vue.component(SlideoutPanel.name, SlideoutPanel)
Vue.component(ExpandButton.name, ExpandButton)
Vue.component(DownloadButton.name, DownloadButton)
Vue.component(LrDatePicker.name, LrDatePicker)
Vue.component(FormEditor.name, FormEditor)
Vue.component(DialogConfirm.name, DialogConfirm)
Vue.component(AudioPlayer.name, AudioPlayer)
Vue.component(BatchUpload.name, BatchUpload)
Vue.component(Upload.name, Upload)
Vue.component(CallRangePicker.name, CallRangePicker)
Vue.component(DatePicker.name, DatePicker)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(MessageBar.name, MessageBar)
Vue.component(ExpandContainer.name, ExpandContainer)

// 定义全局变量
Vue.prototype.$api = Api
Vue.prototype.$lrMessageBox = MessageBox
Vue.prototype.$toast = Toast
Vue.Toast = Toast
Vue.prototype.$bus = new Vue() // 消息总线

Vue.prototype.$toSelect = function(map) {
  const keyList = Object.keys(map)
  return keyList.map(key => {
    return {
      label: key,
      value: map[key]
    }
  })
}

Vue.prototype.$validator = validator

const URI = require('urijs')
Vue.prototype.$download = (url, params = {}) => {
  const uri = URI(url)
  const model = Object.assign(getAuthModel(), params)
  uri.addQuery(model)
  window.open(uri.toString())
}

Vue.use(Element, {
  size: 'small', // set element-ui default size
  locale
})

Vue.use(Page)
Vue.use(http)
Vue.use(dateUtils)
Vue.use(filter)
Vue.use(Focus)
Vue.use(ClickoutSide)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  mixins: [AudioMixIn], // 全局音频组件
  created() {
    const pageLoadingClass = 'lr-page-optimizer'
    const pageLoadingElement = document.querySelector(`.${pageLoadingClass}`)
    if (pageLoadingElement) {
      pageLoadingElement.style.display = 'none'
    }
  },
  render: h => h(App)
})
