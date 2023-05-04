

export interface ICommentListItem {
    id: number;
    author: string;
    content: string;
}

export interface IComment {
    id: number;
    author: string;
    content: string;
}

export interface ICreateCommentForm {
    content?: string;
}


export interface ICreateCommentRequest {
    content?: string;
}