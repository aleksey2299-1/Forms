import { redirect } from "react-router-dom";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return token;
};
