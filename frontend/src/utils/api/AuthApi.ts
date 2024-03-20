import axios, { AxiosError } from "axios";
import { TUser } from "../../pages/Login/types/types";
import { redirect } from "react-router-dom";

export const fetchTokenData = async (data: TUser) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/token/login/",
      data
    );
    const token = response.data.auth_token;
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};
