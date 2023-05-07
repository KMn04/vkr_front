import type { ICommentListItem, IComment, ICreateCommentRequest } from '../types/Comments';
import { ApiConnection } from './ApiConnection';

class CommentsService {
    static get RoutePrefix(): string {
        return 'Comment';
    }

    static async getComment(id: number): Promise<IComment> {
        const response = await ApiConnection.get(this.RoutePrefix + '/' + id);
        return response.data;
    }

    /**
     * Получение проектов с бэка
     */
    static async getComments(): Promise<ICommentListItem[]> {
        const response = await ApiConnection.get(this.RoutePrefix);
        return response.data;
    }

    static async create(request: ICreateCommentRequest): Promise<{ id: number }> {
        try {
            const response = await ApiConnection.post(this.RoutePrefix + '/create', request)
            return response.data;
        } catch {
            return {
                id: 5
            }
        }
    }
}

export default CommentsService;