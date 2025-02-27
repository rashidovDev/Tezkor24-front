import { createSlice } from "@reduxjs/toolkit"

const loadBasket = () => {
  const basket = localStorage.getItem("basket");
  return basket ? JSON.parse(basket) : {
    items: [],
    productID : [],
    totalQuantity: 0,
    totalAmount: 0,
    basketIsVisible : false,
    navBasketIsVisible : false,
    order : {
      location : {},
      paymentMethod : '',
      orderItems : []
    },
}
};

const saveBasket = (state) => {
  localStorage.setItem("basket", JSON.stringify(state));
};


const basketSlice = createSlice({
    name: 'basket',
    initialState : loadBasket(),
    reducers: {
        addItemToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id || item.id === newItem._id)
            if(!existingItem){
                      state.items.push({
                        id: newItem._id,
                        price: parseInt(newItem.price),
                        quantity: newItem.quantity,
                        totalPrice:newItem.quantity*parseInt(newItem.price),
                        name : newItem.name,
                        image : newItem.image
                      })
                      state.totalQuantity += newItem.quantity
            }else{
                state.totalQuantity++
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price) * (item.quantity),0
            );
            saveBasket(state)
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
          
            state.changed = true
            if (existingItem.quantity === 1){
                state.productID = state.productID.filter((item) => item !== id)
                state.items = state.items.filter((item) => item.id !== id)
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
            localStorage.setItem("basket", JSON.stringify(state));
            state.totalAmount = state.items.reduce(
                (total, item) => total + (item.price)*(item.quantity),0
            );
            saveBasket(state)
        },
        deleteItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
      
            if (existingItem) {
              state.items = state.items.filter((item) => item.id !== id);
              state.productID = state.productID.filter((item) => item !== id)
              state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
            localStorage.setItem("basket", JSON.stringify(state));
            state.totalAmount = state.items.reduce(
              (total, item) => total + Number(item.price) * Number(item.quantity),
              0
            );
            saveBasket(state)
          },
          clearBasket(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            state.brandID = null;
            state.productID = [];
            state.order = {};
            saveBasket(state);
        },
          setProductID : function(state, action){
          state.productID.push(action.payload)
          saveBasket(state)
          },
          setBrandID : function(state, action){
            state.brandID = action.payload
            saveBasket(state)
          },
          deleteBrandID : function(state){
          state.brandID = ''
          saveBasket(state)
          },
          showBasket : function(state){
            state.basketIsVisible = true
            saveBasket(state)
          },
          hideBasket : function(state){
            state.basketIsVisible = false
            saveBasket(state)
          },
          showNavBasket : function(state){
            state.navBasketIsVisible = !state.navBasketIsVisible
            saveBasket(state)
          },
          hideNavBasket : function(state){
            state.navBasketIsVisible = false
            saveBasket(state)
          },
          setOrder : function(state, action){
            state.order.location = action.payload.location
            state.order.paymentMethod = action.payload.paymentMethod
            state.order.orderItems = state.items.map(item => {
                 return {
                  name : item.name,
                  price : item.price,
                  quantity : item.quantity,
                  product : item.id 
           } 
        })
      }
    }
})


export const {addItemToCart, removeItemFromCart, deleteItem, setProductID, clearBasket,
  showBasket, hideBasket, hideNavBasket, showNavBasket, setOrder, setBrandID, deleteBrandID} = basketSlice.actions;
export default basketSlice.reducer;