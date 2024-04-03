import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import { useContext } from 'react';
import CardContext from '../../utils/context/card-context';
import { TButtonsBlockProps } from './types/types';

const ButtonsBlock: React.FC<TButtonsBlockProps> = ({ onAdd }) => {
  const { index, elementId } = useContext(CardContext);
  const element = document.getElementById(elementId);

  return (
    <Flex
      gap="small"
      vertical
      style={{
        marginLeft: 10,
        marginTop: element ? element.offsetTop - 60 : 10,
        transition: 'margin-top 0.3s ease',
      }}
    >
      <Tooltip title="add" placement="right">
        {/* @ts-expect-error нужно явно указать поля объекта при добавлении */}
        <Button shape="circle" icon={<PlusOutlined />} onClick={() => onAdd(index, {})} />
      </Tooltip>
    </Flex>
  );
};

export default ButtonsBlock;
