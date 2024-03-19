import { Button, ConfigProvider, Layout } from "antd";
import styles from "./FormForFill.module.scss";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CardBlock from "../../components/CardBlock/CardBlock";
import { TFormFill } from "./types/types";

const FormForFill: React.FC<any> = () => {
  const methods = useForm();
  const [form, setForm]: [TFormFill | undefined, Function] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/forms/?active=true")
      .then((response) => {
        const data = { ...response.data[0] };
        setForm(data);
        Object.keys(data).forEach((fieldName) => {
          methods.setValue(fieldName, data[fieldName]);
        });
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных на сервер:", error);
      });
  }, [methods, setForm]);

  console.log(form);

  const onSubmit = (data: FieldValues) => {
    data["parent"] = data["id"];
    console.log(data);
    axios
      .post("http://localhost:8000/api/v1/filled-forms/", data)
      .then((response) => {
        console.log("Успешный ответ от сервера:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных на сервер:", error);
      });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextDisabled: "#000000",
          colorBgContainerDisabled: "",
        },
      }}
    >
      <Layout.Content className={styles.content}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CardBlock isTitle={true} />
            {form?.questions.map((item, index) => (
              <Controller
                key={item.id}
                name={`questions`}
                control={methods.control}
                render={() => <CardBlock index={index} id={item.id} />}
              />
            ))}
            <Button htmlType="submit" shape="circle" icon={<CheckOutlined />} />
          </form>
        </FormProvider>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default FormForFill;
