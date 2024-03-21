import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import { postFormForFillData } from "./api/FormApi";

const AppModal: React.FC<any> = ({ title, data, isOpen, onClose }) => {
  useEffect(() => {
    console.log;
  }, [isOpen]);

  const handleYes = () => {
    data["active"] = true;
    console.log(data);
    postFormForFillData(data);
    onClose(false);
  };
  const handleNo = () => {
    data["active"] = false;
    postFormForFillData(data);
    onClose(false);
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
