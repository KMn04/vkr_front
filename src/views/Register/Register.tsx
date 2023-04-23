import React, { useState } from 'react';
import './styles.css';
import { Button, Form, Input } from 'antd';
import RegistrationService from '../../services/RegistrationServices';
import { setTokenToLocalStorage } from '../../services/utils';
import { Link, useNavigate } from 'react-router-dom';

interface IRegistrationForm {
  login?: string,
  password?: string,
  confirmPassword?: string,
}

const Register: React.FC = () => {
  const [localError, setLocalError] = useState<string>()
  const navigate = useNavigate();
  
  const handleSubmit = async (params: Required<IRegistrationForm>) => {
    setLocalError(undefined)
    console.log('sdfsdfsdf')
    try{
      const response = await RegistrationService.registration({
        login: params.login, 
        password: params.password
      })
      setTokenToLocalStorage(response.token)
      navigate('/')
    }catch{
      setLocalError('Произошла ошибка подключения')
    }
  }

  return (
    <div className="Register">
      <div className="Register__container">
        <Form 
          name="registration"
          initialValues={{
            login: undefined, 
            password: undefined, 
            confirmPassword: undefined
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
          <Form.Item 
            name="confirmPassword" 
            label="Повторите пароль" 
            dependencies={['password']}
            rules={[
              {
                required: true, 
                message: 'Пожалуйста введите проверочный пароль!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button className="Register__submit" htmlType='submit'>Регистрация</Button>
        </Form>
        <div className="Register__linkContainer">
          <Link className="Register__link" to="/login">Войти</Link>
        </div>
        {localError}
      </div>
    </div>
  )
}

export default Register;