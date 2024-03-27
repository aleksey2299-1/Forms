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
import CardBlock from "../../components/CardBlock/CardBlock";
import { TFormFill } from "./types/types";
import { useLoaderData, useLocation } from "react-router-dom";
import { postFilledForm } from "../../utils/api/FormApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectFilledForms } from "../../store/reducers/filledForms/filledFormsSlice";
import RequestModal from "../../utils/RequestModal";

const FormForFill: React.FC<any> = () => {
  const methods = useForm();
  const activeForm: TFormFill = useLoaderData() as TFormFill;
  const [form, setForm]: [TFormFill | undefined, Function] = useState();
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useAppDispatch();
  const { forms } = useAppSelector(selectFilledForms);
  const location = useLocation();

  console.log(form);

  useEffect(() => {
    if (location.pathname === "/") {
      Object.keys(activeForm).forEach((fieldName) => {
        methods.setValue(fieldName, activeForm[fieldName as keyof TFormFill]);
      });
      setForm(activeForm);
    } else if (location.state?.type === "sub2") {
      const filledForm = forms.find((item) => item.id === location.state.key);
      if (filledForm) {
        methods.reset();
        Object.keys(filledForm).forEach((fieldName) => {
          methods.setValue(fieldName, filledForm[fieldName as keyof TFormFill]);
        });
        setForm(filledForm);
      }
    }
  }, [activeForm, location]);

  const handleSubmitClick = () => {
    console.log(methods.getValues());
  };

  const onSubmit = (data: FieldValues) => {
    data["parent"] = data["id"];
    dispatch(postFilledForm(data));
    setIsRequested(true);
  };

  if (isRequested) {
    return <RequestModal isOpen={isRequested} setIsOpen={setIsRequested} />;
  }

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
                onClick={handleSubmitClick}
              />
            )}
          </form>
        </FormProvider>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default FormForFill;
