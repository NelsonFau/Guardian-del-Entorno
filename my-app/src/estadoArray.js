import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    areas: [],
    species: [],
};

const arraySlice = createSlice({
    name: "array",
    initialState,
    reducers: {
        setArea: (state, action) => {
            state.areas = action.payload;
        },
        setSpecie: (state, action) => {
            state.species = action.payload;
        },
        logout: () => null,
    },
});

export const { setAreas, setSpecie, logout } = arraySlice.actions;
export default arraySlice.reducer;

