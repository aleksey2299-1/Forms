import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getAllEditForms, getAllFilledForms } from "../../utils/api/FormApi";
import { selectForms } from "../../store/reducers/forms/formsSlice";
import { selectFilledForms } from "../../store/reducers/filledForms/filledFormsSlice";
import { CheckCircleTwoTone } from "@ant-design/icons";

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
  const navigate = useNavigate();
  const forms = useAppSelector(selectForms);
  const filledForms = useAppSelector(selectFilledForms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEditForms());
    dispatch(getAllFilledForms());
  }, []);

  const items: MenuItem[] = [
    getItem("CreateForm", 1),
    forms.isLoading
      ? getItem("Loading...", "loading forms")
      : getItem(
          "Forms",
          "sub1",
          null,
          forms.forms.map((item) => ({
            key: `sub1 ${item.id}`,
            label: `${item.id}. ${item.title}`,
            icon: item.active ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : null,
          }))
        ),
    filledForms.isLoading
      ? getItem("Loading...", "loading answers")
      : getItem(
          "Filled forms",
          "sub2",
          null,
          filledForms.forms.map((item) => ({
            key: `sub2 ${item.id}`,
            label: `${item.id}. ${item.title}`,
          }))
        ),
  ];

  const handleOnSelect = (event: any) => {
    const [type, id] = event.key.split(" ");
    if (type === "sub1") {
      navigate(`/forms/${id}/`, {
        state: { key: parseInt(id), type: `${type}` },
      });
    } else if (type === "sub2") {
      navigate(`/forms/filled-forms/${id}/`, {
        state: { key: parseInt(id), type: `${type}` },
      });
    } else {
      navigate("/forms");
    }
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      items={items}
      onSelect={handleOnSelect}
      style={{ borderRadius: "10px" }}
    />
  );
};

export default AppMenu;
