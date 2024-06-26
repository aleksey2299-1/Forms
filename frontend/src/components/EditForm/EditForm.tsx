

import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Controller, FieldValues, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { useLocation } from 'react-router-dom';

import AppModal from '@components/AppModal/AppModal';
import ButtonsBlock from '@components/ButtonsBlock/ButtonsBlock';
import CardBlock from '@components/CardBlock/CardBlock';
import { TQuestion } from '@components/Question/types/types';
import RequestModal from '@components/RequestModal/RequestModal';
import { useAppSelector } from '@store/hooks';
import { selectForms } from '@store/reducers/forms/formsSlice';
import CardContext from '@utils/context/card-context';

import styles from './EditForm.module.scss';
import { TForm } from './types/types';

const EditForm: React.FC = () => {
  const { form, forms, isLoading } = useAppSelector(selectForms);
  const location = useLocation();
  const methods = useForm({
    defaultValues: form,
  });
  const { fields, remove, insert, move } = useFieldArray({
    control: methods.control,
    name: 'questions',
  });
  const [open, setOpen] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [data, setData] = useState<undefined | FieldValues>();
  const [element, setElement] = useState({ index: 0, elementId: '' });

  // TODO выглядит как костыль, нужно разобраться
  // Нужно для правильного Drag and Drop
  useEffect(() => {
    // @ts-expect-error такого названия нет, мы его создаем тут
    methods.setValue('fields', fields);
  }, [fields, methods]);

  useEffect(() => {
    if (location.state?.key) {
      if (location.state.type === 'sub1') {
        const form = forms.find((item) => item.id === location.state.key);
        if (form) {
          Object.keys(form).forEach((fieldName) => {
            // @ts-expect-error не получается правильно типизировать
            methods.setValue(fieldName, form[fieldName]);
          });
        }
      }
    }
  }, [location, methods, forms]);

  const onSubmit = (data: FieldValues) => {
    // Выставляем индексы для зависимостей, чтобы на бэке не было ошибок
    data.questions.forEach((e: TQuestion, index: number) => {
      if (e.depends && e.depends.question && e.depends.option) {
        data.questions[index].depends.question = data.questions.findIndex(
          (elem: TQuestion) => elem.id === e.depends?.question
        );
      } else {
        delete data.questions[index]['depends'];
      }
    });
    setData(data);
    setOpen(true);
  };

  if (isRequested) {
    return <RequestModal isOpen={isRequested} setIsOpen={setIsRequested} />;
  }

  if (isLoading) {
    return (
      <Layout.Content className={styles.content} style={{ alignItems: 'center' }}>
        <Spin
          tip="Loading..."
          indicator={
            <LoadingOutlined style={{ fontSize: 40, marginLeft: 7, marginTop: -40 }} spin />
          }
        >
          <div className="content" />
        </Spin>
      </Layout.Content>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout.Content className={styles.content}>
        <FormProvider {...methods}>
          <CardContext.Provider value={element}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <CardBlock
                isTitle={true}
                isEditable={true}
                onClick={(e: React.PointerEvent<HTMLDivElement>) =>
                  setElement({ index: 0, elementId: e.currentTarget.id })
                }
              />
              {fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`questions`}
                  control={methods.control}
                  render={() => (
                    <CardBlock
                      onDelete={() => {
                        remove(index);
                        setElement({
                          index: index,
                          elementId: index != 0 ? fields[index - 1].id : '',
                        });
                      }}
                      index={index}
                      id={item.id}
                      onCopy={insert}
                      onMove={move}
                      isEditable={true}
                      onClick={(e: React.PointerEvent<HTMLDivElement>) =>
                        setElement({
                          index: index + 1,
                          elementId: e.currentTarget.id,
                        })
                      }
                    />
                  )}
                />
              ))}
              <Button
                htmlType="submit"
                shape="circle"
                icon={<CheckOutlined />}
                style={{ marginBottom: 20 }}
              />
              <AppModal
                title="Choose option"
                isOpen={open}
                data={data as TForm}
                onClose={setOpen}
                setIsRequested={setIsRequested}
              />
            </form>
            <ButtonsBlock onAdd={insert} />
          </CardContext.Provider>
        </FormProvider>
      </Layout.Content>
    </DndProvider>
  );
};

export default EditForm;
