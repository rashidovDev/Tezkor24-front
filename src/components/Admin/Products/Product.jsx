import React, { useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX } from 'react-feather';
import { DELETE, GET } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

const Product = () => {
  const {id} = useParams()
  const [product, setProduct] = useState('')
  const [search, setSearch] = useState('') 
  const [pageCount, setPageCount] = useState(1)

  const [page, setPage] = useState(0);
  const perPage = 6;

  async function getItems() {
    const response = await GET(`/product/?id=${id}&page=${page}&limit=${perPage}&search=${search}`)
    setProduct(response.paginatedItems)
    setPageCount(Math.ceil(response.totalItems/perPage))
}

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

async function deleteItem(id) {
  await DELETE('/product/' + id)
  getItems()
}

  useEffect(() => {
        getItems()
  },[page,search])

  return (
    <div className="background-white mx-3 box-shadow br-5 h-[620px]">
    <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
      <Users className='mr-2' color='#5C3EBA' /> <span className='text-[25px]'>Users</span>
    </div>
    <div className="px-3 pb-4 pt-2">
      <div className="mb-4 d-flex justify-content-between">
        <NavLink to='/admin/product/create' className="no-underline">
          <button className=" flex items-center bg-[#3ECF8E] p-2 rounded-md text-[#fff]">
            <PlusCircle size={18} className='mr-1' />
            <div className=''>Create new</div>
          </button>
        </NavLink>
        <div className="relative">
          <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="z-0  pl-6 ff" placeholder='Search' />
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table table-bordered">
          <thead>
            <tr className='backgroung-grey'>
            <th className="text-center">#</th>
              <th className="text-center">Product Name</th>
              <th className="text-center">Category</th>
              <th className="text-center">Count</th>
              <th className="text-center">Price</th>
              <th className="text-center">Rating</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'auto' }}>
            { 
             Array.isArray(product) ?
              product.map((idx,item) => {
              return (
                <tr key={item}>
                   <td className="text-center">{item + 1}</td>
                  <td className="text-left flex items-center">{idx.name}</td>
                  <td className="text-center">{idx.category}</td>
                  <td className="text-center">{idx?.countInStock}</td>
                  <td className="text-center">{idx?.price}$</td>
                  <td className="text-center">{idx?.rating}</td>
                  <td className="text-center w-[70px]">
                  <img className='w-[70px] text-center flex object-cover ' src={`http://localhost:5000/${idx.image}`} alt="" />
                  </td> 
                 
                  <td className="text-center"><NavLink to={'/admin/product/update/' + idx._id}><button className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><Edit3 color={'#189ED3'} size={16} /></button></NavLink></td>
                  <td>
                    {/* <div className="d-flex"> */}
                      {/* <button onClick={() => active(item)} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><CheckCircle color={'#5C3EBA'} size={16} /></button> */}
          
                      <button onClick={() => deleteItem(idx._id)} className="btn btn-table mr-0" style={{ backgroundColor: '#F4F4F5' }}><Trash2 color={'#E63950'} size={16} /></button>
                
                  </td>
                </tr>
              )
            })
            : null
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
  )
}

export default Product
