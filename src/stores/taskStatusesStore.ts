import { makeAutoObservable } from "mobx";
import { DictionaryItem } from "../types/Common";
import { StateBaseStore } from "./StateStores";
import DictionaryService from "../services/DictionaryService";

export class TaskStatusesStore {
  items: DictionaryItem[]

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
    this.state = new StateBaseStore();
    this.items = []
  }

  async fetch() {
    const response = await DictionaryService.getTaskStatuses();
    this.items = response
  }

  get options() {
    return this.items.map(item => ({
      label: item.itemName,
      value: item.itemCode
    }))
  }
}