import type { ICommentListItem, IComment, ICreateCommentForm, ICreateCommentRequest } from '../types/Comments';
import { ApiConnection } from './ApiConnection';

class CommentService {
    static get RoutePrefix(): string {
        return 'Comment';
    }

    static async getComment(id: number): Promise<IComment> {
        try {
            const response = await ApiConnection.get(this.RoutePrefix + '/' + id);
            return response.data;
        } catch {
            return mockProject; // шо тут
        }
    }

    /**
     * Получение проектов с бэка
     */
    static async getComments(): Promise<ICommentListItem[]> {
        try {
            const response = await ApiConnection.get(this.RoutePrefix);

            return response.data;
        } catch {
            return mockProjects // шо тут
        }
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


export default CommentService;