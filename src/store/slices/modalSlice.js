import {createSlice} from '@reduxjs/toolkit';

const initialState = {
     modal : false,
     modalExactBrand : false,
     modalRegistration : false,
     modalDouble : false,
     modalProduct : false,
     navbar : false,
     modalBrand : false,
     modalView : false
}

const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {
        showModal : function(state){
            state.modal= !state.modal
        },
        hideModal : function(state){
            state.modal = false;
        },
        showModalExactBrand : function(state){
            state.modalExactBrand= !state.modalExactBrand
        },
        hideModalExactBrand : function(state){
            state.modalExactBrand = false;
        },
        showModalDouble : function(state){
            state.modalDouble = true
        },
        hideModalDouble : function(state){
            state.modalDouble = false
        },
        showModalProduct : function(state){
            state.modalProduct = true
        },
        hideModalProduct : function(state){
            state.modalProduct = false
        },
        showModalRegistration : function(state){
            state.modalRegistration = true
        },
        hideModalRegistration : function(state){
            state.modalRegistration = false
        },
        showNavbar : function(state){
            state.navbar = !state.navbar
        },
        hideNavbar : function(state){
            state.navbar = false
        },
        showModalBrand : function(state){
            state.modalBrand = !state.modalBrand
        },
        hideModalBrand : function(state){
            state.modalBrand = false
        },
        showModalView : function(state){
            state.modalView = !state.modalView
        },
        hideModalView : function(state){
            state.modalView = false
        }
    }
})

export const {showModal, hideModal, showModalDouble, hideModalDouble,
     showModalProduct, hideModalProduct, showModalRegistration, hideModalRegistration,
     showNavbar, hideNavbar, showModalBrand, hideModalBrand, showModalView,
     hideModalView, showModalExactBrand, hideModalExactBrand} = modalSlice.actions;
export default modalSlice.reducer;