import { Input, Divider, Flex, Select } from "antd";
import QuestionOption from "../QuestionOption/QuestionOption";
import QuestionButtons from "../QuestionButtons/QuestionButtons";
import { Controller, useFormContext } from "react-hook-form";
import Dependence from "../Dependence/Dependence";

const optionsList = [
  { value: "Short answer" },
  { value: "Paragraph" },
  { value: "Multiple choice" },
  { value: "Checkboxes" },
  { value: "Drop-down" },
  { value: "Date" },
  { value: "Time" },
  { value: "File upload" },
];

const Question: React.FC<any> = ({ index, onDelete, onCopy }) => {
  const { control, watch, unregister } = useFormContext();
  const currentOption = watch(`questions[${index}].type`);

  return (
    <>
      <Dependence index={index} />
      <Flex style={{ marginBottom: 10 }}>
        <Controller
          name={`questions[${index}].name`}
          control={control}
          render={({ field }) => <Input placeholder="Question" {...field} />}
        />
        <Controller
          name={`questions[${index}].type`}
          control={control}
          render={({ field }) => (
            <Select
              defaultValue={optionsList[0]}
              options={optionsList}
              style={{ width: 200 }}
              {...field}
              onChange={(value) => {
                if (!optionsList.slice(2, 5).some((e) => e.value === value)) {
                  unregister(`questions[${index}].options`);
                }
                field.onChange(value);
              }}
            />
          )}
        />
      </Flex>
      <QuestionOption
        currentOption={currentOption || optionsList[0].value}
        index={index}
      />
      <Divider style={{ backgroundColor: "#000000" }} />
      <QuestionButtons onDelete={onDelete} index={index} onCopy={onCopy} />
    </>
  );
};

export default Question;
