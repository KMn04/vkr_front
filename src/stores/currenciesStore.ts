import { makeAutoObservable } from "mobx";
import { DictionaryItem } from "../types/Common";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import DictionaryService from "../services/DictionaryService";

export class CurrenciesStore {
  items: DictionaryItem[]

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
    this.state = new StateBaseStore();
    this.items = []
  }

  async fetch() {
    try {
      this.state = new FetchingStateStore()
      const response = await DictionaryService.getCurrencies();
      this.items = response;
      this.state = new SuccessStateStore();
    } catch (error) {
      console.log(error);
      this.state = new ErrorStateStore(error)
    }
  }
}