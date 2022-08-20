import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../slices/channelSlice";
import modalReducer from "../slices/newchannelModalSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    modal: modalReducer,
    user: userReducer,
  },
});
