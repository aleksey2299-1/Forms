import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FormForFill from "./pages/FormForFill/FormForFill.tsx";
import EditForm from "./pages/EditForm/EditForm.tsx";

const router = createBrowserRouter([
  {
    path: "edit",
    element: <EditForm />,
    // loader: () => {},
  },
  {
    path: "/",
    element: <FormForFill />,
    // loader: () => {},
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
