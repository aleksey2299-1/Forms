import { Layout } from "antd";
import styles from "./Header.module.scss";

const Header: React.FC<any> = () => {
  return <Layout.Header className={styles.header}>Header</Layout.Header>;
};

export default Header;
