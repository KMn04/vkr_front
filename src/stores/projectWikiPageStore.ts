import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";

export class ProjectWikiPageStore {
  projectId?: number;

  wikiPageId?: string;

  title?: string;

  tempTitle?: string;

  content?: string;

  tempContent?: string;

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.state = new StateBaseStore()
  }

  async fetch(projectId: number, wikiPageId: string) {
    this.state = new FetchingStateStore();
    try {
      if (projectId) {
        runInAction(() => {
          this.projectId = projectId;
        })
      }
      if (wikiPageId) {
        runInAction(() => {
          this.wikiPageId = wikiPageId;
        })
      }
      if (this.projectId && this.wikiPageId) {
        const response = await ProjectsService.getWikiPage(this.projectId, this.wikiPageId);
        runInAction(() => {
          this.title = response.title;
          this.tempTitle = this.title;
          this.content = response.content;
          this.tempContent = this.content;
          this.state = new SuccessStateStore();
        })
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  async updateTitle() {
    if (this.projectId && this.wikiPageId) {
      await ProjectsService.updateWikiPage(
        this.projectId,
        this.wikiPageId,
        { title: this.tempTitle }
      );
    }
    runInAction(() => {
      this.title = this.tempTitle;
    })
  }

  async updateContent() {
    if (this.projectId && this.wikiPageId) {
      await ProjectsService.updateWikiPage(
        this.projectId,
        this.wikiPageId,
        { content: this.tempContent }
      )
      runInAction(() => {
        this.content = this.tempContent;
      })
    }
  }
}