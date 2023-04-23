import { makeAutoObservable } from "mobx"
import { StateBaseStore } from "./StateStores"
import { getTokenFromLocalStorage } from "../services/utils";

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
    } else {
      throw false
    }
  }
}