import React, { useEffect } from 'react';
import './styles.css';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react';
import { Button, Form, Input, Popconfirm } from 'antd';
import { setRefreshTokenToLocalStorage, setTokenToLocalStorage } from '../../services/utils';

interface IInfoRorm {
  firstName: string,
  secondName: string,
  thirdname: string
}

const Cabinet: React.FC = () => {
  const {authStore} = useStores();

  const logoutHandler = () => {
    authStore.logout();
  }

  const onDeleteClickHandle = async () => {
    await authStore.delete();
    setTokenToLocalStorage();
    setRefreshTokenToLocalStorage();
    location.reload();
  }

  const editPersonalInfoHandler = async (values: IInfoRorm) => {
    await authStore.update();
    authStore.fetch();
  }

  useEffect(() => {
    authStore.fetch()
  }, [])

  return (
    <div className="Cabinet">
      <div className="Cabinet__toolbar">
        <Button onClick={logoutHandler}>Выйти</Button>
        <Popconfirm
          title="Удалить?"
          description="Вы действительно хотите удалить учетную запись?"
          onConfirm={onDeleteClickHandle}
          okText="Да"
          cancelText="Нет"
        >
          <Button>Удалить аккаунт</Button>
        </Popconfirm>
      </div>
      <div className="Cabinet__info">
        <h3>Персональные данные</h3>
        <Form 
          className="Cabinet__infoForm" 
          layout='vertical'
          onFinish={editPersonalInfoHandler}
        >
          <Form.Item label="Фамилия">
            <Input 
              value={authStore.secondName} 
              onChange={(e) => {
                authStore.secondName = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label="Имя">
            <Input
              value={authStore.firstName}
              onChange={(e) => {
                authStore.firstName = e.target.value
              }}
            />
          </Form.Item>
          <Form.Item label="Отчество">
            <Input 
              value={authStore.thirdName}
              onChange={(e) => {
                authStore.thirdName = e.target.value;
              }}
            />
          </Form.Item>

          <Button htmlType='submit'>Сохранить персональные данные</Button>
        </Form>
      </div>
      <div className="Cabinet__systemInfo">
        <h3>Системная информация</h3>
        <Form layout='vertical' >
          <Form.Item label="Логин" className="Cabinet__systemInfoRow">
            <Input 
              value={authStore.login} 
              onChange={(e) => {
                authStore.login = e.target.value;
              }} 
            />
          </Form.Item>
          <Form.Item label="Пароль" className="Cabinet__systemInfoRow">
            <Input  /> <Button>Изменить пароль</Button>
          </Form.Item>
          <Form.Item label="Email" className="Cabinet__systemInfoRow">
            <Input 
              value={authStore.email} 
              onChange={(e) => {authStore.email = e.target.value}}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default observer(Cabinet)