import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    file:null,
    loading: false,
    chips:[],
    dataValues:[]
};

const slice = createSlice({
    name: "excel",
    initialState: initialValues,
    reducers: {
        clearAll:(state) => {
            state.file = null;
            state.chips = [];
            state.dataValues = [];
        },
        setFile: (state, action) => {
            state.file = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setChips: (state, action) => {
            state.chips = action.payload;
        },
        setValues: (state, action) => {
            state.dataValues = action.payload;
        },
    }
});

// Export actions and reducer
const { actions, reducer } = slice;
export { actions };
export default reducer;
