

export interface ICommentListItem {
    commentId: string;
    authorName: string;
    commentText: string;
    createdAt: string;
    updatedAt: string
}

export interface ICreateCommentForm {
    content?: string;
    pageId?: string
}


export interface ICreateCommentRequest {
    comment?: string;
    taskId: number;
    pageId?: string;
}

export interface IGetCommentsParams {
    taskId?: number;
}