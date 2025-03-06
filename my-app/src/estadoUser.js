import { createSlice } from '@reduxjs/toolkit'

const initialState = null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_, action) => action.payload,
        logout: () => null,
    },
});

export const { setAreas, setUser, logout } = userSlice.actions;
export default userSlice.reducer
