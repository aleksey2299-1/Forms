import axios, { AxiosError } from "axios";
import { TFormFill } from "../../pages/FormForFill/types/types";
import { TForm } from "../../components/EditForm/types/types";
import { BASE_URL } from "../constants/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllEditForms = createAsyncThunk(
  "editForms/getAllEditForms",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TForm[]>(`${BASE_URL}/api/v1/forms/`);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getEditFormById = createAsyncThunk(
  "editForms/getEditFormById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TForm[]>(
        `${BASE_URL}/api/v1/forms/${id}/`
      );
      return data[0];
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const postEditForm = createAsyncThunk(
  "editForms/postEditForm",
  async (form: TForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<TFormFill[]>(
        `${BASE_URL}/api/v1/forms/`,
        form
      );
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getAllFilledForms = createAsyncThunk(
  "filledForms/getAllFilledForms",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TFormFill[]>(
        `${BASE_URL}/api/v1/filled-forms/`
      );
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getFilledFormById = createAsyncThunk(
  "filledForms/getFilledFormById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TFormFill[]>(
        `${BASE_URL}/api/v1/filled-forms/${id}/`
      );
      return data[0];
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const postFilledForm = createAsyncThunk(
  "filledForms/postFilledForm",
  async (form: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<TFormFill[]>(
        `${BASE_URL}/api/v1/filled-forms/`,
        form
      );
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

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
