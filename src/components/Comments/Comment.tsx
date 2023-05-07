import { Button, Form, Input } from "antd"
import { useState } from "react"
import CommentsService from "../../services/CommentServices"
import { ICreateCommentForm } from "../../types/Comments"
import './styles.css'


export interface CommentProps {
    onClose?: () => void
}

const Comment: React.FC<CommentProps> = ({onClose}) => {

    const [localError, setLocalError] = useState<string>()
    const handleSubmit = async (params: Required<ICreateCommentForm>) => { // заменить
        setLocalError(undefined)
        try{
            await CommentsService.create({
                content: params.content // текст коммента
            })
            if(onClose){
                onClose()
            }
        }catch{
            setLocalError('Произошла ошибка подключения')
        }
    }

    return (
        <div className="Comment">
            <Form
                initialValues={{
                    content: undefined
                }}
                onFinish={handleSubmit}
                autoComplete="off"
                name="createComment"
                layout='vertical'
            >
                <Form.Item
                    name="content"
                    label="текст комментария"
                >
                    <Input />
                </Form.Item>
                <Button
                    htmlType="submit"
                    className="CreateComment__submit"
                >
                    Отправить
                </Button>
            </Form>
            {localError}
        </div>
    )
}

export default Comment