import { redirect } from "react-router-dom";
import { fetchEditFormData, fetchFilledFormData } from "../api/FormApi";

export const adminLoader = async () => {
  const forms = await fetchEditFormData();
  const filledForms = await fetchFilledFormData();
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return { forms, filledForms, token };
};
