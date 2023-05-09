import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";
import { IProjectTask } from "../types/Projects";

export class ProjectTasksStore {
  projectId?: number;

  tasks: IProjectTask[];

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.tasks = [];
    this.state = new StateBaseStore()
  }

  async fetch(id?: number) {
    this.state = new FetchingStateStore();
    try {
      if (id) {
        runInAction(() => {
          this.projectId = id;
        })
      }
      if (this.projectId) {
        const response = await ProjectsService.getProjectTasks(this.projectId);
        runInAction(() => {
          this.tasks = response;
          this.state = new SuccessStateStore();
        })
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  get preparedTasks() {
    return this.tasks.map((task) => ({
      ...task,
    }))
  }
}