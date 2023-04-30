export interface IAuthResponse {
  token?: string
}

export interface IAuthRequest {
  login: string,
  password: string,
  firstName: string,
  email: string,
}