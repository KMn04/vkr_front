import { makeAutoObservable } from "mobx"
import { StateBaseStore } from "./StateStores"
import { getRefreshTokenFromLocalStorage, getTokenFromLocalStorage, setTokenToLocalStorage } from "../services/utils";
import jwtDecode from 'jwt-decode'
import RefreshTokenService from "../services/RefreshTokenServices";

export class AuthStore {
  token?: string;

  refreshToken?: string;

  login?: string;

  firstName?: string;

  secondName?: string;

  thirdName?: string;

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
    this.firstName = 'Петр';
    this.secondName = 'Петров';
    this.thirdName = 'Иванович';
    this.state = new StateBaseStore()
  }

  async tryRefreshToken() {
    const tempAccessToken = await RefreshTokenService.getAccess({ refreshToken: this.refreshToken! });
    this.token = tempAccessToken.token;
  }

  async tryGetToken() {
    const tempToken = getTokenFromLocalStorage();
    const refreshToken = getRefreshTokenFromLocalStorage()
    if (tempToken) {
      this.token = tempToken;
      this.refreshToken = refreshToken ?? undefined
      const payload = jwtDecode(this.token) as { login: string };
      this.login = payload.login
    } else {
      if (refreshToken) {
        this.refreshToken = refreshToken;
        await this.tryRefreshToken()
      }
      if (!this.token) {
        throw false
      }
    }
  }

  logout() {
    setTokenToLocalStorage();
    if (this.refreshToken) {
      RefreshTokenService.logout({ refreshToken: this.refreshToken })
    }
    location.reload();
  }
}