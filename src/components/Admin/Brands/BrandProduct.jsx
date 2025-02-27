import React, { useEffect } from 'react'
import { Link, NavLink, useParams } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX, Save, ShoppingBag } from 'react-feather';
import { DELETE, FILE, GET, PUT } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../../store/slices/modalSlice';
import Modal from '../../Modal/Modal';

const BrandProduct = () => {
  const {id} = useParams()
  const [brand, setBrand] = useState('')
  const [product, setProduct] = useState()
  const [search, setSearch] = useState('')
  const [file, setFile] = useState('')
  const [productID, setProductID] = useState('')
  const [deleteItemId, setDeleteItemId] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const [favourite, setFavourite] = useState(false)

  const baseURL =  process.env.REACT_APP_IMAGE

  const [page, setPage] = useState(0);

  let perPage 
  if(id === '6595a673b49352cc73c71b84'){
  perPage = 7
  }else{
  perPage = 7
  }
 
  async function getItems() {
    const response = await GET(`/product?id=${id}&page=${page}&limit=${perPage}&search=${search}`)
    setProduct(response.paginatedItems)
    setFavourite(!favourite)

    setPageCount(Math.ceil(response.totalItems / perPage))
  }

  async function getBrand() {
    const response = await GET(`/brand/` + id)
    setBrand(response)
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

  async function addOrRemoveFavourite(prod){
    await PUT('/product/favourite/' + prod)
    getItems()
  }

  useEffect(() => {
    getItems()
    getBrand()
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
        <div className="fz20  border-bottom pl-3 py-2 my-1 d-flex align-items-center">
          <div className='relative'>
          <img className='w-[150px] h-[100px] object-cover rounded-md' src={`${baseURL}${brand.image}`} alt="" />
          <img className='w-[30px] absolute top-1 right-1' src={`${baseURL}${brand.logo}`} alt="" />
          </div>
     <span className='text-[25px] pl-[40px]'>{brand.name}</span>
        </div>
        <div className="px-3 pb-4 pt-2">
          <div className="mb-4 d-flex justify-content-between">
            <NavLink to={`/admin/brand/product/create`} className="no-underline">
              <button className=" flex items-center main-bg  p-2 rounded-md text-[#fff]">
                <PlusCircle size={18} className='mr-1' />
                <div className=''>Create new</div>
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
              <th className="text-center w-[200px]">Product Name</th>
              <th className="text-center w-[150px]">Category</th>
              <th className="text-center w-[100px]">Price</th>
              <th className="text-center w-[100px]">Rating</th>
              <th className="text-center w-[200px]">Date created</th>
              <th className="text-center w-[200px]">Last updated</th>
              <th className="text-center w-[150px]">Add favourite</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'auto' }}>
            { 
             Array.isArray(product) ?
              product.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="text-center">{(idx + 1)}</td>
                  <td className="text-center flex items-center justify-center">
                    {item.image ? (
                    <div>
                      <img className='w-[70px] h-[40px]
                       object-cover rounded-md' src={`${baseURL}${item.image}`} alt="Product image" />
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
                  <td className="text-center">{item?.category}</td>
                  <td className="text-center">{item?.price }{'\t'}sum</td>
                  <td className="text-center">{item?.rating}</td>
                  <td className="text-center w-[70px]">
                  {`${item.dateCreated.day}/${item.dateCreated.month}/${item.dateCreated.year} \t
                  ${item.dateCreated.hours.hour}:${item.dateCreated.hours.minutes}`} 
                  </td>       
                  <td className="text-center">
                    {
                     item.lastUpdated ? 
                  <div>
                  {`${item.lastUpdated.day}/${item.lastUpdated.month}/${item.lastUpdated.year} \t
                  ${item.lastUpdated.hours.hour}:${item.lastUpdated.hours.minutes}`} 
                  </div>
                  : <div>No updated</div>
                    }
                  </td> 
                  <td className='text-center w-[50px]'>
                  <button
                  onClick={() => {
                    addOrRemoveFavourite(item._id)
                    setFavourite(!favourite)
                  }}
                  className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto bh"  style={{  backgroundColor : item.favourite ?  '#189ED3' : '#FF0800'   }}> <CheckCircle size={16} /> </button>  
                  </td>   
                  <td className='text-center'>
                    {/* <div className="d-flex"> */}
                      {/* <button onClick={() => active(item)} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><CheckCircle color={'#5C3EBA'} size={16} /></button> */}
                      <NavLink to={'/admin/brand/product/update/' + item._id}><button className="btn btn-table mr-4" style={{ backgroundColor: '#F4F4F5' }}><Edit3 color={'#189ED3'} size={16} /></button></NavLink>
                      <button onClick={() => deleteItem(item._id)} className="btn btn-table mr-0" style={{ backgroundColor: '#F4F4F5' }}><Trash2 color={'#E63950'} size={16} /></button>
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

export default BrandProduct
