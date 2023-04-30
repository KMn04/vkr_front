import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import { TicketStatus } from "../types/Ticket";
import TicketsService from "../services/TicketsService";
import { IProjectWikiPage } from "../types/Projects";
import ProjectsService from "../services/ProjectsServices";

export class ProjectWikiStore {
  projectId?: number;

  pages: IProjectWikiPage[];

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.pages = [];
    this.state = new StateBaseStore()
  }

  async fetch(projectId?: number) {
    this.state = new FetchingStateStore();
    try {
      if (projectId) {
        runInAction(() => {
          this.projectId = projectId;
        })
      }
      if (this.projectId) {
        const response = await ProjectsService.getWiki(this.projectId);
        runInAction(() => {
          this.pages = response;
          this.state = new SuccessStateStore();
        })
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }
}