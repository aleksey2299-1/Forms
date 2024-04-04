import { CheckCircleTwoTone, CloseCircleTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { Modal, Typography } from 'antd';


import { useAppSelector } from '@store/hooks';
import { selectRequest } from '@store/reducers/request/requestSlice';

import { TRequestModalProps } from './types/types';

const RequestModal: React.FC<TRequestModalProps> = ({ isOpen, setIsOpen }) => {
  const request = useAppSelector(selectRequest);

  return (
    <Modal
      open={isOpen}
      onOk={() => setIsOpen(false)}
      footer={(_, { OkBtn }) => <OkBtn />}
      closeIcon={false}
    >
      {request.isLoading && (
        <Typography>
          <InfoCircleTwoTone style={{ marginRight: 10 }} />
          Waiting for response...
        </Typography>
      )}
      {!request.isLoading && !request.error && (
        <Typography>
          <CheckCircleTwoTone style={{ marginRight: 10 }} twoToneColor="#52c41a" />
          Success
        </Typography>
      )}
      {!request.isLoading && (request.error as string) && (
        <Typography>
          <CloseCircleTwoTone style={{ marginRight: 10 }} twoToneColor="#e0434b" />
          {request.error as string}
        </Typography>
      )}
    </Modal>
  );
};

export default RequestModal;
