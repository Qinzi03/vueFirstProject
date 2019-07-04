import Vue from 'vue'
import { find } from '@/utils'

function Focus() {
  Vue.directive('focus', {
    inserted(el) {
      find(el, 'INPUT').focus()
    }
  })
}

export default Focus
