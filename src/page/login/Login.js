import React, { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
//import useReactRouter from 'use-react-router';
import { Form, Icon, Button, Card } from 'antd';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthentationContext } from '../../provider/AuthentationProvider';
import { loginMutationType } from '../../graphql/user-graphql';
import { TextInput } from '../../components/input/';
import './login.css';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Lütfen email adresi giriniz!')
    .required('Email alanı boş olamaz'),
  password: yup.string().required('Şifre alanı boş olamaz')
});

const Login = props => {
  const [login] = useMutation(loginMutationType);
  const userInfo = useContext(AuthentationContext);
  return (
    <Card style={{ width: 300, maxWidth: 300, marginLeft: 'auto', marginRight: 'auto' }}>
      <Formik
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          try {
            const res = await login({ variables: { email, password } });
            console.log(res);
            if (res.data) {
              userInfo.login(res.data.login);
            }
          } catch (e) {
            alert(e);
            console.log(e);
          }
          setSubmitting(false);
        }}
        initialValues={{ email: undefined, password: undefined }}
        validationSchema={validationSchema}
        isInitialValid={false}
        render={props => {
          return (
            <Form layout="horizontal" onSubmit={props.handleSubmit}>
              <TextInput {...props} name="email" label="E-mail" hiddenLabel prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              <TextInput
                {...props}
                name="password"
                label="Şifre"
                hiddenLabel
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
              />
              <Button type="primary" htmlType="submit" className="login-form-button">
                Giriş
              </Button>
            </Form>
          );
        }}
      />
    </Card>
  );
};

export default Login;
