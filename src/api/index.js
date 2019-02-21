/**
 * api 路径
 */
export const basePath = '/api'

const apiMap = {
  'login': `${basePath}/iam/oauth/token`, // '/iam/oauth/token', // 登陆 (本地登录请替换成 /login)
  'changeEnterprise': `${basePath}/iam/oauth/entToken`, // 切换企业
  'refreshToken': `${basePath}/iam/oauth/refresh`,
  'logout': `${basePath}/iam/oauth/logout`, // 登出
  'userInfo': '/user/info', // 获取用户信息
  // 验证码
  'getImageVerCode': `${basePath}/user/no_auth/v1/captcha/image`
}

export default apiMap
