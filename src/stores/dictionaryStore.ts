import { makeAutoObservable } from "mobx";
import { DictionaryItem } from "../types/Common";
import { StateBaseStore } from "./StateStores";

export class DictionaryStore {
  items: DictionaryItem[]

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
    this.state = new StateBaseStore();
    this.items = []
  }
}