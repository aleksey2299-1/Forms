import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FormForFill from "./pages/FormForFill/FormForFill.tsx";
import EditForm from "./pages/EditForm/EditForm.tsx";
import { fetchActiveFormData } from "./utils/api/FormApi.ts";
import LoginPage from "./pages/Login/Login.tsx";
import { getToken } from "./utils/Auth.ts";

const router = createBrowserRouter([
  {
    path: "edit",
    element: <EditForm />,
    loader: getToken,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <FormForFill />,
    loader: fetchActiveFormData,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
