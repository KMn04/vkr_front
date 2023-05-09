import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";
import { IProjectMember } from "../types/Projects";

export class ProjectMembersStore {
  projectId?: number;

  members: IProjectMember[];

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.members = [];
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
        const response = await ProjectsService.getProjectMembers(this.projectId);
        runInAction(() => {
          this.members = response;
          this.state = new SuccessStateStore();
        })
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  get preparedMembers() {
    return this.members.map((member) => ({
      ...member,
      fullName: [member.user.firstName, member.user.secondName].join(' ')
    }))
  }
}