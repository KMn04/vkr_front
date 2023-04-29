import { Button, Form, Input } from "antd"
import { useState } from "react"
import ProjectsService from "../../services/ProjectsServices"
import { ICreateProjectForm } from "../../types/Projects"
import './styles.css'

export interface CreateProjectProps {
  onClose?: () => void
}

const CreateProject: React.FC<CreateProjectProps> = ({onClose}) => {

  const [localError, setLocalError] = useState<string>()
  const handleSubmit = async (params: Required<ICreateProjectForm>) => {
    setLocalError(undefined)
    try{
      await ProjectsService.create({
        title: params.title,
        description: params.description
      })
      if(onClose){
        onClose()
      }
    }catch{
      setLocalError('Произошла ошибка подключения')
    }
  }

  return (
    <div className="CreateProject">
      <Form 
        initialValues={{
          title: undefined,
          description: undefined
        }}
        onFinish={handleSubmit}
        autoComplete="off"
        name="createProjectForm"
        layout='vertical'
      >
          <Form.Item 
            name="title" 
            label="Название" 
            rules={[{
              required: true, 
              message: "Пожалуйста введите название проекта"
            }]}
          >
              <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
          >
            <Input />
          </Form.Item>
          <Button 
            htmlType="submit" 
            className="CreateProject__submit"
          >
            Создать
          </Button>
        </Form>
        {localError}
    </div>
  )
}

export default CreateProject