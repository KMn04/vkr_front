import type { ICommentListItem, ICreateCommentRequest, IGetCommentsParams } from '../types/Comments';
import { ApiConnection } from './ApiConnection';

class CommentsService {
    static get RoutePrefix(): string {
        return 'tasks';
    }

    /**
     * Получение проектов с бэка
     */
    static async getComments(params: IGetCommentsParams): Promise<ICommentListItem[]> {
        const response = await ApiConnection.get(`${this.RoutePrefix}/${params.taskId}/comments`);
        return response.data;
    }

    static async create(request: ICreateCommentRequest): Promise<{ id: number }> {
        const response = await ApiConnection.post(`${this.RoutePrefix}/${request.taskId}/comments`, request)
        return response.data;
    }
}

export default CommentsService;