import { Button, Layout } from "antd";
import styles from "./Content.module.scss";
import CardBlock from "../CardBlock/CardBlock";
import {
  Controller,
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import ButtonsBlock from "../ButtonsBlock/ButtonsBlock";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";
import { TQuestion } from "../Question/types/types";

const Content: React.FC<any> = () => {
  const methods = useForm({
    defaultValues: {
      questions: [
        {
          name: undefined,
          answer: undefined,
          type: "Short answer",
          required: false,
        },
      ],
      fields: [{}],
    },
  });
  const { fields, append, remove, insert, move } = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  // Нужно для правильного Drag and Drop
  useEffect(() => {
    methods.setValue("fields", fields);
  }, [fields]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    delete data["fields"];
    data.questions.forEach((e: TQuestion, index: number) => {
      if (e.depends && e.depends.question && e.depends.option) {
        data.questions[index].depends.question =
          fields.findIndex((elem) => elem.id === e.depends?.question) - 1;
      } else {
        delete data.questions[index]["depends"];
      }
      delete data.questions[index]["id"];
    });
    console.log(data);
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
          <CardBlock isTitle={true} isEditable={true} />
          {fields.map((item, index) => (
            <Controller
              key={item.id}
              name={`questions`}
              control={methods.control}
              render={() => (
                <CardBlock
                  onDelete={() => remove(index)}
                  index={index}
                  id={item.id}
                  onCopy={insert}
                  onMove={move}
                  isEditable={true}
                />
              )}
            />
          ))}
          <Button htmlType="submit" shape="circle" icon={<CheckOutlined />} />
        </form>
        <ButtonsBlock onAdd={append} />
      </FormProvider>
    </Layout.Content>
  );
};

export default Content;
