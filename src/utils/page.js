/**
 * 分页工具类
 */
const pageState = {
  'EMPTY': -1,
  'LOADING': 0,
  'SUCCESS': 1,
  'FAIL': 2
}

class Page {
  constructor(config = {}) {
    const { pageSize = 10, startPage = 1, processData } = config
    this.state = pageState.EMPTY
    this.page = startPage
    this.pageSize = parseInt(sessionStorage.getItem('pageSize')) || pageSize
    this.total = 0
    this.list = []
    this.sum = 0
    if (processData && typeof processData === 'function') {
      this.processData = processData
    }
  }

  start() {
    if (this.state === pageState.LOADING) {
      return
    } else {
      this.empty()
      this.state = pageState.LOADING
    }
  }

  end(state = true) {
    this.state = state ? pageState.SUCCESS : pageState.FAIL
  }

  update(newPage) {
    this.page = newPage.page
    this.pageSize = newPage.pageSize
    this.total = newPage.total
    this.list = null
    this.list = newPage.list || []
    this.sum = newPage.sum
  }

  empty() {
    this.list.splice(0, this.list.length)
  }

  getPageModel(pageSize, page) {
    return {
      page: page || this.page,
      pageSize: pageSize || this.pageSize
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$page = Page
  }
}
