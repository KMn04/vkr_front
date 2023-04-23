export const tokenName = 'vkrToken'

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