const publishBase = `${process.env.publishBase}`.replace(/"/g, '')

module.exports = { // 获取图片地址
  getImageBase() {
    return `${publishBase}static/img`
  }

}
