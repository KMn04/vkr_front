import React from 'react';
import './styles.css'
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ProjectsService from '../../services/ProjectsServices';
import { useParams } from 'react-router-dom';

export interface ICreateTask {
  name: string,
  description?: string
}

interface CreateTaskProp {
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateTask: React.FC<CreateTaskProp> = ({onClose, onSuccess}) => {
  const {projectId} = useParams();

  const createHandle = async (values: ICreateTask) => {
    if(projectId){
      try{
        await ProjectsService.createTask(+projectId, values);
        if(onSuccess){
          onSuccess();
        }
        onClose();
      }catch(error){
        console.log(error);
      }
    }
  }

  return (
  <div className="CreateTask">
    <h3>Создание задачи</h3>
    <Form 
      className="CreateTask__form"
      initialValues={{
        name: '',
        description: ''
      }}
      onFinish={createHandle}
      layout='vertical'
    >
      <Form.Item name="name" label="Название">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <TextArea />
      </Form.Item>
      <Button className="CreateTask__submit" htmlType='submit'>Создать</Button>
    </Form>
  </div>);
}

export default CreateTask;