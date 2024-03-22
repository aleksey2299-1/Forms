import { createSlice } from "@reduxjs/toolkit";
import { TForm } from "../../../components/EditForm/types/types";
import { initialForm } from "./constants";
import { getAllEditForms, getEditFormById } from "../../../utils/api/FormApi";

export interface FormsState {
  forms: TForm[];
  form: TForm;
  isLoading: boolean;
  error: string | null | unknown;
}

const initialState: FormsState = {
  forms: [],
  form: initialForm,
  isLoading: false,
  error: null,
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllEditForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEditForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms = action.payload;
        state.error = null;
      })
      .addCase(getAllEditForms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getEditFormById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEditFormById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.form = action.payload;
        state.error = null;
      })
      .addCase(getEditFormById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectForms = (state: { forms: FormsState }) => state.forms;

export default formsSlice.reducer;
