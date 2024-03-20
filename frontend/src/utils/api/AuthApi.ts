import axios from "axios";
import { TUser } from "../../pages/Login/types/types";

export const fetchTokenData = async (data: TUser) => {
  try {
    const response = await axios.post("/api/auth/token/login/", data);
    const token = response.data.auth_token;
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    return false;
  }
};
