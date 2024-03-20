import { Menu, MenuProps } from "antd";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TAdminLoader } from "./types/types";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const AppMenu: React.FC = () => {
  const loaderData: TAdminLoader = useLoaderData() as TAdminLoader;
  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("CreateForm", 1),
    getItem(
      "Forms",
      "sub1",
      null,
      loaderData.forms.map((item) => ({
        key: `sub1 ${item.id}`,
        label: `${item.id}. ${item.title}`,
      }))
    ),
    getItem(
      "Filled forms",
      "sub2",
      null,
      loaderData.filledForms.map((item) => ({
        key: `sub2 ${item.id}`,
        label: `${item.id}. ${item.title}`,
      }))
    ),
  ];

  const handleOnSelect = (event: any) => {
    const [type, id] = event.key.split(" ");
    if (type === "sub1") {
      navigate(`/forms/${id}/`, { state: { key: `${id}`, type: `${type}` } });
    } else if (type === "sub2") {
      navigate(`/forms/filled-forms/${id}/`, {
        state: { key: `${id}`, type: `${type}` },
      });
    } else {
      navigate("/forms");
    }
  };

  return (
    <Menu theme="light" mode="inline" items={items} onSelect={handleOnSelect} />
  );
};

export default AppMenu;
