import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import { TicketStatus } from "../types/Ticket";
import TicketsService from "../services/TicketsService";

export class TicketStore {
  id?: number;

  title?: string;

  status?: keyof typeof TicketStatus;

  authorId?: number;

  authorName?: string;

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.state = new StateBaseStore()
  }

  async fetch(id?: number) {
    this.state = new FetchingStateStore();
    try {
      if (id) {
        runInAction(() => {
          this.id = id;
        })
      }
      if (this.id) {
        const response = await TicketsService.getTicket(this.id);
        runInAction(() => {
          this.id = response.id;
          this.title = response.title;
          this.status = response.status;
          this.authorId = response.authorId;
          this.authorName = response.authorName;
          this.state = new SuccessStateStore();
        })
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }
}