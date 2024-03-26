import { Empty, Flex, Typography } from "antd";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }} vertical>
      <Typography.Title level={3}>Error</Typography.Title>
      <br />
      <Typography style={{ fontSize: 18 }}>
        Ooops... Look's like there isn't any active form, please make one
        <Link to="/forms"> here</Link>.
      </Typography>
      <br />
      <br />
      <br />
      <Empty />
    </Flex>
  );
};

export default ErrorPage;
