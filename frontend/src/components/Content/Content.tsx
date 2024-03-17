import { Button, Layout } from "antd";
import styles from "./Content.module.scss";
import CardBlock from "../CardBlock/CardBlock";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import ButtonsBlock from "../ButtonsBlock/ButtonsBlock";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect } from "react";

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
    },
  });
  const { fields, append, remove, insert, move } = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  useEffect(() => {
    methods.setValue("fields", fields);
  }, [fields]);

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <Layout.Content className={styles.content}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CardBlock isTitle={true} />
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
