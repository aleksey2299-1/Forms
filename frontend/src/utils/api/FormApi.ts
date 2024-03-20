import axios, { AxiosError } from "axios";
import { TFormFill } from "../../pages/FormForFill/types/types";

export const fetchActiveFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>(
      "http://localhost:8000/api/v1/forms/?active=true"
    );
    return data[0];
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};
