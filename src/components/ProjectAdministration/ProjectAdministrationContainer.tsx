import { Button, Form, Input, Popconfirm, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../hooks/useStores';
import './styles.css'
import TextArea from 'antd/es/input/TextArea';
import { IProjectUpdate } from '../../types/Projects';
import { observer } from 'mobx-react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ProjectAdministrationContainer: React.FC = () => {
  const {projectStore, rolesStore, usersStore} = useStores();
  const navigate = useNavigate()

  useEffect(() => {
    usersStore.fetch()
  }, [])

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
    dataIndex: 'roleCode',
    key: 'userRoleCode',
    render: (roleCode: string, {projectTeamMemberId}: {projectTeamMemberId: number}) => {
      return (
      <Select 
        className='Admin__select' 
        value={roleCode} 
        options={rolesStore.options}
        onChange={(value) => {
          projectStore.projectMembers.changeRole(projectTeamMemberId, +value)
        }} 
      />)
    }
  }, {
    title: 'Удалить',
    dataIndex: 'projectTeamMemberId',
    key: 'action',
    render: (userId: number) => {
      return (<AiOutlineDelete onClick={() => {
        projectStore.projectMembers.deleteUser(userId)
      }} />)
    }
  }];

  const onDeleteClickHandle = async () => {
    await projectStore.delete();
    navigate('/projects')
  }

  const [tempNewUser, setNewUser] = useState<number>()

  const addNewUserHandler = async () => {
    if(tempNewUser){
      await projectStore.addUser(tempNewUser)
      projectStore.projectMembers.fetch();
      setNewUser(undefined)
    }
  }

  const filteredUsers = usersStore.options.filter(user => {
    return !projectStore.projectMembers.membersIds.includes(user.value)
  })

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
        <Select 
          options={filteredUsers} 
          value={tempNewUser} 
          onChange={(value) => {
            setNewUser(value)
          }}
        />
        <Button className="ProjectAdministration__addUser" onClick={addNewUserHandler}>
            Добавить пользователя
        </Button>
        <Table columns={columns} dataSource={projectStore.projectMembers.preparedMembers}/>
      </div>
      <Popconfirm
        title="Удалить?"
        description="Вы действительно хотите удалить проект?"
        onConfirm={onDeleteClickHandle}
        okText="Да"
        cancelText="Нет"
      >
        <Button>Удалить проект</Button>
      </Popconfirm>
    </div>
  )
}

export default observer(ProjectAdministrationContainer)