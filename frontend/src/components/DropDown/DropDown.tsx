import { CloseOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import styles from "./DropDown.module.scss";
import { TOption } from "../QuestionOption/types/types";
import { useLocation } from "react-router-dom";

const DropDown: React.FC<any> = ({ index, isEditable }) => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].options`,
  });
  const location = useLocation();
  const [isFilled, setIsFilled] = useState(false);

  const options: TOption[] = watch(`questions[${index}].options`);

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
      {isEditable && !isFilled ? (
        <ol style={{ marginLeft: 17 }}>
          {fields.map((item, optionIndex) => (
            <Controller
              key={item.id}
              name={`questions[${index}].options[${optionIndex}].option`}
              control={control}
              defaultValue={`Option ${optionIndex + 1}`}
              render={({ field }) => (
                <li
                  key={optionIndex}
                  style={{ marginBottom: 5, paddingLeft: 7 }}
                >
                  <Flex vertical={false} justify="space-between">
                    <Input
                      style={{ width: 200 }}
                      {...field}
                      variant="borderless"
                      className={styles.underline}
                    />
                    {fields.length > 1 && (
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
                </li>
              )}
            />
          ))}
          <li style={{ paddingLeft: 7 }}>
            <Input
              placeholder={`Option ${fields.length + 1}`}
              style={{ width: 200, display: "flex", cursor: "text" }}
              onClick={() => append({ option: `Option ${fields.length + 1}` })}
              onFocus={(e) => {
                e.target.blur();
              }}
              variant="borderless"
              className={styles.underline}
            />
          </li>
        </ol>
      ) : (
        <Controller
          name={`questions[${index}].answer`}
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Choose option"
              options={options.map((e) => ({
                value: e.option,
                label: e.option,
              }))}
              style={{ width: 200, display: "flex" }}
              allowClear
              {...field}
              onChange={(selectedOption) => {
                const updatedOptions = options.map((option) => {
                  if (option.option === selectedOption) {
                    return {
                      ...option,
                      checked: true,
                    };
                  } else {
                    return {
                      ...option,
                      checked: false,
                    };
                  }
                });
                setValue(`questions[${index}].options`, updatedOptions);
                field.onChange(selectedOption);
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default DropDown;
