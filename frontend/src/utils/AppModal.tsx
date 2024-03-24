import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import { postEditForm } from "./api/FormApi";
import { useAppDispatch } from "../store/hooks";

const AppModal: React.FC<any> = ({
  title,
  data,
  isOpen,
  onClose,
  setIsRequested,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log;
  }, [isOpen]);

  const handleYes = () => {
    data["active"] = true;
    dispatch(postEditForm(data));
    onClose(false);
    setIsRequested(true);
  };
  const handleNo = () => {
    data["active"] = false;
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
