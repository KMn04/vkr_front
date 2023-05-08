import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";
import { ITicket } from "../types/Ticket";
import { IProjectEmployee } from "../types/Projects";

export class ProjectStore {
  id?: number;

  name?: string;

  description?: string;

  statusCode?: number;

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
        const response = await ProjectsService.getProject(this.id);
        runInAction(() => {
          this.id = response.projectId,
            this.name = response.name;
          this.description = response.description;
          this.statusCode = response.statusCode;
          this.state = new SuccessStateStore();
        })
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }
}