import React, { useEffect, useState } from 'react';
import './styles.css';
import { Button, Form, Input } from 'antd';
import RegistrationService from '../../services/RegistrationServices';
import { setRefreshTokenToLocalStorage, setTokenToLocalStorage } from '../../services/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useStores } from '../../hooks/useStores';

interface ILoginForm {
  login?: string,
  password?: string,
  firstName?: string,
  email?: string
}

const Login: React.FC = () => {
  const [localError, setLocalError] = useState<string>()
  const {authStore} = useStores();

  const navigate = useNavigate();

  useEffect(() => {
    if(authStore.token){
      navigate('/')
    }
  }, [])

  const handleSubmit = async (params: Required<ILoginForm>): Promise<void> => {
    setLocalError(undefined)
    try{
      const response = await RegistrationService.login({
        login: params.login,
        password: params.password,
        firstName: params.firstName,
        email: params.email
      })
      setTokenToLocalStorage(response.token)
      setRefreshTokenToLocalStorage(response.refreshToken)
      navigate('/')
    }catch{
      setLocalError('Произошла ошибка подключения')
    }
  }

  return (
    <div className="Login">
      <div className="Login__container">
        <Form 
          name="login"
          initialValues={{
            login: undefined, 
            password: undefined, 
            firstName: undefined,
            email: undefined
          }}
          onFinish={handleSubmit}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item 
            name="login" 
            label="Логин"
            rules={[{required: true, message: 'Пожалуйста введите логин!'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="password" 
            label="Пароль" 
            rules={[{required: true, message: 'Пожалуйста введите пароль!'}]}
          >
            <Input.Password />
          </Form.Item>
          <Button className="Login__submit" htmlType='submit'>Войти</Button>
        </Form>
        <div className="Login__linkContainer">
          <Link className="Login__link" to="/register">зарегистрироваться</Link>
        </div>
        {localError}
      </div>
    </div>
  )
}

export default Login;