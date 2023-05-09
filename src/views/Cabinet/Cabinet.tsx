import React from 'react';
import './styles.css';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react';
import { Button, Form, Input } from 'antd';

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

  const deleteAccountHandler = () => {
    window.confirm('Точно?')
  }

  const editPersonalInfoHandler = (values: IInfoRorm) => {
    console.log(values)
  }

  return (
    <div className="Cabinet">
      <div className="Cabinet__toolbar">
        <Button onClick={logoutHandler}>Выйти</Button>
        
        <Button onClick={deleteAccountHandler}>Удалить аккаунт</Button>
      </div>
      <div className="Cabinet__info">
        <h3>Персональные данные</h3>
        <Form 
          className="Cabinet__infoForm" 
          layout='vertical'
          onFinish={editPersonalInfoHandler}
          initialValues={{
            firstName: '',
            secondName: '',
            thirdName: ''
          }}
        >
          <Form.Item label="Фамилия" name="secondName">
            <Input />
          </Form.Item>
          <Form.Item label="Имя" name="firstname">
            <Input />
          </Form.Item>
          <Form.Item label="Отчество" name="thirdName">
            <Input />
          </Form.Item>

          <Button htmlType='submit'>Сохранить персональные данные</Button>
        </Form>
      </div>
      <div className="Cabinet__systemInfo">
        <h3>Системная информация</h3>
        <Form layout='vertical'>
          <Form.Item label="Логин" className="Cabinet__systemInfoRow">
            <Input /><Button>Изменить логин</Button>
          </Form.Item>
          <Form.Item label="Пароль" className="Cabinet__systemInfoRow">
            <Input /> <Button>Изменить пароль</Button>
          </Form.Item>
          <Form.Item label="Email" className="Cabinet__systemInfoRow">
            <Input /> <Button>Изменить email</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default observer(Cabinet)