import { Navigate } from "react-router-dom"
import Order from "./Order"
import { useSelector } from "react-redux"
import Purchases from "./Purchases"
import Profile from "./Profile/Profile"
import FavouriteBrands from "./Profile/ProfileCategories/FavouriteBrands"


export const OrderPrivateRoute = () => {
    const orders = useSelector(state => state.basket.items)
    let token = localStorage.getItem("access_token")
    // let token =  JSON.parse(JSON.stringify(localStorage.getItem("access_token"))) || null
    return (
     token && orders.length > 0 ? <Order/> : <Navigate to="/user/login" />
    )
}

export const ProfilePrivateRoute = () => {
  const token = localStorage.getItem("access_token")
  // let token =  JSON.parse(JSON.stringify(localStorage.getItem("access_token"))) || null
  return (
    token ? <Profile/> : <Navigate to="/user/login" />
  )
}



export const PurchasesPrivateRoute = () => {
  let token = localStorage.getItem("access_token")
  return (
    token ? <Purchases/> : <Navigate to="/user/login" />
  )
}

export const FavouriteBrandsPrivateRoute = () => {
  let token = localStorage.getItem("access_token")
  return (
    token ? <FavouriteBrands/> : <Navigate to="/user/login" />
  )
}