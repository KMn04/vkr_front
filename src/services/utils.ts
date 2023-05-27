export const tokenName = 'vkrToken'
export const refreshTokenName = 'vkrRefreshToken'

export const setTokenToLocalStorage = (token?: string) => {
  if (token) {
    localStorage.setItem(tokenName, token)
  } else {
    localStorage.removeItem(tokenName)
  }
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(tokenName)
}

export const setRefreshTokenToLocalStorage = (token?: string) => {
  if (token) {
    localStorage.setItem(refreshTokenName, token)
  } else {
    localStorage.removeItem(refreshTokenName)
  }
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem(refreshTokenName)
}


