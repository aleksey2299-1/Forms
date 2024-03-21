import axios, { AxiosError } from "axios";
import { TFormFill } from "../../pages/FormForFill/types/types";
import { TForm } from "../../components/EditForm/types/types";
import { BASE_URL } from "../constants/constants";

export const fetchActiveFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>(
      `${BASE_URL}/api/v1/forms/?active=true`
    );
    return data[0];
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchEditFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>(`${BASE_URL}/api/v1/forms/`);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchSingleEditFormData = async (id: number) => {
  try {
    const { data } = await axios.get<TFormFill>(
      `${BASE_URL}/api/v1/forms/${id}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchFilledFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>(
      `${BASE_URL}/api/v1/filled-forms/`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchSingleFilledFormData = async (id: number) => {
  try {
    const { data } = await axios.get<TFormFill>(
      `${BASE_URL}/api/v1/filled-forms/${id}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const postFilledFormData = async (form: any) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/filled-forms/`, form);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const postFormForFillData = async (form: TForm) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/forms/`, form);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};
