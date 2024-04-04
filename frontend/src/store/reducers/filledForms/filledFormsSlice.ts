import { createSlice } from '@reduxjs/toolkit';

import { TFormFill } from '@pages/FormForFill/types/types';
import { getAllFilledForms, getFilledFormById } from '@utils/api/FormApi';

export interface FormsState {
  forms: TFormFill[];
  form: TFormFill | undefined;
  isLoading: boolean;
  error: string | null | unknown;
}

const initialState: FormsState = {
  forms: [],
  form: undefined,
  isLoading: false,
  error: null,
};

const filledFormsSlice = createSlice({
  name: 'filledForms',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllFilledForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilledForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms = action.payload;
        state.error = null;
      })
      .addCase(getAllFilledForms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getFilledFormById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilledFormById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.form = action.payload;
        state.error = null;
      })
      .addCase(getFilledFormById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectFilledForms = (state: { filledForms: FormsState }) => state.filledForms;

export default filledFormsSlice.reducer;
