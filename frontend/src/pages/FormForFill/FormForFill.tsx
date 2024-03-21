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
import { useLoaderData, useLocation } from "react-router-dom";
import {
  fetchSingleFilledFormData,
  postFilledFormData,
} from "../../utils/api/FormApi";

const FormForFill: React.FC<any> = () => {
  const methods = useForm();
  const activeForm: TFormFill = useLoaderData() as TFormFill;
  const [form, setForm]: [TFormFill | undefined, Function] = useState();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (location.state.key) {
        try {
          if (location.state.type === "sub2") {
            const fetchedForm = await fetchSingleFilledFormData(
              location.state.key
            );
            if (fetchedForm) {
              Object.keys(fetchedForm).forEach((fieldName) => {
                methods.setValue(
                  fieldName,
                  fetchedForm[fieldName as keyof TFormFill]
                );
              });
              setForm(fetchedForm);
            }
          }
        } catch (error) {
          console.error("Error fetching form data:", error);
        }
      }
    };
    if (location.pathname === "/") {
      Object.keys(activeForm).forEach((fieldName) => {
        methods.setValue(fieldName, activeForm[fieldName as keyof TFormFill]);
      });
      setForm(activeForm);
    } else if (location.state?.type === "sub2") {
      fetchData();
    }
  }, [activeForm, location]);

  const onSubmit = (data: FieldValues) => {
    data["parent"] = data["id"];
    postFilledFormData(data);
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
            {location?.state?.type !== "sub2" && (
              <Button
                htmlType="submit"
                shape="circle"
                icon={<CheckOutlined />}
              />
            )}
          </form>
        </FormProvider>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default FormForFill;
