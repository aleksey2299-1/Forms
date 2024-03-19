import { CloseOutlined } from "@ant-design/icons";
import { Button, Radio, Flex, Input, Tooltip } from "antd";
import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import styles from "./MultipleChoice.module.scss";

const MultipleChoice: React.FC<any> = ({ index, isEditable }) => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].options`,
  });

  useEffect(() => {
    if (isEditable) {
      const currentValue = watch(`questions[${index}].options`);
      if (currentValue.length === 0) {
        append({ option: "Option 1" });
      }
    }
  }, [remove]);

  return (
    <Controller
      name={`questions[${index}].answer`}
      control={control}
      render={({ field }) => (
        <Radio.Group
          style={{ display: "contents" }}
          {...field}
          onChange={(e) => {
            const options = watch(`questions[${index}].options`);
            options.forEach((_: any, optionIndex: number) => {
              setValue(
                `questions[${index}].options[${optionIndex}].checked`,
                false
              );
            });
            setValue(
              `questions[${index}].options[${e.target.value}].checked`,
              true
            );
            field.onChange(e.target.value);
          }}
        >
          {fields.map((item, optionIndex) => (
            <Flex
              key={item.id}
              justify="space-between"
              style={{ marginBottom: 5 }}
            >
              <Radio
                disabled={isEditable}
                defaultChecked={false}
                value={optionIndex}
              >
                <Controller
                  name={`questions[${index}].options[${optionIndex}].option`}
                  control={control}
                  defaultValue={`Option ${optionIndex + 1}`}
                  render={({ field }) => (
                    <Input
                      style={{ width: 200 }}
                      {...field}
                      className={isEditable && styles.underline}
                      disabled={!isEditable}
                      variant="borderless"
                    />
                  )}
                />
              </Radio>
              {isEditable && fields.length > 1 && (
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
          {isEditable && (
            <Radio
              style={{ display: "flex", marginBottom: 5 }}
              disabled
              checked={false}
            >
              <Input
                placeholder={`Option ${fields.length + 1}`}
                style={{ width: 200, display: "flex" }}
                onClick={() =>
                  append({ option: `Option ${fields.length + 1}` })
                }
                variant="borderless"
                className={styles.underline}
              />
            </Radio>
          )}
        </Radio.Group>
      )}
    />
  );
};

export default MultipleChoice;
