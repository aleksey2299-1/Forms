import { redirect } from "react-router-dom";

export const adminLoader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return { token };
};
