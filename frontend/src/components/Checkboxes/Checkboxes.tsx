import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import styles from "./Checkboxes.module.scss";
import { useLocation } from "react-router-dom";

const Checkboxes: React.FC<any> = ({ index, isEditable }) => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].options`,
  });
  const location = useLocation();
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
      setIsFilled(isFormFilled);
    }
  }, [location]);

  return (
    <>
      {fields.map((item, optionIndex) => (
        <Controller
          key={item.id}
          name={`questions[${index}].options[${optionIndex}].checked`}
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <Flex justify="space-between" style={{ marginBottom: 5 }}>
              <Flex>
                <Checkbox
                  disabled={isEditable}
                  {...field}
                  value={undefined}
                  checked={field.value}
                >
                  <Controller
                    key={item.id}
                    name={`questions[${index}].options[${optionIndex}].option`}
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
          )}
        />
      ))}
      {isEditable && !isFilled && (
        <Checkbox style={{ display: "flex", marginBottom: 5 }} disabled>
          <Input
            placeholder={`Option ${fields.length + 1}`}
            style={{ width: 200, display: "flex" }}
            onClick={() => append({ option: `Option ${fields.length + 1}` })}
            onFocus={(e) => {
              e.target.blur();
            }}
            variant="borderless"
            className={styles.underline}
          />
        </Checkbox>
      )}
    </>
  );
};

export default Checkboxes;
