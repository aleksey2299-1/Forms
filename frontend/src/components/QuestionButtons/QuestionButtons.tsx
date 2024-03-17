import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Switch, Tooltip } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const QuestionButtons: React.FC<any> = ({ onDelete, index, onCopy }) => {
  const { control, watch } = useFormContext();
  const currentQuesion = watch(`questions[${index}]`);

  return (
    <Flex vertical={false} justify="end" gap={10}>
      <Tooltip title="duplicate" placement="bottom">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={() => onCopy(index + 1, currentQuesion)}
        />
      </Tooltip>
      <Tooltip title="delete" placement="bottom">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={onDelete} />
      </Tooltip>
      <Divider
        type="vertical"
        style={{ backgroundColor: "#000000", height: 33 }}
      />
      <Controller
        name={`questions[${index}].required`}
        defaultValue={false}
        control={control}
        render={({ field }) => (
          <label style={{ fontSize: 18 }}>
            Required
            <Switch
              defaultChecked={false}
              style={{ marginLeft: 10, marginBottom: 4 }}
              {...field}
            />
          </label>
        )}
      />
    </Flex>
  );
};

export default QuestionButtons;
