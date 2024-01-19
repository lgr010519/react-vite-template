type ssoConfig = {
  // 接口前缀(通常使用环境变量)
  apiPrefix: string
  // 接口后缀
  apiSuffix: string
  // 回调地址
  redirect_uri?: string
  // 统一平台客户端ID
  client_id
}

type loginType = {
  username: string
  password: string
}

type secretType = 'login' | 'encrypt'
export type { ssoConfig, loginType, secretType }
