import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

const AppModal: React.FC<any> = ({ title, data, isOpen, onClose }) => {
  useEffect(() => {
    console.log;
  }, [isOpen]);

  const handleYes = () => {
    data["active"] = true;
    console.log(data);
    axios
      .post("/api/v1/forms/", data)
      .then((response) => {
        console.log("Успешный ответ от сервера:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных на сервер:", error);
      });
    onClose(false);
  };
  const handleNo = () => {
    data["active"] = false;
    axios
      .post("/api/v1/forms/", data)
      .then((response) => {
        console.log("Успешный ответ от сервера:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных на сервер:", error);
      });
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
