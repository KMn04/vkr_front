import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";
import { ProjectMembersStore } from "./ProjectMembersStore";
import { IProjectUpdate } from "../types/Projects";
import { ProjectTasksStore } from "./projectTasksStore";

export class ProjectStore {
  id?: number;

  name?: string;

  description?: string;

  statusCode?: number;

  projectMembers: ProjectMembersStore;

  projectTasks: ProjectTasksStore;

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.projectMembers = new ProjectMembersStore();
    this.projectTasks = new ProjectTasksStore();
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
        console.log('fetch')
        this.projectMembers.fetch(this.id)
        this.projectTasks?.fetch(this.id)
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  async update(values: IProjectUpdate) {
    if (this.id) {
      await ProjectsService.update(this.id, values)
    }
  }
}