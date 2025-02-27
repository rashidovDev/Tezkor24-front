import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX } from 'react-feather';
import { checkToken, DELETE, GET } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { BiUserCircle } from 'react-icons/bi';

const User = () => {

  const [user, setUser] = useState('')
  const [search, setSearch] = useState('') 
  const [pageCount, setPageCount] = useState(1)
  

  const [page, setPage] = useState(0);
  const perPage = 14;
  const startIndex = (page - 1) * perPage; 

  async function getItems() {
    const response = await GET(`/auth/customer-list?page=${page}&limit=${perPage}&search=${search}`)
    setUser(response.paginatedItems)
    setPageCount(Math.ceil(response.totalItems/perPage))
}

//Pagination
const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
};

async function deleteItem(id) {
  await DELETE('/auth/' + id)
  getItems()
}

  useEffect(() => {
        getItems()
  },[page,search])


  return (
    <div className="background-white mx-3 box-shadow br-5 min-h-screen">
    <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
      <Users className='mr-2' color='#F29314' /> <span className='text-[25px]'>Customers</span>
    </div>
    <div className="px-3 pb-4 pt-2">
      <div className="mb-4 d-flex justify-content-between">
        <NavLink to='/admin/customer/create' className="no-underline">
          <button className=" flex items-center main-bg p-2 rounded-md text-[#fff]">
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
            <tr className='backgroung-grey h-8'>
            <th className="text-center">#</th>
              <th className="text-center">Email</th>
              <th className="text-center">Purchases count</th>
              <th className="text-center">Last purchase</th>
              <th className="text-center">Total purchase</th>
              <th className="text-center">Registered date</th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'auto' }}>
            { 
             Array.isArray(user) ?
              user.map((idx,item) => {
              return (
                <tr key={item} className='text-[14px]'>
                   <td className="text-center">{page == 0 ? (item + 1) : startIndex + item + 1}</td>
                  <td className="text-center">{idx.email}</td>
                  <td className="text-center">{idx?.purchasesCount}</td>
                  <td className="text-center">{idx?.lastPurchase ? idx.lastPurchase : 0 }{`\t`}sum</td>
                  <td className="text-center">{idx?.totalPurchase}{`\t`}sum</td>
                  <td className="text-center"> {`${idx.dateRegistered.day}/${idx.dateRegistered.month}/${idx.dateRegistered.year} \t
                  ${idx.dateRegistered.hours.hour}:${idx.dateRegistered.hours.minutes}`} </td>
                  {/* <td className="text-center">
                    {
                      item.activated ?
                        <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#189ED3' }}><CheckCircle size={16} /></button>
                        : <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#E63950' }}><XCircle size={16} /> </button>
                    }
                  </td> */}
                 
                  <td className="text-center"><NavLink to={'/admin/customer/update/' + idx._id}><button className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><Edit3 color={'#189ED3'} size={16} /></button></NavLink></td>
                  <td className='text-center'>
                    {/* <div className="d-flex"> */}
                      {/* <button onClick={() => active(item)} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><CheckCircle color={'#5C3EBA'} size={16} /></button> */}
          
                      <button onClick={() => deleteItem(idx._id)} className="btn btn-table mr-0 text-center" style={{ backgroundColor: '#F4F4F5' }}><Trash2 color={'#E63950'} size={16} /></button>
                
                  </td>
                </tr>
              )
            })
            : null
            }

          </tbody>
        </table>
      </div>
      <div className='absolute right-5 bottom-0'>
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
  )
}

export default User
