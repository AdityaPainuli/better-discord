import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalState = true;
    },
    closeModal: (state) => {
      state.modalState = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalState = (state) => state.modal.modalState;

export default modalSlice.reducer;
