import { Button, Table } from 'antd';
import React from 'react';
import { useStores } from '../../hooks/useStores';
import './styles.css'

const ProjectAdministrationContainer: React.FC = () => {
  const {projectStore} = useStores();

  const columns = [{
    title: 'Пользователь',
    dataIndex: 'userName',
    key: 'userName'
  }, {
    title: 'Роль',
    dataIndex: 'userRole',
    key: 'userRole'
  }];

  return (
    <div className="ProjectAdministration">
      <div className="ProjectAdministration__toolbar">
        <div className="ProjectAdministration__title">
          Проект: {projectStore.name}
        </div>
        <Button className="ProjectAdministration__addUser">
          Добавить пользователя
        </Button>
      </div>
      <Table columns={columns} dataSource={projectStore.preparedUsers}/>
    </div>
  )
}

export default ProjectAdministrationContainer