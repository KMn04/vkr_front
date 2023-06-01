import { makeAutoObservable, runInAction } from "mobx";
import { StateBaseStore } from "./StateStores";
import ProfileServices from "../services/ProfileServices";

export interface IUserItem {
  userId: number,
  login: string,
  firstName: string,
  secondName: string,
  thirdName?: string,
  email?: string,
}

export class UsersStore {
  users: IUserItem[]

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.users = []
    this.state = new StateBaseStore()
  }


  async fetch() {
    const response = await ProfileServices.getAllUsers();
    runInAction(() => {
      this.users = response
    })
  }

  get options() {
    return this.users.map(item => ({
      value: item.userId,
      label: [item.firstName, item.secondName].join(' ')
    }))
  }
}