import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";

const ButtonsBlock: React.FC<any> = ({ onAdd }) => {
  return (
    <Flex gap="small" vertical style={{ marginLeft: 10 }}>
      <Tooltip title="add" placement="right">
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => onAdd({})}
        />
      </Tooltip>
    </Flex>
  );
};

export default ButtonsBlock;
