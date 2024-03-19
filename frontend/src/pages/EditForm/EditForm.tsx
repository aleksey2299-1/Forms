import { Button, Layout } from "antd";
import styles from "./EditForm.module.scss";
import CardBlock from "../../components/CardBlock/CardBlock";
import {
  Controller,
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import ButtonsBlock from "../../components/ButtonsBlock/ButtonsBlock";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TQuestion } from "../../components/Question/types/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppModal from "../../utils/AppModal";

const EditForm: React.FC<any> = () => {
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
  const [open, setOpen] = useState(false);
  const [data, setData]: [FieldValues | undefined, Function] = useState();

  // Нужно для правильного Drag and Drop
  useEffect(() => {
    methods.setValue("fields", fields);
  }, [fields]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    delete data["fields"];
    // Выставляем индексы для зависимостей, чтобы на бэке не было ошибок
    data.questions.forEach((e: TQuestion, index: number) => {
      if (e.depends && e.depends.question && e.depends.option) {
        data.questions[index].depends.question =
          fields.findIndex((elem) => elem.id === e.depends?.question) - 1;
      } else {
        delete data.questions[index]["depends"];
      }
      delete data.questions[index]["id"];
    });
    setData(data);
    setOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
            <AppModal
              title="Choose option"
              isOpen={open}
              data={data}
              onClose={setOpen}
            />
          </form>
          <ButtonsBlock onAdd={append} />
        </FormProvider>
      </Layout.Content>
    </DndProvider>
  );
};

export default EditForm;
