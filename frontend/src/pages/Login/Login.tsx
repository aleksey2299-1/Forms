import { Button, Card, Flex, Input, Layout, Typography } from 'antd';
import { Controller, FieldValues, FormProvider, useForm } from 'react-hook-form';
import { fetchTokenData } from '../../utils/api/AuthApi';
import { TUser } from './types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage: React.FC = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const [isIncorrect, setIsIncorrect] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const isLogged = await fetchTokenData(data as TUser);
    setIsIncorrect(!isLogged);
    if (isLogged) {
      navigate('/forms');
    }
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Flex
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              style={{
                width: '50vh',
                display: 'flex',
                justifyContent: 'center',
                borderColor: '#000000',
              }}
            >
              {isIncorrect && (
                <>
                  <Typography.Text type="danger">Incorrect username or password</Typography.Text>
                  <br />
                  <br />
                </>
              )}
              <Typography.Text>Username:</Typography.Text>
              <br />
              <Controller
                name="username"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    style={{ width: '100%', marginBottom: 10 }}
                    placeholder="Username"
                    {...field}
                  />
                )}
              />
              <br />
              <Typography.Text>Password:</Typography.Text>
              <br />
              <Controller
                name="password"
                control={methods.control}
                render={({ field }) => (
                  <Input.Password
                    style={{ width: '100%', marginBottom: 10 }}
                    placeholder="Password"
                    {...field}
                  />
                )}
              />
              <br />
              <Button htmlType="submit" style={{ display: 'flex', justifyContent: 'center' }}>
                Login
              </Button>
            </Card>
          </Flex>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default LoginPage;
