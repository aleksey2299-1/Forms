import { createBrowserRouter } from "react-router-dom";
import Admin from "../Admin/Admin";
import LoginPage from "../Login/Login";
import FormForFill from "../FormForFill/FormForFill";
import { fetchActiveFormData } from "../../utils/api/FormApi";
import { adminLoader } from "../../utils/loaders/AdminLoader";

const router = createBrowserRouter([
  {
    path: "forms",
    element: <Admin />,
    loader: adminLoader,
    children: [
      {
        path: "/forms/:formId",
        element: <Admin />,
        loader: adminLoader,
      },
      {
        path: "/forms/filled-forms/:formId",
        element: <Admin />,
        loader: adminLoader,
      },
    ],
  },
  {
    path: "/login/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <FormForFill />,
    loader: fetchActiveFormData,
  },
]);

export default router;
