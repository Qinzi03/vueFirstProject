let vadilator = {
  // 密码
  password(rule, value, callback, myCallback) {
    if (!value) {
      return callback()
    } else if (value && (value.length < 6 || value.length > 16)) {
      return callback(new Error('密码为6到16位'))
    } else if (value && !/([a-zA-Z0-9])/.test(value)) {
      return callback(new Error('密码只支持英文字母和数字'))
    }
    typeof myCallback === 'function' && myCallback()
    return callback()
  },
  // 密码
  confirmPassword(rule, value, callback, $t, value2) {
    if (!value || (value && value === value2)) {
      return callback()
    } else {
      return callback(new Error('密码不一致'))
    }
  },
  // 整数
  integer: function(rule, value, callback) {
    if (!value || (value && /^-?[0-9]\d*$/.test(value))) {
      return callback()
    } else {
      return callback(new Error('只支持整数'))
    }
  },
  // 正整数
  positiveInt(rule, value, callback) {
    if (!value || (value && /^[0-9]\d*$/.test(value))) {
      return callback()
    } else {
      return callback(new Error('只支持证书'))
    }
  },
  // URL
  URL(rule, value, callback) {
    const re = /^[a-zA-z]+:\/\/[^\s]*$/
    if (!value || (value && re.test(value))) {
      return callback()
    } else {
      return callback(new Error('地址不符合规范'))
    }
  },
  // tel
  mobile(rule, value, callback) {
    if (!value) {
      return callback()
    } else if (value.length !== 11) {
      return callback(new Error('请填写正确的手机号码'))
    } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
      return callback(new Error('请填写正确的手机号码'))
    }
    return callback()
  },
  // 固定电话
  tel(rule, value, callback) {
    if (!value || /^0\d{2,3}-?\d{7,8}$/.test(value)) {
      return callback()
    } else {
      return callback(new Error('固话号码格式不正确'))
    }
  },
  // email
  email(rule, value, callback) {
    if (!value) {
      return callback()
    } else {
      const emailStr = value.split('@')[0]
      if (emailStr.length < 1 || emailStr.length > 18) {
        return callback(new Error('LANG9'))
      } else if (!/^([a-zA-Z0-9_])+@([a-zA-Z0-9_])+\.([a-zA-Z0-9_])+$/.test(value)) {
        return callback(new Error('邮箱地址不正确'))
      }
    }
    return callback()
  },
  // account
  account(rule, value, callback) {
    if (!value) {
      return callback()
    } else if (value.length < 8 || value.length > 16) {
      return callback(new Error('LANG11'))
    } else if (!/^([\\.a-zA-Z0-9_-])+$/.test(value)) {
      return callback(new Error('LANG10'))
    }
    return callback()
  },
  // companyName
  companyName(rule, value, callback) {
    if (!value || (value && value.length < 32)) {
      return callback()
    } else {
      return callback(new Error('LANG12'))
    }
  },
  // 英文汉字和数字可为空
  character(rule, value, callback) {
    if (!value) {
      return callback()
    } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)) {
      return callback(new Error('只能输入英文，汉字，数字'))
    }
    return callback()
  }
}
export default vadilator
