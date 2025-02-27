import React, { useEffect } from 'react'
import {  NavLink, } from "react-router-dom";
import { Search, XCircle, PlusCircle, User as Star } from 'react-feather';
import { DELETE, FILE, GET,  UpdateStatus } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, } from 'react-redux';
import { hideModal, showModal } from '../../../store/slices/modalSlice';
import Modal from '../../Modal/Modal';

const Offer = () => {

  const [product, setProduct] = useState()
  const [search, setSearch] = useState('')
  const [file, setFile] = useState('')
  const [productID, setProductID] = useState('')

  const [pageCount, setPageCount] = useState(1)
  const [favourite, setFavourite] = useState(false)

  const baseURL = process.env.REACT_APP_IMAGE

  const [page, setPage] = useState(0);

  let perPage = 7
  const startIndex = (page - 1) * perPage; 


  async function getItems() {
    const response = await GET(`/brand/offers/?page=${page}&limit=${perPage}&search=${search}`)
    setProduct(response.paginatedItems)
    console.log("PAR:",product)
    // setFavourite(!favourite)
    // setPageCount(Math.ceil(response.totalItems / perPage))
  }


  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  async function deleteItem(id) {
    await DELETE('/product/' + id)
    getItems()
  }

  const dispatch = useDispatch()

  async function fileUpload() {
    await FILE(`/file/product/${productID}`, file)
    dispatch(hideModal())
    getItems()
  }

 async function updateOffer(id) {
    await UpdateStatus('/brand/add-offers/' + id)
    getItems()
  }

  useEffect(() => {
    getItems()
  }, [page, search])
  
  return (
    <>
    <Modal>
        <div className='p-3'>
          <p className='text-center'>Upload Image</p>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" accept=".jpg,.jpeg,.png" className='border ml-1 border-sky-500 p-2 w-[300px] outline-[#5C3EBA]' />
          <button className='p-[8px] ml-4 rounded-[6px] text-[#fff] main-bg' onClick={fileUpload}>Upload</button>
        </div>
      </Modal>

      <div className="background-white mx-3 box-shadow br-5 h-[800px]">
      <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
          <Star className='mr-2' color='#F29314' /> <span className='text-[25px]'>Offers</span>
        </div>
        <div className="px-3 pb-4 pt-2">
          <div className="mb-4 d-flex justify-content-between mt-2">
            <NavLink to={`/admin/brand/`} className="no-underline">
              <button className=" flex items-center main-bg  p-2 rounded-md text-[#fff]">
                <PlusCircle size={18} className='mr-1' />
                <div className=''>Add Restaurants</div>
              </button>
            </NavLink>
            <div className="relative">
              <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
              <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="z-0  pl-6 ff" placeholder='Search' />
            </div>
          </div>
          <div>
          <div style={{ overflowX: 'auto' }}>
        <table className="table table-bordered">
          <thead>
            <tr className='backgroung-grey'>
            <th className="text-center w-[30px]">#</th>
              <th className="text-center w-[100px]">Image</th>
              <th className="text-center w-[200px]">Brand Name</th>
              <th className="text-center w-[100px]">Rating</th>
              <th className="text-center w-[50px]">Remove Offer</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'auto' }}>
            { 
             Array.isArray(product) ?
              product.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="text-center">{page == 0 ? (idx + 1) : startIndex + idx + 1} </td>
                  <td className="text-center flex items-center justify-center">
                    {item.image ? (
                    <div>
                      <img className='w-[70px] h-[45px] object-cover' src={`${baseURL}${item.image}`} alt="Product image" />
                    </div>
                    )
                  : 
                  (
                   <div onClick={() => {
                    setProductID(item._id)
                    dispatch(showModal())
                   } } className='flex items-center w-[40px] cursor-pointer'>
                    <img src={require("../../../assets/addImage.png")} alt="" />
                   </div> 
                  )}
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item?.rating}</td>
                     
                  <td className="text-center">
                  <button
                  onClick={() => {
                    updateOffer(item._id)
                    setFavourite(!favourite)
                  }}
                  className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto bh" 
                   style={{  backgroundColor : '#FF0800' }}> <XCircle size={16} /> </button>  
                  </td> 
                  <td className='text-center w-[50px]'>
                 
                  </td>   
                </tr>
              )
            })
            : <div>Anvar</div>
            }
          </tbody>
        </table>
      </div>
      <div className='absolute right-5 bottom-[-15px]'>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Offer
