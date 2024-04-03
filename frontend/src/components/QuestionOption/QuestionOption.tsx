import { DatePicker, Input, TimePicker, Typography } from 'antd';
import DropDown from '../DropDown/DropDown';
import Checkboxes from '../Checkboxes/Checkboxes';
import MultipleChoice from '../MultipleChoice/MultipleChoice';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './QuestionOption.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ErrorMessage } from '@hookform/error-message';
import { TQuestionOptionProps } from './types/types';

const QuestionOption: React.FC<TQuestionOptionProps> = ({
  currentOption,
  index,
  isEditable,
  isRequired,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [isFilled, setIsFilled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const formIsFilled = location.pathname.includes('filled-forms');
    setIsFilled(formIsFilled);
  }, [location]);

  const option = () => {
    switch (currentOption) {
      case 'Short answer':
        return (
          <>
            <Controller
              name={`questions.${index}.answers.0`}
              control={control}
              rules={{
                required: {
                  value: isRequired,
                  message: 'This is a required question',
                },
              }}
              render={({ field }) => (
                <Input
                  placeholder="Short answer"
                  disabled={isEditable || isFilled}
                  {...field}
                  className={styles.underline}
                  variant="borderless"
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name={`questions.${index}.answers.0`}
              render={({ message }) => (
                <Typography style={{ display: 'flex', color: '#e0434b' }}>{message}</Typography>
              )}
            />
          </>
        );
      case 'Paragraph':
        return (
          <>
            <Controller
              name={`questions.${index}.answers.0`}
              control={control}
              rules={{
                required: {
                  value: isRequired,
                  message: 'This is a required question',
                },
              }}
              render={({ field }) => (
                <Input.TextArea
                  placeholder="Long answer"
                  autoSize
                  disabled={isEditable || isFilled}
                  {...field}
                  className={styles.underline}
                  variant="borderless"
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name={`questions.${index}.answers.0`}
              render={({ message }) => (
                <Typography style={{ display: 'flex', color: '#e0434b' }}>{message}</Typography>
              )}
            />
          </>
        );
      case 'Multiple choice':
        return (
          <MultipleChoice
            index={index}
            isEditable={isEditable || isFilled}
            isRequired={isRequired}
          />
        );
      case 'Checkboxes':
        return (
          <Checkboxes index={index} isEditable={isEditable || isFilled} isRequired={isRequired} />
        );
      case 'Drop-down':
        return (
          <DropDown index={index} isEditable={isEditable || isFilled} isRequired={isRequired} />
        );
      case 'Date':
        return (
          <>
            <Controller
              name={`questions.${index}.answers.0`}
              control={control}
              rules={{
                required: {
                  value: isRequired,
                  message: 'This is a required question',
                },
              }}
              render={({ field }) => (
                <DatePicker
                  style={{ display: 'flex', width: 150 }}
                  disabled={isEditable || isFilled}
                  {...field}
                  value={typeof field.value === 'string' ? dayjs(field.value) : field.value}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name={`questions.${index}.answers.0`}
              render={({ message }) => (
                <Typography style={{ display: 'flex', color: '#e0434b' }}>{message}</Typography>
              )}
            />
          </>
        );
      case 'Time':
        return (
          <>
            <Controller
              name={`questions.${index}.answers.0`}
              control={control}
              rules={{
                required: {
                  value: isRequired,
                  message: 'This is a required question',
                },
              }}
              render={({ field }) => (
                <TimePicker
                  style={{ display: 'flex', width: 150 }}
                  disabled={isEditable || isFilled}
                  {...field}
                  value={typeof field.value === 'string' ? dayjs(field.value) : field.value}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name={`questions.${index}.answers.0`}
              render={({ message }) => (
                <Typography style={{ display: 'flex', color: '#e0434b' }}>{message}</Typography>
              )}
            />
          </>
        );
      case 'File upload':
        return null;
    }
  };

  return <>{option()}</>;
};

export default QuestionOption;
