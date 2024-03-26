import { CloseOutlined } from "@ant-design/icons";
import { Button, Radio, Flex, Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import styles from "./MultipleChoice.module.scss";
import { useLocation } from "react-router-dom";

const MultipleChoice: React.FC<any> = ({ index, isEditable }) => {
  const { control, watch, setValue } = useFormContext();
  const location = useLocation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].options`,
  });
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (isEditable) {
      const currentValue = watch(`questions[${index}].options`);
      if (currentValue.length === 0) {
        append({ option: "Option 1" });
      }
    }
  }, [remove]);

  useEffect(() => {
    const isFormFilled = location.state?.type === "sub2";
    if (isFormFilled) {
      const indexToSet = watch(`questions[${index}].answer`);
      setValue(`questions[${index}].answer`, parseInt(indexToSet));
      setIsFilled(isFormFilled);
    }
  }, [location]);

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
                onFocus={(e) => {
                  e.target.blur();
                }}
              />
            </Radio>
          )}
        </Radio.Group>
      )}
    />
  );
};

export default MultipleChoice;
