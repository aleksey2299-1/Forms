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
import { useLocation } from "react-router-dom";
import { fetchSingleEditFormData } from "../../utils/api/FormApi";
import { TFormFill } from "../../pages/FormForFill/types/types";

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
  const location = useLocation();
  // const [form, setForm] = useState()
  const [data, setData]: [FieldValues | undefined, Function] = useState();

  // Нужно для правильного Drag and Drop
  useEffect(() => {
    methods.setValue("fields", fields);
  }, [fields]);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state?.key) {
        try {
          if (location.state.type === "sub1") {
            const form = await fetchSingleEditFormData(location.state.key);
            if (form) {
              Object.keys(form).forEach((fieldName) => {
                // @ts-ignore
                methods.setValue(fieldName, form[fieldName as keyof TFormFill]);
              });
            }
          }
        } catch (error) {
          console.error("Error fetching form data:", error);
        }
      } else {
        methods.reset();
      }
    };
    fetchData();
  }, [location]);

  const onSubmit = (data: FieldValues) => {
    // Выставляем индексы для зависимостей, чтобы на бэке не было ошибок
    data.questions.forEach((e: TQuestion, index: number) => {
      if (e.depends && e.depends.question && e.depends.option) {
        data.questions[index].depends.question = data.questions.findIndex(
          (elem: TQuestion) => elem.id === e.depends?.question
        );
      } else {
        delete data.questions[index]["depends"];
      }
    });
    console.log(data);
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
