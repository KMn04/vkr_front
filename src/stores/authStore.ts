import { makeAutoObservable, runInAction } from "mobx"
import { StateBaseStore } from "./StateStores"
import { getRefreshTokenFromLocalStorage, getTokenFromLocalStorage, setTokenToLocalStorage } from "../services/utils";
import jwtDecode from 'jwt-decode'
import RefreshTokenService from "../services/RefreshTokenServices";
import ProfileServices from "../services/ProfileServices";

export class AuthStore {
  token?: string;

  refreshToken?: string;

  userId?: number;

  login?: string;

  firstName?: string;

  secondName?: string;

  thirdName?: string;

  email?: string;

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
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
      return true
    }
    return false
  }

  async fetch() {
    const response = await ProfileServices.getAccount()
    runInAction(() => {
      this.userId = response.userId
      this.firstName = response.firstName;
      this.secondName = response.secondName;
      this.thirdName = response.middleName;
      this.login = response.login;
      this.email = response.email;
    })
  }

  async update() {
    await ProfileServices.update({
      userId: this.userId,
      firstName: this.firstName,
      secondName: this.secondName,
      thirdName: this.thirdName,
      login: this.login,
      email: this.email
    })
  }

  async delete() {
    await ProfileServices.deleteUser();
  }

  logout() {
    setTokenToLocalStorage();
    if (this.refreshToken) {
      RefreshTokenService.logout({ refreshToken: this.refreshToken })
    }
    location.reload();
  }
}