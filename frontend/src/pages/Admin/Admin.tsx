import { Button, ConfigProvider, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header } from "antd/es/layout/layout";
import AppMenu from "../../components/AppMenu/AppMenu";
import EditForm from "../../components/EditForm/EditForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormForFill from "../FormForFill/FormForFill";

const Admin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    const isEditable = location.pathname.includes("filled-forms");
    setIsEditable(!isEditable);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#ffffffff",
          borderBottom: "solid 1px",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button onClick={handleLogout}>Logout</Button>
      </Header>
      <Layout>
        <Sider
          width="25%"
          style={{
            backgroundColor: "#ffffffff",
            borderRight: "solid 1px",
            borderTopRightRadius: "10px",
          }}
        >
          <AppMenu />
        </Sider>
        {isEditable && <EditForm />}
        {!isEditable && (
          <ConfigProvider
            componentDisabled
            theme={{
              token: {
                colorTextDisabled: "#000000",
                colorBgContainerDisabled: "",
              },
            }}
          >
            <FormForFill />
          </ConfigProvider>
        )}
      </Layout>
    </Layout>
  );
};

export default Admin;
