import axios, { AxiosError } from "axios";
import { TFormFill } from "../../pages/FormForFill/types/types";

export const fetchActiveFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>("/api/v1/forms/?active=true");
    return data[0];
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchEditFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>("/api/v1/forms/");
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchSingleEditFormData = async (id: number) => {
  try {
    const { data } = await axios.get<TFormFill>(`/api/v1/forms/${id}`);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchFilledFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>("/api/v1/filled-forms/");
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const fetchSingleFilledFormData = async (id: number) => {
  try {
    const { data } = await axios.get<TFormFill>(`/api/v1/filled-forms/${id}`);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};
