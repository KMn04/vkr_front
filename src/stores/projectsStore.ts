import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";
import { IProjectListItem } from "../types/Projects";

export class ProjectsStore {
  projects: IProjectListItem[];

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