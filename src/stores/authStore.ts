import { makeAutoObservable } from "mobx"
import { StateBaseStore } from "./StateStores"
import { getTokenFromLocalStorage, setTokenToLocalStorage } from "../services/utils";
import jwtDecode from 'jwt-decode'

export class AuthStore {
  token?: string;

  login?: string;

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
    this.state = new StateBaseStore()
  }

  tryGetToken() {
    const tempToken = getTokenFromLocalStorage();
    if (tempToken) {
      this.token = tempToken;
      const payload = jwtDecode(this.token) as { login: string };
      this.login = payload.login
    } else {
      throw false
    }
  }

  logout() {
    setTokenToLocalStorage();
    location.reload();
  }
}