import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import ProjectsService from '../../services/ProjectsServices'

interface CreateWikiPageProps {
  onSuccess: () => void,
  onClose: () => void,
  projectId: number
}

const CreateWikiPage: React.FC<CreateWikiPageProps> = ({onClose, projectId, onSuccess}) => {
  const [localError, setLocalError] = useState<string>()
  const handleSubmit = async (params: Required<{title: string}>) => {
    setLocalError(undefined)
    try{
      await ProjectsService.createWikiPage(projectId, {
        title: params.title
      })
      if(onSuccess){
        onSuccess()
      }
      onClose()
    }catch{
      setLocalError('Произошла ошибка подключения')
    }
  }
  
  return (
    <div>
      <Form 
        initialValues={{
          title: undefined,
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
            message: "Пожалуйста введите название страницы"
          }]}
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

export default CreateWikiPage