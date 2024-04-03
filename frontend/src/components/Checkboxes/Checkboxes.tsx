import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Input, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import styles from './Checkboxes.module.scss';
import { useLocation } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { TOptionsProps } from '../QuestionOption/types/types';

const Checkboxes: React.FC<TOptionsProps> = ({ index, isEditable, isRequired }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });
  const location = useLocation();
  const [isFilled, setIsFilled] = useState(false);
  const answers = watch(`questions.${index}.answers`);

  useEffect(() => {
    if (isEditable) {
      const currentValue = watch(`questions.${index}.options`);
      if (currentValue.length === 0) {
        append({ option: 'Option 1' });
      }
    }
  }, [fields, append, index, isEditable, watch]);

  useEffect(() => {
    const isFormFilled = location.state?.type === 'sub2';
    if (isFormFilled) {
      setIsFilled(isFormFilled);
    }
  }, [location]);

  return (
    <>
      <Controller
        name={`questions.${index}.answers`}
        control={control}
        rules={{
          required: {
            value: isRequired,
            message: 'This is a required question',
          },
        }}
        render={({ field }) => (
          <Checkbox.Group
            {...field}
            style={{ display: 'table' }}
            disabled={isEditable}
            value={!isFilled ? field.value : answers}
          >
            {fields.map((item: any, optionIndex) => (
              <Flex key={item.id} justify="space-between" style={{ marginBottom: 5 }}>
                <Flex>
                  <Checkbox value={item.option}>
                    <Controller
                      key={item.id}
                      name={`questions.${index}.options.${optionIndex}.option`}
                      control={control}
                      defaultValue={`Option ${optionIndex + 1}`}
                      render={({ field }) => (
                        <Input
                          style={{ width: 200 }}
                          {...field}
                          variant="borderless"
                          disabled={!isEditable || isFilled}
                          className={styles.underline}
                        />
                      )}
                    />
                  </Checkbox>
                </Flex>
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
              <Checkbox style={{ display: 'flex', marginBottom: 5 }} disabled>
                <Input
                  placeholder={`Option ${fields.length + 1}`}
                  style={{ width: 200, display: 'flex' }}
                  onClick={() => append({ option: `Option ${fields.length + 1}` })}
                  onFocus={(e) => {
                    e.target.blur();
                  }}
                  variant="borderless"
                  className={styles.underline}
                />
              </Checkbox>
            )}
            <ErrorMessage
              errors={errors}
              name={`questions.${index}.answers`}
              render={({ message }) => (
                <Typography style={{ display: 'flex', color: '#e0434b' }}>{message}</Typography>
              )}
            />
          </Checkbox.Group>
        )}
      />
    </>
  );
};

export default Checkboxes;
