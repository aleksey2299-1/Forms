import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


import { TForm } from '@components/EditForm/types/types';
import { TFormFill } from '@pages/FormForFill/types/types';

import { BASE_URL } from '../constants/constants';

export const getAllEditForms = createAsyncThunk(
  'editForms/getAllEditForms',
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
  'editForms/getEditFormById',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TForm[]>(`${BASE_URL}/api/v1/forms/${id}/`);
      return data[0];
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const postEditForm = createAsyncThunk(
  'editForms/postEditForm',
  async (form: TForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<TFormFill[]>(`${BASE_URL}/api/v1/forms/`, form);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getAllFilledForms = createAsyncThunk(
  'filledForms/getAllFilledForms',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TFormFill[]>(`${BASE_URL}/api/v1/filled-forms/`);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getFilledFormById = createAsyncThunk(
  'filledForms/getFilledFormById',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TFormFill[]>(`${BASE_URL}/api/v1/filled-forms/${id}/`);
      return data[0];
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const postFilledForm = createAsyncThunk(
  'filledForms/postFilledForm',
  async (form: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<TFormFill[]>(`${BASE_URL}/api/v1/filled-forms/`, form);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchActiveFormData = async () => {
  try {
    const { data } = await axios.get<TFormFill[]>(`${BASE_URL}/api/v1/forms/?active=true`);
    return data[0];
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};
