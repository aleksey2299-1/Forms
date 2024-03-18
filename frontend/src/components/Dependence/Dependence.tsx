import { Flex, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TQuestion } from "../Question/types/types";
import { useEffect } from "react";

const dependsTypes = ["Multiple choice", "Checkboxes", "Drop-down"];

const Dependence: React.FC<any> = ({ index }) => {
  const { control, watch, unregister, setValue } = useFormContext();
  const watchQuestions: TQuestion[] = useWatch({
    control,
    name: "questions",
    defaultValue: [],
  });
  const dependsValue = watch(`questions[${index}].depends.question`);

  const questions = watchQuestions
    .filter(
      (question, questionIndex) =>
        questionIndex < index &&
        question.name !== undefined &&
        dependsTypes.includes(question.type)
    )
    .map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const options = watchQuestions.find(
    (item) => item.id === dependsValue
  )?.options;

  useEffect(() => {
    if (
      dependsValue !== undefined &&
      !watchQuestions.some((item) => item.id === dependsValue)
    ) {
      setValue(`questions[${index}].depends`, undefined);
      unregister(`questions[${index}].depends`);
    }
  }, [watchQuestions, unregister]);

  return (
    <>
      {questions.length > 0 && (
        <Flex style={{ marginBottom: 10 }}>
          <Controller
            name={`questions[${index}].depends.question`}
            control={control}
            render={({ field }) => (
              <Select
                options={questions}
                allowClear
                style={{ width: 100 }}
                {...field}
              />
            )}
          />
          {dependsValue && (
            <Controller
              name={`questions[${index}].depends.option`}
              control={control}
              render={({ field }) => (
                <Select
                  options={options?.map((item) => ({ value: item.option }))}
                  style={{ width: 100 }}
                  {...field}
                />
              )}
            />
          )}
        </Flex>
      )}
    </>
  );
};

export default Dependence;
