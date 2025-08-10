import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define types for fields and forms
export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "derived";

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    password?: boolean;
    notEmpty?: boolean;
  };
  derived?: {
    parentFields: string[];
    formula: string;
  };
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FieldConfig[];
}

interface FormState {
  currentForm: FormSchema | null;
  savedForms: FormSchema[];
}

const initialState: FormState = {
  currentForm: null,
  savedForms: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentForm(state, action: PayloadAction<FormSchema | null>) {
      state.currentForm = action.payload;
    },
    saveForm(state, action: PayloadAction<FormSchema>) {
      state.savedForms.push(action.payload);
    },
    setSavedForms(state, action: PayloadAction<FormSchema[]>) {
      state.savedForms = action.payload;
    },
    updateCurrentFormFields(state, action: PayloadAction<FieldConfig[]>) {
      if (state.currentForm) {
        state.currentForm.fields = action.payload;
      }
    },
  },
});

export const {
  setCurrentForm,
  saveForm,
  setSavedForms,
  updateCurrentFormFields,
} = formSlice.actions;
export default formSlice.reducer;
