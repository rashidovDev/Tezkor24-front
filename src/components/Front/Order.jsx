import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearBasket, removeItemFromCart, setOrder } from '../../store/slices/basketSlice';
import { Minus, Plus } from 'react-feather';
import { GET, PGET, POST } from '../../api/frontApi';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { hideModal, showModal } from '../../store/slices/modalSlice';

const Order = () => {
  const [districts, setDistricts] = useState([])

  const [city, setCity] = useState('Toshkent shahri')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
  const url = process.env.REACT_APP_IMAGE;
  let regionID = 14

  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  const location = {
    city,
    district,
    street
  }
  
  const payload = {
    location,
    paymentMethod
  }

  const navigate = useNavigate()

  const getDistrict = async () => {
    const response = await PGET(`/location/district?regionId=${regionID}`)
    setDistricts(response)
  }

  const orders = useSelector(state => state.basket.order)

  async function createOrder() {
    const response = await POST('/order', {orders})
    if (response) {
      navigate('/')
    }
  }

  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    // Toggle the checkbox value
    setIsChecked(!isChecked);
  };



  const getData = () => {
    getDistrict()
  }

  useEffect(() => {
     getData()
     if(!orderItem){
      navigate('/')
     }
  },[])

  const dispatch = useDispatch()

  const orderItem = useSelector(state => state.basket.items)
  const totalPrice = useSelector(state => state.basket.totalAmount)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({});
  return (
    <>
<Modal>
<div className='w-[300px]'>
<p className=' p-3 text-[24px] font-semibold '>Are you confirm?</p>
<div className='flex justify-end'>
<button onClick={() => {
dispatch(hideModal())

} } className='bg-[#FF0800] text-[#fff] w-[70px] h-[40px] p-2 mr-1 rounded-md cursor-pointer'>Cancel</button>
<button onClick={() => {
createOrder()
dispatch(clearBasket())
}} className='main-bg p-2 w-[70px] h-[40px] ml-2 rounded-md cursor-pointer'>Confirm</button>
</div>
</div>

</Modal>

<div className='md:mt-[50px] mt-[10px]  h-max w-[95%] md:w-[90%] mb-10 mx-auto'>
  <h1>Order</h1>
  <div className='mb-[20px]'>
    <div className='md:flex  '>
        <div className="my-[40px]">
          <label htmlFor="country" className='w-[120px] ml-2 mb-1 font-semibold'>City</label>
          <select disabled value={city} onChange={() => setCity("Toshkent shahri")} id="category" name="category"
           className='border ml-1 border-sky-500 p-2 w-[250px] outline-[#5C3EBA]'>
            <option value="Toshkent"> Toshkent</option>
          </select>
        </div>

        <div className="my-[40px]">
          <label htmlFor="country" className='w-[120px] ml-2 mb-1 font-semibold'>District</label>
          <select  value={district} onChange={(e) => setDistrict(e.target.value)} id="category" name="category" className='border ml-1 border-sky-500 p-2 w-[250px] outline-[#5C3EBA]'>
            {
              districts.map((district, idx) => {
                return(
                  <option key={idx + 1} value={district.name_uz}>{district.name_uz}</option>
                )
              })
            }
          </select>
        </div>

        <div className = "mt-[40px] items-center">
          <label htmlFor="street" className='w-[120px] ml-2 font-semibold'>Exact address</label>
          <textarea autoComplete="false" value={street} onChange={(e) => setStreet(e.target.value)} id='street' type="text" placeholder='Amir Temur street, 107' 
          className='border ml-1 border-sky-500 p-2 w-[250px] outline-[#000]'/>
        </div>  

        <div className = "mt-[40px] items-center">
          <label htmlFor="street" className='w-[150px] ml-2 font-semibold'>Payment Method</label>
          <div className='flex flex-col'>
          <div className='my-[2px]'>
      <input
      className='ml-2'
      type="radio"
      name="payment"
      value="cash"
      checked={paymentMethod === 'cash'}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
     <label className='ml-2'> Cash
    </label>
      </div> 
      <div className='my-[2px]'>
      <input
      disabled
      className='ml-2'
      type="radio"
      name="payment"
      value="card"
      checked={paymentMethod === 'card'}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
     <label className='ml-2'> Card
    </label>
      </div>   
       
    
  
     

  {/* <p className='w-[200px] font-semibold'>Selected method: {selectedValue}</p> */}
          </div>
        </div>      
    </div>

  </div>
  {/* Order Food */}
  <div className='mb-[100px]'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><div className='text-[16px]'>Orders</div></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"><div className='text-[16px]'>Price</div> </TableCell>
            <TableCell align="center"><div className='text-[16px]'>Count</div> </TableCell>
            <TableCell align="center"><div className='text-[16px]'>Total Price</div> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItem.map((order) => (
            <TableRow
              key={order.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className='text-[16px]'>{order.name}</div>
              </TableCell>
              <TableCell align="center">
                <div className='flex justify-center'>

              <img className='w-[80px] h-[55px] object-cover rounded-md' src={`${url}${order.image}`} alt="orderPhoto" />
              </div>
              </TableCell>
              <TableCell align="center"  > <div className='text-[16px]'>{order.price}</div> </TableCell>
              <TableCell align="center">
                <div className='font-medium flex items-center py-1 justify-center'>
                  <div
                    className=' flex justify-center items-center cursor-pointer relative w-[30px] h-[30px] text-center rounded-[3px] bg-[#E7E7EA] text-[#000]'>
                    <button
                      onClick={() => dispatch(removeItemFromCart(order.id))}
                      className='text-[30px]'><Minus /></button>
                  </div>
                  <div className='px-3 text-[16px]'>{order.quantity}</div>
                  <div
                    onClick={() => dispatch(addItemToCart(order))}
                    className=' flex justify-center items-center cursor-pointer relative w-[30px] h-[30px] text-center rounded-[3px] bg-[#E7E7EA] text-[#000]'>
                    <button className='text-[30px]'><Plus /></button>
                  </div>
                </div>
              </TableCell>
              <TableCell align="center"> <div className='text-[16px]'>{order.totalPrice}</div> </TableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <div className='text-[16px] font-bold'>Total</div>
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"><div className='text-[16px] font-bold'>{totalPrice}</div></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </div>

  <div className='flex justify-end items-end cursor-pointer'>
    <button 
    onClick={() => {
      dispatch(setOrder(payload))
      dispatch(showModal())
    }}
     className='w-[150px] p-[12px] rounded-md main-bg
      text-[#fff] text-[20px] cursor-pointer'>Order</button>
  </div>
</div>
    </>
    
  )
}

export default Order