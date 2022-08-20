import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChannel: "",
};
export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    selectChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    deselectAllChannel: (state) => {
      state.currentChannel = "";
    },
  },
});

export const { selectChannel, deselectAllChannel } = channelSlice.actions;

export const channelState = (state) => state.channel.currentChannel;

export default channelSlice.reducer;
