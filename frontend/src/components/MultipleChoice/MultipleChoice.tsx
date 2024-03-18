import { CloseOutlined } from "@ant-design/icons";
import { Button, Radio, Flex, Input, Tooltip } from "antd";
import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const MultipleChoice: React.FC<any> = ({ index, isEditable }) => {
  const { control, watch } = useFormContext();
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
    <Radio.Group style={{ display: "contents" }}>
      {fields.map((item, optionIndex) => (
        <Flex key={item.id} justify="space-between" style={{ marginBottom: 5 }}>
          <Controller
            name={`questions[${index}].options[${optionIndex}].option`}
            control={control}
            defaultValue={`Option ${optionIndex + 1}`}
            render={({ field }) => (
              <Radio disabled={isEditable}>
                <Input style={{ width: 200 }} {...field} />
              </Radio>
            )}
          />
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
        <Radio style={{ display: "flex", marginBottom: 5 }} disabled>
          <Input
            placeholder={`Option ${fields.length + 1}`}
            style={{ width: 200, display: "flex" }}
            onClick={() => append({ option: `Option ${fields.length + 1}` })}
          />
        </Radio>
      )}
    </Radio.Group>
  );
};

export default MultipleChoice;
