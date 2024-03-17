import { CloseOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Tooltip } from "antd";
import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const DropDown: React.FC<any> = ({ index }) => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].options`,
  });

  useEffect(() => {
    const currentValue = watch(`questions[${index}].options`);
    if (currentValue.length === 0) {
      append({ option: "Option 1" });
    }
  }, [remove]);

  return (
    <ol style={{ marginLeft: 17 }}>
      {fields.map((item, optionIndex) => (
        <Controller
          key={item.id}
          name={`questions[${index}].options[${optionIndex}].option`}
          control={control}
          defaultValue={`Option ${optionIndex + 1}`}
          render={({ field }) => (
            <li key={optionIndex} style={{ marginBottom: 5, paddingLeft: 7 }}>
              <Flex vertical={false} justify="space-between">
                <Input style={{ width: 200 }} {...field} />
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
          style={{ width: 200, display: "flex" }}
          onClick={() => append({ option: `Option ${fields.length + 1}` })}
        />
      </li>
    </ol>
  );
};

export default DropDown;
