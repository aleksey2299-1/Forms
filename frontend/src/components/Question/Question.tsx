import { Input, Divider, Flex, Select, Typography } from "antd";
import QuestionOption from "../QuestionOption/QuestionOption";
import QuestionButtons from "../QuestionButtons/QuestionButtons";
import { Controller, useFormContext } from "react-hook-form";
import Dependence from "../Dependence/Dependence";
import styles from "./Question.module.scss";

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

const Question: React.FC<any> = ({
  index,
  onDelete,
  onCopy,
  isEditable,
  isShow,
}) => {
  const { control, watch, unregister } = useFormContext();
  const currentOption = watch(`questions.${index}.type`);
  const isRequired = watch(`questions.${index}.required]`);

  return (
    <>
      {isEditable && <Dependence index={index} isEditable={isEditable} />}
      <Flex
        style={{
          marginBottom: 10,
          gap: isEditable ? 10 : 0,
          display: "flex",
          justifyContent: "start",
        }}
      >
        {isRequired && !isEditable && (
          <Typography style={{ color: "#e0434b", marginTop: 3 }}>*</Typography>
        )}
        <Controller
          name={`questions.${index}.name`}
          control={control}
          render={({ field }) => (
            <>
              <Input
                placeholder="Question"
                {...field}
                disabled={!isEditable}
                className={isEditable && styles.underline}
                variant="borderless"
              />
            </>
          )}
        />
        {isEditable && (
          <Controller
            name={`questions.${index}.type`}
            defaultValue={optionsList[0].value}
            control={control}
            render={({ field }) => (
              <Select
                defaultValue={optionsList[0]}
                options={optionsList}
                style={{ width: 200 }}
                {...field}
                onChange={(value) => {
                  if (!optionsList.slice(2, 5).some((e) => e.value === value)) {
                    unregister(`questions.${index}.options`);
                  }
                  field.onChange(value);
                }}
              />
            )}
          />
        )}
      </Flex>
      <QuestionOption
        currentOption={currentOption || optionsList[0].value}
        index={index}
        isEditable={isEditable}
        isRequired={isRequired && isShow && !isEditable}
      />
      {isEditable && (
        <>
          <Divider style={{ backgroundColor: "#000000" }} dashed />
          <QuestionButtons onDelete={onDelete} index={index} onCopy={onCopy} />
        </>
      )}
    </>
  );
};

export default Question;
