import { createSlice } from "@reduxjs/toolkit";
import { postEditForm, postFilledForm } from "../../../utils/api/FormApi";

export interface RequestState {
  isLoading: boolean;
  error: string | null | unknown;
}

const initialState: RequestState = {
  isLoading: false,
  error: null,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postEditForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postEditForm.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postEditForm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postFilledForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postFilledForm.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postFilledForm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectRequest = (state: { request: RequestState }) =>
  state.request;

export default requestSlice.reducer;
