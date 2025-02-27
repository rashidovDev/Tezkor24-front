import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    languageIsVisible : false,
    filterIsVisible : false,
    deliverIsVisible : false
}

const toggleSlice = createSlice({
    name : 'toggle',
    initialState,
    reducers : {
        showLanguage: function(state){
        state.languageIsVisible = !state.languageIsVisible
        },
        hideLanguage: function(state){
        state.languageIsVisible = false
        }, 
        showFilter: function(state){
        state.filterIsVisible = !state.filterIsVisible
        },
        hideFilter : function(state){
        state.filterIsVisible = false
        },
        showDeliver: function(state){
            state.deliverIsVisible = !state.deliverVisible
            },
        hideDeliver : function(state){
            state.deliverIsVisible = false
        }
    }
})

export const {showLanguage, hideLanguage, showFilter, hideFilter, showDeliver, hideDeliver} = toggleSlice.actions;
export default toggleSlice.reducer;