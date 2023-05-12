import { makeAutoObservable } from "mobx"
import { StateBaseStore } from "./StateStores"
import { getTokenFromLocalStorage, setTokenToLocalStorage } from "../services/utils";
import jwtDecode from 'jwt-decode'

export class AuthStore {
  token?: string;

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