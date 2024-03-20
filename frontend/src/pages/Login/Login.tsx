import { Button, Card, Flex, Input, Layout, Typography } from "antd";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { fetchTokenData } from "../../utils/api/AuthApi";
import { TUser } from "./types/types";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC<any> = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const response = await fetchTokenData(data as TUser);
    if (response) {
      navigate("/edit");
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Flex
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: "50vh",
                display: "flex",
                justifyContent: "center",
                borderColor: "#000000",
              }}
            >
              <Typography.Text>Username:</Typography.Text>
              <br />
              <Controller
                name="username"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    style={{ width: "100%", marginBottom: 10 }}
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
                    style={{ width: "100%", marginBottom: 10 }}
                    placeholder="Password"
                    {...field}
                  />
                )}
              />
              <br />
              <Button
                htmlType="submit"
                style={{ display: "flex", justifyContent: "center" }}
              >
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
