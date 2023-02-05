import { FC } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout/Layout";

const App: FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
