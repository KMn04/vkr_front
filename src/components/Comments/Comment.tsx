import { Button, Form, Input } from "antd"
import { useState } from "react"
import CommentsService from "../../services/CommentServices"
import { ICommentListItem, ICreateCommentForm } from "../../types/Comments"
import './styles.css'
import dayjs from "dayjs"
import { useForm } from "antd/es/form/Form"


export interface CommentProps {
    ticketId?: number;
    comment?: ICommentListItem;
    onUpdate?: () => void;
}

const Comment: React.FC<CommentProps> = ({ticketId, comment, onUpdate}) => {
    const [form] = useForm<Required<ICreateCommentForm>>();

    const handleSubmit = async (params: Required<ICreateCommentForm>) => { 
        if(!ticketId){
          return;  
        }
        await CommentsService.create({
            comment: params.content, // текст коммента
            taskId: ticketId
        })
        form.resetFields()
        if(onUpdate){
            onUpdate()
        }
    }

    if(comment){
        return (
            <div className="Comment__container">
                <div className="Comment__title">
                    <span className="Comment__author">
                        {comment.authorName}
                    </span>
                    {comment.updatedAt 
                        ? (
                            <span className="Comment__updatedDate">
                                {dayjs(comment.updatedAt).format('DD.MM.YYYY')}
                            </span>
                        )
                        : (
                            <span className="Comment__createDate">
                                {comment.createdAt ? dayjs(comment.createdAt).format('DD.MM.YYYY') : '-'}
                            </span>
                        )}
                </div>
                <div>
                    {comment.commentText}
                </div>
            </div>
        )
    }

    return (
        <div className="Comment Comment__createForm">
            <Form
                form={form}
                initialValues={{
                    content: ''
                }}
                onFinish={handleSubmit}
                autoComplete="off"
                name="createComment"
                layout='vertical'
            >
                <Form.Item
                    name="content"
                    label="Новый комментарий"
                >
                    <Input />
                </Form.Item>
                <Button
                    htmlType="submit"
                    className="Comment__submit"
                >
                    Отправить
                </Button>
            </Form>
        </div>
    )
}

export default Comment