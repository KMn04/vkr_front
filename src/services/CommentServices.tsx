import type { ICommentListItem, ICreateCommentRequest, IGetCommentsParams } from '../types/Comments';
import { ApiConnection } from './ApiConnection';

class CommentsService {
    static get RoutePrefix(): string {
        return 'comments';
    }

    /**
     * Получение проектов с бэка
     */
    static async getComments(params: IGetCommentsParams): Promise<ICommentListItem[]> {
        const response = await ApiConnection.get(this.RoutePrefix, {params: params});
        return response.data;
    }

    static async create(request: ICreateCommentRequest): Promise<{ id: number }> {
        const response = await ApiConnection.post(this.RoutePrefix, request)
        return response.data;
    }
}

export default CommentsService;