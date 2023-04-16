import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";

export class ProjectsStore {
  projects: any[];

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this)
    this.state = new StateBaseStore()
    this.projects = []
  }

  async fetchProjects() {
    this.state = new FetchingStateStore();
    try {
      const response = await ProjectsService.getProjects();
      runInAction(() => {
        this.projects = response;
        this.state = new SuccessStateStore();
      })
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }
}