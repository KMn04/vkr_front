import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";

export class TicketStore {
  id?: number;

  projectId?: number;

  name?: string;

  statusCode?: number;

  authorId?: number;

  authorName?: string;

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.state = new StateBaseStore()
  }

  async fetch(projectId: number, id?: number) {
    this.state = new FetchingStateStore();
    try {
      if (id) {
        runInAction(() => {
          this.id = id;
        })
      }
      if (projectId) {
        runInAction(() => {
          this.projectId = projectId
        })
      }
      if (this.id && this.projectId) {
        const response = await ProjectsService.getProjectTask(this.projectId, this.id);
        runInAction(() => {
          this.id = response.taskId;
          this.name = response.name;
          this.statusCode = response.statusCode;
          this.authorId = response.authorId;
          this.state = new SuccessStateStore();
        })
      }
      this.state = new SuccessStateStore()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }
}