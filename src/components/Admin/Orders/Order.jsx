import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX } from 'react-feather';
import { DELETE, GET, PUT, UpdateStatus } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { FaList } from "react-icons/fa";

const Product = () => {
  const [product, setProduct] = useState('')
  const [search, setSearch] = useState('')
  const [pageCount, setPageCount] = useState(1)
  // const [status, setStatus] = useState('')

  const [page, setPage] = useState(0);
  const perPage = 11;
  const startIndex = (page - 1) * perPage; 

  async function getItems() {
    const response = await GET(`/order/order-list?page=${page}&limit=${perPage}&search=${search}`)
    setProduct(response.paginatedItems)
    setPageCount(Math.ceil(response.totalItems / perPage))
  }

  const handlePageClick = (selectedPage) => { 
    setPage(selectedPage.selected + 1);
  };

  async function deleteItem(id) {
    await DELETE('/order/' + id)
    getItems()
  }

  async function updateStatus(id) {
    await PUT("/order/" + id)
    // setStatus(data.status)
    getItems()
  }
 
  useEffect(() => {
    getItems()
  }, [page,search])

  return (
    <div className="background-white mx-3 box-shadow br-5 min-h-screen">
      <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
        <FaList className='mr-2' color='#F29314' size={22} /> <span className='text-[25px]'>Orders</span>
      </div>
      <div className="px-3 pb-4 pt-2">
        <div className="mb-4 d-flex justify-content-between">
          {/* <NavLink to='/admin/product/create' className="no-underline">
            <button className=" flex items-center bg-[#3ECF8E] p-2 rounded-md text-[#fff]">
              <PlusCircle size={18} className='mr-1' />
              <div className=''>Create new</div>
            </button>
          </NavLink> */} 
          <div></div>
          <div className="relative flex justify-end">
            <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="z-0  pl-6 ff" placeholder='Search' />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-bordered">
            <thead>
              <tr className='backgroung-grey'>
                <th className="text-center">#</th>
                <th className="text-center">OrderID</th>
                <th className="text-center">Customer</th>
                <th className="text-center">DateOrdered</th>
                <th className="text-center">Total</th>
                <th className="text-center">Payment Method</th>
                <th className="text-center">Address </th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody style={{ overflowX: 'auto' }}>
              {
                Array.isArray(product) ?
                  product.map((idx, item) => {
                    return (
                      <tr key={item} className='text-[14px] h-10'>
                        <td className="text-center ">{page == 0 ? (item + 1) : startIndex + item + 1}</td>
                        <td className="text-left flex items-center ">{idx._id}</td>
                        <td className="text-center">{idx?.user?.email}</td>
                        <td className="text-center">{`${idx.dateOrdered.day}/${idx.dateOrdered.month}/${idx.dateOrdered.year} \t
                  ${idx.dateOrdered.hours.hour}:${idx.dateOrdered.hours.minutes}`} </td>
                        <td className="text-center">{idx?.totalPrice } {`${'\n'}`}sum</td>
                        <td className="text-center">{idx?.paymentMethod}</td>
                        <td className="text-center">{`${idx?.location.city} ${',\n'} ${idx?.location.district} ${',\n'} ${idx?.location.street}`}</td>
                        <td className="text-center">
                          {
                            idx.status === "shifting" ?
                              <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#189ED3' }}> <CheckCircle size={16} /> </button>
                              :
                              <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#FF0800' }}> <XCircle size={16} /> </button>
                          }
                        </td>
                        <td>
                          <button onClick={() => updateStatus(idx._id)} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}>
                            <CheckCircle color={'#5C3EBA'} size={16} /></button>
                       
                        
                        </td>
                        <td>
                          <button onClick={() => deleteItem(idx._id)} className="btn btn-table mr-0" 
                          style={{ backgroundColor: '#F4F4F5' }}><Trash2 color={'#E63950'} size={16} /></button>
                        </td>
                      </tr>
                    )
                  })
                  : null
              }
            </tbody>
          </table>
          <div className='absolute right-5 bottom-[-15px]'>
          {/* <div>{pagination.pageCount}</div> */}
          {/* <div>{pagination.pageCount}</div> */}
          {/* <button disabled={page === 1} onClick={handlePrevious}>Previous</button>
        <button disabled={page === pageCount} onClick={handleNext}>Next</button> */}
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
  )
}

export default Product
