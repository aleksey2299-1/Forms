import { CloseOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import styles from "./DropDown.module.scss";
import { TOption } from "../QuestionOption/types/types";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

const DropDown: React.FC<any> = ({ index, isEditable, isRequired }) => {
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
  const answers = watch(`questions.${index}.answers.0`);
  const options: TOption[] = watch(`questions.${index}.options`);

  useEffect(() => {
    if (isEditable) {
      const currentValue = watch(`questions.${index}.options`);
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
              name={`questions.${index}.options.${optionIndex}.option`}
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
        <>
          <Controller
            name={`questions.${index}.answers.0`}
            control={control}
            rules={{
              required: {
                value: isRequired,
                message: "This is a required question",
              },
            }}
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
                value={!isFilled ? field.value : answers}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name={`questions.${index}.answers.0`}
            render={({ message }) => (
              <Typography style={{ display: "flex", color: "#e0434b" }}>
                {message}
              </Typography>
            )}
          />
        </>
      )}
    </>
  );
};

export default DropDown;
