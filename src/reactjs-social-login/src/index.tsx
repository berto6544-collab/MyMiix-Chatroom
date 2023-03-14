export type objectType = {
  [key: string]: any
}

export type IResolveParams = {
  provider?: string
  data?: objectType
}


export { default as LoginSocialFacebook } from './LoginSocialFacebook'
export { default as LoginSocialGoogle } from './LoginSocialGoogle'
export { default as LoginSocialInstagram } from './LoginSocialInstagram'

