import { Button, Layout } from "antd";
import styles from "./FormForFill.module.scss";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CardBlock from "../components/CardBlock/CardBlock";
import { TForm } from "../components/Content/types/types";

const FormForFill: React.FC<any> = () => {
  const methods = useForm();
  const [form, setForm] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/forms/1/")
      .then((response) => {
        console.log(response.data);
        setForm(response.data);
        Object.keys(response.data).forEach((fieldName) => {
          methods.setValue(fieldName, response.data[fieldName]);
        });
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных на сервер:", error);
      });
  }, [methods, setForm]);

  console.log(methods.getValues());

  const onSubmit = (data: TForm) => {
    axios
      .post("http://localhost:8000/api/v1/forms/", data)
      .then((response) => {
        console.log("Успешный ответ от сервера:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных на сервер:", error);
      });
  };

  return (
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
  );
};

export default FormForFill;
