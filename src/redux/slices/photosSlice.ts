import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const value: string[] = [];

const photosSlice = createSlice({
  name: "photos",
  initialState: value,
  reducers: {
    add: (state, action: PayloadAction<string>) => [...state, action.payload],
  }
});

export const { add } = photosSlice.actions;
export default photosSlice.reducer;
