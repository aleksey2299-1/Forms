import { CloseOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Flex, Input, Radio, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { useLocation } from 'react-router-dom';

import { TOptionsProps } from '../QuestionOption/types/types';

import styles from './MultipleChoice.module.scss';

const MultipleChoice: React.FC<TOptionsProps> = ({ index, isEditable, isRequired }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const location = useLocation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });
  const [isFilled, setIsFilled] = useState(false);
  const answers = watch(`questions.${index}.answers.0`);

  useEffect(() => {
    if (isEditable) {
      const currentValue = watch(`questions.${index}.options`);
      if (currentValue.length === 0) {
        append({ option: 'Option 1' });
      }
    }
  }, [append, index, isEditable, watch]);

  useEffect(() => {
    const isFormFilled = location.state?.type === 'sub2';
    if (isFormFilled) {
      setIsFilled(isFormFilled);
    }
  }, [location]);

  return (
    <Controller
      name={`questions.${index}.answers.0`}
      rules={{
        required: { value: isRequired, message: 'This is a required question' },
      }}
      control={control}
      render={({ field }) => (
        <Radio.Group
          style={{ display: 'contents' }}
          {...field}
          disabled={isEditable}
          value={!isFilled ? field.value : answers}
        >
          {fields.map((item: any, optionIndex) => (
            <Flex key={item.id} justify="space-between" style={{ marginBottom: 5 }}>
              <Radio defaultChecked={false} value={item.option}>
                <Controller
                  name={`questions.${index}.options.${optionIndex}.option`}
                  control={control}
                  defaultValue={`Option ${optionIndex + 1}`}
                  render={({ field }) => (
                    <Input
                      style={{ width: 200 }}
                      {...field}
                      className={isEditable ? styles.underline : ''}
                      disabled={!isEditable || isFilled}
                      variant="borderless"
                    />
                  )}
                />
              </Radio>
              {isEditable && fields.length > 1 && !isFilled && (
                <Tooltip title="remove" placement="right">
                  <Button
                    shape="circle"
                    icon={<CloseOutlined />}
                    type="text"
                    onClick={() => remove(optionIndex)}
                  />
                </Tooltip>
              )}
            </Flex>
          ))}
          {isEditable && !isFilled && (
            <Radio style={{ display: 'flex', marginBottom: 5 }} disabled checked={false}>
              <Input
                placeholder={`Option ${fields.length + 1}`}
                style={{ width: 200, display: 'flex' }}
                onClick={() => append({ option: `Option ${fields.length + 1}` })}
                variant="borderless"
                className={styles.underline}
                onFocus={(e) => {
                  e.target.blur();
                }}
              />
            </Radio>
          )}
          <ErrorMessage
            errors={errors}
            name={`questions.${index}.answers.0`}
            render={({ message }) => (
              <Typography style={{ display: 'flex', color: '#e0434b' }}>{message}</Typography>
            )}
          />
        </Radio.Group>
      )}
    />
  );
};

export default MultipleChoice;
