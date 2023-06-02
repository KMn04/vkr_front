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

  async changeRole(userId: number, roleCode: number) {
    if (this.projectId) {
      await ProjectsService.editRole(this.projectId, userId, roleCode);
      this.fetch()
    }
  }

  async deleteUser(userId: number) {
    if (this.projectId) {
      await ProjectsService.deleteUser(this.projectId, userId);
      this.fetch()
    }
  }

  get membersIds() {
    return this.members.map(member => member.userId)
  }

  get preparedMembers() {
    return this.members.map((member) => ({
      ...member,
      fullName: member.projectMember
    }))
  }
}