import { FC } from "react";
import { PAGE_NOT_FOUND_MESSAGE } from "../common/constants";
import { setDocumentTitle } from "../common/utilities";
import Layout from "../Layout/Layout";

const ErrorPage: FC = () => {
  setDocumentTitle(["Error"]);

  return (
    <Layout>
      <p className="message message--error">{PAGE_NOT_FOUND_MESSAGE}</p>
    </Layout>
  );
};

export default ErrorPage;
