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

  supervisorName?: string;

  supervisorId?: number;

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
          this.supervisorId = response.supervisorId;
          this.supervisorName = response.supervisor;
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

  async update() {
    if (this.id) {
      await TicketsService.update(this.id, {
        assigneeId: this.assigneeId,
        authorId: this.authorId,
        dateFinishFact: this.dateFinishFact,
        dateFinishPlan: this.dateFinishPlan,
        dateStartPlan: this.dateStartPlan,
        dateStartFact: this.dateStartFact,
        description: this.description,
        priorityCode: this.priorityCode,
        supervisorId: this.supervisorId,
        typeCode: this.typeCode,
        statusCode: this.statusCode,
        sumHoursFact: this.sumHoursFact,
        sumHoursPlan: this.sumHoursPlan
      })
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