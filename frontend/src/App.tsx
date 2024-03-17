import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Content />
      </DndProvider>
    </Layout>
  );
};

export default App;
