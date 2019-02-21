// import { param2Obj } from '@/utils'

export default {
  loginByUsername: config => {
    return {
      'token': '175fd307-6e81-4186-a450-5b8fc86c3e0f',
      'expire': 1542471983000,
      'refreshToken': '07e5c5c6-94eb-40e8-bc11-6a2322ae99c4',
      'refreshExpire': 1537019183943,
      'userId': 123456,
      'ents': [{
        'entId': 111,
        'entName': 'A企业'
      }],
      'entId': 111
    }
  },
  logout: () => 'success'
}
