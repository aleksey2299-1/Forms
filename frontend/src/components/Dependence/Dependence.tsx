import { Divider, Flex, Select, Typography } from 'antd';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';


import { TQuestion } from '@components/Question/types/types';

import { TDependenceProps } from './types/types';

const dependsTypes = ['Multiple choice', 'Checkboxes', 'Drop-down'];

const Dependence: React.FC<TDependenceProps> = ({ index }) => {
  const { control, watch, unregister, setValue } = useFormContext();
  const watchQuestions: TQuestion[] = useWatch({
    control,
    name: 'questions',
    defaultValue: [],
  });
  const dependsValue = watch(`questions.${index}.depends.question`);

  const questions = watchQuestions
    .filter(
      (question, questionIndex) =>
        questionIndex < index && question.name !== undefined && dependsTypes.includes(question.type)
    )
    .map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const options = watchQuestions.find((item) => item.id === dependsValue)?.options;

  useEffect(() => {
    if (
      dependsValue !== undefined &&
      (!watchQuestions.some((item) => item.id === dependsValue) ||
        watchQuestions.findIndex((item) => item.id === dependsValue) > index)
    ) {
      setValue(`questions.${index}.depends`, undefined);
      unregister(`questions.${index}.depends`);
    }
  }, [watchQuestions, dependsValue, index, setValue, unregister]);

  return (
    <>
      {questions.length > 0 && (
        <>
          <Typography.Title level={5} style={{ display: 'flex' }}>
            Setup dependence
          </Typography.Title>
          <Flex style={{ marginBottom: 10, gap: 10 }}>
            <Controller
              name={`questions.${index}.depends.question`}
              control={control}
              render={({ field }) => (
                <Select
                  options={questions}
                  placeholder="Choose question"
                  allowClear
                  style={{ width: 200 }}
                  {...field}
                />
              )}
            />
            {dependsValue && (
              <Controller
                name={`questions.${index}.depends.option`}
                control={control}
                render={({ field }) => (
                  <Select
                    options={options?.map((item) => ({ value: item.option }))}
                    placeholder="Choose option"
                    style={{ width: 200 }}
                    {...field}
                  />
                )}
              />
            )}
          </Flex>
          <Divider style={{ backgroundColor: '#000000' }}></Divider>
        </>
      )}
    </>
  );
};

export default Dependence;
