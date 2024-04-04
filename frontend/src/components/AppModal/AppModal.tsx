import { Button, Modal } from 'antd';
import { useEffect } from 'react';

import { useAppDispatch } from '@store/hooks';
import { postEditForm } from '@utils/api/FormApi';

import { TAppModalProps } from './types/types';

const AppModal: React.FC<TAppModalProps> = ({ title, data, isOpen, onClose, setIsRequested }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log;
  }, [isOpen]);

  const handleYes = () => {
    data['active'] = true;
    dispatch(postEditForm(data));
    onClose(false);
    setIsRequested(true);
  };
  const handleNo = () => {
    data['active'] = false;
    dispatch(postEditForm(data));
    onClose(false);
    setIsRequested(true);
  };

  const handleCancel = () => {
    onClose(false);
  };
  return (
    <>
      <Modal
        open={isOpen}
        title={title}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <Button onClick={handleYes}>Yes</Button>
            <Button onClick={handleNo}>No</Button>
            <CancelBtn />
          </>
        )}
      >
        <p>Set form active?</p>
      </Modal>
    </>
  );
};

export default AppModal;
