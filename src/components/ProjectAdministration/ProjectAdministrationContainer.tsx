import { Button, Form, Input, Table } from 'antd';
import React from 'react';
import { useStores } from '../../hooks/useStores';
import './styles.css'
import TextArea from 'antd/es/input/TextArea';
import { IProjectUpdate } from '../../types/Projects';

const ProjectAdministrationContainer: React.FC = () => {
  const {projectStore} = useStores();

  const submitEditHandle = async (values: IProjectUpdate) => {
      try{
        await projectStore.update(values);
        projectStore.fetch()
      }catch(err){
        console.log(err)
      }
  }

  const columns = [{
    title: 'Пользователь',
    dataIndex: 'fullName',
    key: 'userName'
  }, {
    title: 'Роль',
    dataIndex: 'roleName',
    key: 'userRole'
  }];

  return (
    <div className="ProjectAdministration">
      <div className="ProjectAdministration__toolbar">
        <div className="ProjectAdministration__title">
          Проект: {projectStore.name}
        </div>
      </div>
      <Form 
        className="ProjectAdministration__editForm"
        layout='vertical' 
        onFinish={submitEditHandle}
        initialValues={{
          name: projectStore.name,
          description: projectStore.description
        }}
      >
        <Form.Item label="Название проекта" name="name">
          <Input/>
        </Form.Item>
        <Form.Item label="Описание проекта" name="description">
          <TextArea/>
        </Form.Item>
        <Button className="ProjectAdministration__submit" htmlType='submit'>Сохранить</Button>
      </Form>
      <div className="ProjectAdministration__tasks">
        <Button className="ProjectAdministration__addUser">
            Добавить пользователя
          </Button>
        <Table columns={columns} dataSource={projectStore.projectMembers.preparedMembers}/>
      </div>
    </div>
  )
}

export default ProjectAdministrationContainer