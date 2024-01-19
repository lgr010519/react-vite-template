/* eslint-disable import/no-unresolved */

import { fetchData } from '@/api/sso-axios'

import { aesEcbEncrypt } from './aes'

import type { ssoConfig, loginType } from './type'

import { onGetEncryptSecret } from '@/utils/utils'

/**
 * 用户登录
 * @param {*} data
 * @param {*} config
 * @returns
 */

const loginAuth = async (data: loginType, config: ssoConfig) => {
  const { password, username } = data
  const key = await onGetEncryptSecret('login')

  let loginPassword
  if (key && password) {
    // 进行AES-256-ECB对称加密
    loginPassword = aesEcbEncrypt(password, key)
  } else {
    throw new Error('密码加密失败')
  }

  const {
    redirect_uri,
    client_id,
    apiPrefix,
    apiSuffix = '/api/v1/login',
  } = config
  const thisLocation = new URL(window.location.href)

  return fetchData(
    'post',
    `${apiPrefix}${apiSuffix}${thisLocation.search}`,
    {
      username,
      password: loginPassword,
      redirect_uri,
      client_id,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    },
  )
  // try {
  //   accountLogin(
  //     {
  //       username,
  //       password,
  //       redirect_uri: redirect_uri,
  //       client_id: client_id,
  //     },
  //     query,
  //   ).then((res) => {
  //     if (res && res?.success) {
  //       resolve(res)
  //     } else {
  //       reject(new Error('输入的账号或密码有误，请重新登录'))
  //     }
  //   })
  // } catch (error) {
  //   console.log(error);

  // }
}

var _default = { loginAuth }
export default _default
