import axios from 'axios'

import type { secretType } from './type'
const baseUrl = 'https://eiam-portal-service.test.youpin-k8s.net'
/**
 * 获取登录公钥
 */
export async function getLoginEncryptSecret(type: secretType) {
  return axios(`${baseUrl}/api/v1/public_secret?type=${type}`)
}

/**
 * 获取加密公钥
 * login:登录加密公钥
 * encrypt : 验证码加密公钥
 */
const onGetEncryptSecret = async (type: secretType) => {
  console.log(type === 'login' ? '登录加密公钥' : '验证码加密公钥')

  const res = await getLoginEncryptSecret(type)
  const { success, result } = res.data
  if (success && result) {
    return Promise.resolve(result.secret)
  }
  return Promise.resolve(undefined)
}

export { onGetEncryptSecret }
