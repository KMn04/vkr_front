

export interface ICommentListItem {
    commentId: string;
    authorName: string;
    commentText: string;
    createdAt: string;
    updatedAt: string
}

export interface ICreateCommentForm {
    content?: string;
}


export interface ICreateCommentRequest {
    comment?: string;
    taskId: number
}

export interface IGetCommentsParams {
    taskId?: number;
}