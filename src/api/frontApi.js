import { setUser } from '../store/slices/userSlice';
import axios from "axios"
import {store} from "../store"
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '../store/slices/loaderSlice';


const baseURL = process.env.REACT_APP_SERVER_API;


const axiosClient = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'accept': 'application/json',
	},
});

// export async function checkToken() {
// 	var tokenTime = localStorage.getItem('admin_tokenTime');
// 	var difference = Math.floor(((Date.now() - tokenTime) / 1000) / 60);
// 	if (difference < 4) {
// 		return true
// 	} else {
// 		return false  
// 	}
// }

export async function checkToken() {
    let tokenTime = JSON.parse(localStorage.getItem('user_tokenTime'));
    // if (!tokenTime) {
	// 	window.location.href = "/user/login";
    // }
    
    let differenceInHours = Math.floor((Date.now() - tokenTime) / (1000 * 60 * 60)); // Difference in hours

    if (differenceInHours < 2) {
		return
    } else {
		window.location.href = "/user/login"; 
    }
}

export const login = async (data) => {
        try{
            store.dispatch(showLoader())
			
            const response = await axios.post(`${baseURL}/auth/login`, data)  
            store.dispatch(hideLoader())
            return response  
        }catch(err){
         toast.error(err.response.data.message)
         store.dispatch(hideLoader())
        }
}



export async function GET(URL) {
    try{
    store.dispatch(showLoader())
	const response = await axios.get(`${baseURL}${URL}`, 
	{ headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
        store.dispatch(hideLoader())
        return response.data
    }catch(err){
    toast.error(err.response.data.message)
    }
}


export async function PGET(URL) {
    try{
    store.dispatch(showLoader())
	const response = await axios.get(`${baseURL}${URL}`, 
    )
        store.dispatch(hideLoader())
        return response.data
    }catch(err){
    toast.error(err.response.data.message)
    }
}

export async function GETBRAND(URL) {
try{
    const response = await axios.get(`${baseURL}${URL}`)
	store.dispatch(hideLoader())
	return response.data
}catch(err){
	toast.error(err.response.data.message)
}
}


export async function SIGNUP(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const data = await axios.post(`${baseURL}${URL}`, payload)
			store.dispatch(hideLoader())
			toast.success('You are succesfully registered')
			return data.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}

export async function ErrHandler(){
	toast.error("djndj")
}

// export async function ErrHandler(){
// 	toast.error("You did not notice dgdhdgdv")
// }

export async function POST(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const data = await axios.post(`${baseURL}${URL}`, payload,
		{headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
			store.dispatch(hideLoader())
			toast.success(data.data.message)
			return data.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}

export async function PUT(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const data = await axios.put(`${baseURL}${URL}`, payload,
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
			store.dispatch(hideLoader())
			toast.success(data.data.message)
			return data.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}

export async function UpdateStatus(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const data = await axios.put(`${baseURL}${URL}`, payload,
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
			store.dispatch(hideLoader())
			toast.success(data.data.message)
			return data.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.success(err.data.data.message)
		} 
}

export async function DELETE(URL) {
    try{
	const response = await axios.delete(`${baseURL}${URL}`,
	{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
    store.dispatch(hideLoader())
	toast.success(response.data.message)
    return response.data
	}catch(err){
	store.dispatch(hideLoader())
	toast.error(err.response.data.message)
	}
}

export async function FILE(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const formData = new FormData()
		formData.append('file', payload)
		const response = await axios.post(`${baseURL}${URL}`, formData,
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
			store.dispatch(hideLoader())
			toast.success(response.data.message)
			return response.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}

export async function DELETEFILE(URL){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const response = await axios.delete(`${baseURL}${URL}`,
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
			store.dispatch(hideLoader())
			toast.success(response.data.message)
			return response.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}



function getPath(payload, url) {
	let iterations = Object.entries(payload).length;
	var pathArr = "?";
	if (url)
		url.includes("?") ? pathArr = '&' : pathArr = '?'
	for (let key in payload) {
		if (!--iterations) {
			pathArr += key + "=" + payload[key];
		} else {
			pathArr += key + "=" + payload[key] + "&";
		}
	}
	return pathArr;
}

// export async function DELETE(URL, loader = true) {
// 	// await checkToken()
// 	if (loader) {
// 		store.dispatch(showLoader());
// 		const data = await axiosClient.delete(`${URL}`,
// 			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
// 			.then(response => response.data).catch(error => httpStatusChecker(error));
// 		store.dispatch(hideLoader());
// 		return data
// 	} else {
// 		return await axiosClient.delete(`${URL}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } }).then(response => response.data).catch(error => httpStatusChecker(error));
// 	}
// }

function httpStatusChecker(error) {
	if (!error.response) {
		toast.error("Ошибка: Нет подключение к интернету")
		return;
	}
	if (error.response.status === 400) {
		toast.error(error)
		return;
	}
	if (error.response.status === 400){
		toast.error(error)
		return 
	}
	if (error.response.status === 401) {
		// checkToken()
		toast.error("Ошибка: Неверный логин или пароль")
		return;
	}
	if (error.response.status === 404) {
		toast.error("Ошибка: Не найдено")
		return;
	}
	if (error.response.status === 415) {
		toast.error("Ошибка: Не поддерживаемый тип")
		return;
	}
	if (error.response.status === 500) {
		toast.error("Системная ошибка:" + error)
		return;
	}
}

