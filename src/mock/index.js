import Mock from 'mockjs'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

Mock.mock(/\/mm\/v1\/crm\/home\/customer_info/, 'get', _ => {
  return {
    'data': [{
      'total_count': '300',
      'days': '20180914',
      'intent_code': 'A'
    }]
  }
})

Mock.mock(/\/v1\/crm\/home\/call_info/, 'get', _ => {
  return ''
})

export default Mock
