import { CheckOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Layout } from 'antd';

import { useEffect, useState } from 'react';
import { Controller, FieldValues, FormProvider, useForm } from 'react-hook-form';

import { useLoaderData, useLocation } from 'react-router-dom';

import CardBlock from '@components/CardBlock/CardBlock';
import RequestModal from '@components/RequestModal/RequestModal';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectFilledForms } from '@store/reducers/filledForms/filledFormsSlice';
import { postFilledForm } from '@utils/api/FormApi';

import styles from './FormForFill.module.scss';
import { TFormFill } from './types/types';


const FormForFill: React.FC = () => {
  const methods = useForm();
  const activeForm: TFormFill = useLoaderData() as TFormFill;
  const [form, setForm] = useState<TFormFill | undefined>();
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useAppDispatch();
  const { forms } = useAppSelector(selectFilledForms);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      Object.keys(activeForm).forEach((fieldName) => {
        methods.setValue(fieldName, activeForm[fieldName as keyof TFormFill]);
      });
      setForm(activeForm);
    } else if (location.state?.type === 'sub2') {
      const filledForm = forms.find((item) => item.id === location.state.key);
      if (filledForm) {
        methods.reset();
        Object.keys(filledForm).forEach((fieldName) => {
          methods.setValue(fieldName, filledForm[fieldName as keyof TFormFill]);
        });
        setForm(filledForm);
      }
    }
  }, [activeForm, location, forms, methods]);

  const handleSubmitClick = () => {
    console.log(methods.getValues());
  };

  const onSubmit = (data: FieldValues) => {
    data['parent'] = data['id'];
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
          colorTextDisabled: '#000000',
          colorBgContainerDisabled: '',
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
                render={() => <CardBlock index={index} id={item.id.toString()} />}
              />
            ))}
            {location?.state?.type !== 'sub2' && (
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
