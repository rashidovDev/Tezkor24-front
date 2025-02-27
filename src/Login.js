import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, EyeOff, PlayCircle } from 'react-feather';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { login } from './api/adminApi'
import { store } from './store';
import { setUser } from './store/slices/userSlice';
import { hideLoader, showLoader } from './store/slices/loaderSlice';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Required field')
    const [passwordError, setPasswordError] = useState('Required field')
    const [formValid, setFormValid] = useState(false)

    const data = {email, password}

    let [reload, setReload] = useState('save to reload')

    const baseURL = process.env.REACT_APP_SERVER_API;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authLogin = async (data) => {
       try{
        // store.dispatch(showLoader())
        const response = await login(data) 
        if(response){  
             const data = await axios.get(baseURL + '/auth/user',
             { headers: { Authorization: 'Bearer ' + response.data.token}})
             dispatch(setUser(data.data.user))
             for(let i = 0; i < data.data.user.roles.length; i++){
                if (data.data.user.roles[i] === "admin" || data.data.user.roles[i] === "owner") {
                    localStorage.setItem('admin_access_token', response.data.token)
                    localStorage.setItem("admin_tokenTime", JSON.stringify(new Date().getTime()))
                    localStorage.setItem('admin_user', JSON.stringify(data))
                    navigate("/admin/main")
                }else if(data.data.user.role === "customer"){
                   localStorage.setItem('access_token', response.data.token)
                   localStorage.setItem("user_tokenTime", JSON.stringify(new Date().getTime()))
                   localStorage.setItem('user', JSON.stringify(data))
                   navigate("/")
                   window.location.reload()
                }
                else{
                   navigate("/")
              
                } 
             }         
        }
       }catch(err){
       alert(err.data.data.message)
       }
    }

    // Login validation 

    useEffect(() => {
        setTimeout(() => {
            setReload("")
        }, 1000)
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, reload])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!e.target.value) {
            setEmailError("Required field")
        }
        else if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Incorrect email")
        }
        else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (!e.target.value) {
            setPasswordError("Required field")
        }
        else if (e.target.value.length < 4 || e.target.value.length > 12) {
            setPasswordError("Password must be longer than 3 and smaller than 12")
        }
        else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            default:
        }
    }

    return (
        <div className=' relative'>
            <div className='text-[#262134] w-full min-h-screen flex'>
                <div className='w-1/2 hidden bg-[#fff] main-bg md:flex items-center justify-center'>
                    <img className='w-[120px]' src={require('./assets/logomain.png')} />
                   <h1 className='text-[#fff] mt-[10px] text-[70px]'>TEZKOR 24</h1>
                </div>
                <div className="md:w-1/2 flex md:mt-[-100px]  items-center">
                    <div className='justify-center w-2/3 items-center md:mt-[280px] ml-20 relative'>
                        <h1 className='text-[35px] font-[350] mb-5'>Log In</h1>
                        <input name='email' onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} value={email} autoComplete='off' type="email" placeholder='Email'
                            className="w-full p-2 mb-4 focus:border-b-[#F29314]  border-[#000] ff mt-2 " />
                        {(emailDirty && emailError) && <div className='text-[red]'>{emailError}  </div>}
                        <input name='password' onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)}
                         value={password} autoComplete='off' type={visible ? "text" : "password"}
                            placeholder='Password' className="w-full p-2 my-2 outline-none border-[#000] ff mt-2 " />
                        {(passwordError && passwordDirty) && <div className='text-[red]'>{passwordError}</div>}
                        <button disabled={!formValid} onClick={() => authLogin(data)}
                            className='border p-[3px] w-full rounded-[4px] my-4 border-[#F29314] flex justify-center items-center'>
                                <span className='mr-2'>Log In</span> <span className='mt-[3px]'><PlayCircle size={14} color='#F29314' /></span> </button>
                        <div onClick={() => setVisible(!visible)} className='absolute right-2  md:bottom-[95px] bottom-[98px] cursor-pointer'>{visible ? 
                        <EyeOff className="mr-2" size={18} /> : <Eye className="mr-2" size={18} />} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login