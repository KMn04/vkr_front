export interface IAuthResponse {
  token: string,
  refreshToken: string
}

export interface IAuthRequest {
  login: string,
  password: string,
  firstName: string,
  email: string,
}