/**
 * el-form 中需要用到的校验规则
 */

const phoneExp = /^[1-9]{1}[0-9]{10}$/i // 电话号码正则(只校验位数)
const passExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[0-9A-Za-z]{6,}$/ // 密码正则

export default {
  phoneValidator(rule, value, callback) {
    console.log('value is: ' + value)
    if (phoneExp.test(value)) {
      callback()
    } else {
      callback(rule.message || '请输入正确的手机号')
    }
  },
  passValidator(rule, value, callback) {
    if (passExp.test(value)) {
      callback()
    } else {
      callback(rule.message || '请输入正确的密码')
    }
  },
  arrayRequiredValidator(rule, value, callback) { // 数组必填校验
    if (!value || value.length === 0) {
      return callback(rule.message)
    }
    const notNull = value.filter(item => !!item)
    if (notNull.length === 0) {
      return callback(rule.message)
    }
    return callback()
  },
  integerValidator(rule, value, callback) { // 整数校验
    if (isNaN(value)) {
      return callback('请输入有效的数字')
    }
    if (value < 1 || parseInt(value) !== Number(value)) {
      return callback(rule.message || '请输入正整数')
    }
    callback()
  }
}
