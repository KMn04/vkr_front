import { Button, Form, Input, Select } from "antd"
import CommentsService from "../../services/CommentServices"
import { ICommentListItem, ICreateCommentForm } from "../../types/Comments"
import './styles.css'
import dayjs from "dayjs"
import { useForm } from "antd/es/form/Form"
import { useStores } from "../../hooks/useStores"
import { observer } from "mobx-react"


export interface CommentProps {
    ticketId?: number;
    comment?: ICommentListItem;
    onUpdate?: () => void;
}

const Comment: React.FC<CommentProps> = ({ticketId, comment, onUpdate}) => {
    const {projectWikiStore} = useStores()
    const [form] = useForm<Required<ICreateCommentForm>>();

    const handleSubmit = async (params: Required<ICreateCommentForm>) => { 
        if(!ticketId){
          return;  
        }
        await CommentsService.create({
            comment: params.content, // текст коммента
            taskId: ticketId,
            pageId: params.pageId
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
                    content: '',
                    pageId: undefined
                }}
                onFinish={handleSubmit}
                autoComplete="off"
                name="createComment"
                layout='vertical'
            >   
                {Boolean(projectWikiStore.pages.length) && 
                <Form.Item name="pageId" label="Страница БЗ">
                    <Select options={projectWikiStore.options} />
                </Form.Item>}
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

export default observer(Comment)