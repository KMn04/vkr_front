import { makeAutoObservable } from "mobx";
import { DictionaryItem } from "../types/Common";
import { StateBaseStore } from "./StateStores";

export class ProjectStatusesStore {
  items: DictionaryItem[]

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
    this.state = new StateBaseStore();
    this.items = []
  }

  async fetch() {
    const response = await get();
    this.items = response
  }
}