import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";
import dayjs, { Dayjs } from "dayjs";
import { ICommentListItem } from "../types/Comments";
import CommentsService from "../services/CommentServices";
import TicketsService from "../services/TicketsService";

export class TicketStore {
  id?: number;

  projectId?: number;

  projectName?: string;

  assigneeName?: string;

  assigneeId?: number;

  authorId?: number;

  authorName?: string;

  supervizorName?: string;

  supervizorId?: number;

  name?: string;

  statusCode?: number;

  statusName?: string;

  dateFinishFact?: string;

  dateFinishPlan?: string;

  dateStartFact?: string;

  dateStartPlan?: string;

  description?: string;

  priorityName?: string;

  priorityCode?: number;

  sumHoursFact?: number;

  sumHoursPlan?: number;

  typeName?: string;

  typeCode?: number;

  comments?: ICommentListItem[]

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.state = new StateBaseStore()
  }

  async fetchComments() {
    const response = await CommentsService.getComments({ taskId: this.id })
    this.comments = response
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
          this.assigneeName = response.assignee;
          this.assigneeId = response.assigneeId;
          this.authorId = response.authorId;
          this.authorName = response.author;
          this.dateFinishFact = response.dateFinishFact;
          this.dateFinishPlan = response.dateFinishPlan;
          this.dateStartPlan = response.dateStartPlan;
          this.dateStartFact = response.dateStartFact;
          this.description = response.description;
          this.priorityName = response.priority;
          this.priorityCode = response.priorityCode;
          this.supervizorId = response.supervizorId;
          this.supervizorName = response.supervizor;
          this.typeCode = response.typeCode;
          this.typeName = response.type;
          this.projectId = response.projectId;
          this.projectName = response.project;
          this.statusCode = response.statusCode;
          this.statusName = response.status;
          this.sumHoursFact = response.sumHoursFact;
          this.sumHoursPlan = response.sumHoursPlan;
          this.state = new SuccessStateStore();
        })
      }
      this.state = new SuccessStateStore()
      this.fetchComments()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  async delete() {
    if (this.id) {
      await TicketsService.delete(this.id)
    }
  }

  get dateStartPlanFormatted(): Dayjs | undefined {
    return this.dateStartPlan ? dayjs(this.dateStartPlan) : undefined
  }

  get dateStartFactFormatted(): Dayjs | undefined {
    return this.dateStartFact ? dayjs(this.dateStartFact) : undefined
  }

  get dateFinishPlanFormatted(): Dayjs | undefined {
    return this.dateFinishPlan ? dayjs(this.dateFinishPlan) : undefined
  }

  get dateFinishFactFormatted(): Dayjs | undefined {
    return this.dateFinishFact ? dayjs(this.dateFinishFact) : undefined
  }
}