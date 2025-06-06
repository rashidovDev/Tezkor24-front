import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX, User } from 'react-feather';
import { checkToken, DELETE, GET, PUT } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { BiUserCircle } from 'react-icons/bi';

const Admin = () => {

  const [user, setUser] = useState({})
  const [admin, setAdmin] = useState({})
  const [isLink, setIslink] = useState(false)
  const [search, setSearch] = useState('') 
  const [pageCount, setPageCount] = useState(1)

  const [page, setPage] = useState(0);
  const perPage = 7;
  const startIndex = (page - 1) * perPage; 

  async function getItems() {
    const response = await GET(`/auth/admin-list?page=${page}&limit=${perPage}&search=${search}`)
    setUser(response.paginatedItems)

    setPageCount(Math.ceil(response.totalItems/perPage))
}

console.log("user", user)

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

// async function deleteItem(id) {
//   await DELETE('/auth/user-list/' + id)
//   getItems()
// }


async function getAdmin(){
	const currentUser = JSON.parse(localStorage.getItem("admin_user"))
    setIslink(currentUser.data.user.roles.includes("owner"))
    setAdmin(currentUser.data.user)
}

async function deleteItem(id) {
  await DELETE('/auth/' + id)
  getItems()
}

  useEffect(() => {
        getItems()
        getAdmin()
  },[page,search])

  const owner = JSON.parse(localStorage.getItem("admin_user"))

  if(owner.data.user.roles.includes("owner")){
    return (
      <div className="background-white mx-3 box-shadow br-5 flex-1 overflow-auto min-h-screen">
      <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
        <User className='mr-2' color='#F29314' /> <span className='text-[25px]'>Admins</span>
      </div>
      <div className="px-3 pb-4 pt-2">
        <div className="mb-4 d-flex justify-content-between">
            <NavLink to='/admin/admin/create' className="no-underline">
            <button className=" flex items-center main-bg p-2 rounded-md">
              <PlusCircle size={18} className='mr-1' />
              <div className=''>Add Adminstrator</div>
            </button>
          </NavLink>
          <div className="relative">
            <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="z-0  pl-6 ff" placeholder='Search' />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
        <table className="table table-bordered text-[14px]">
            <thead>
              <tr className='backgroung-grey bg-gray-200 h-10'>
              <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Registration date</th>
                <th className="text-center">Phone Number</th>
              </tr>
            </thead>
            <tbody style={{ overflowX: 'auto' }}>
              { 
               Array.isArray(user) ?
                user.map((idx,item) => {
                return (
                  <tr  key={item} className="h-[35px]">
                     <td className="text-center">{page == 0 ? (item + 1) : startIndex + item + 1}</td>
                     <td className="text-center">{idx?.name}</td>
                    <td className="text-center">{idx.email}</td>
                     <td className="text-center">{`${idx.dateRegistered.day}/${idx.dateRegistered.month}/${idx.dateRegistered.year} \t
                  ${idx.dateRegistered.hours.hour}:${idx.dateRegistered.hours.minutes}`} </td>
                    <td className="text-center">{idx?.phoneNumber}</td>
                   
                 
                    {/* <td className="text-center">
                      {
                        item.activated ?
                          <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#189ED3' }}><CheckCircle size={16} /></button>
                          : <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#E63950' }}><XCircle size={16} /> </button>
                      }
                    </td> */}
                   
                    <td className="text-center"><NavLink to={'/admin/courier/update/' + idx._id}><button className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><Edit3 color={'#189ED3'} size={16} /></button></NavLink></td>
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
    )
  }else{
  return(
    <div className='flex justify-center items-center h-[700px] text-[40px]'>
      Only owner can see this page
    </div>
  )
  }

  
}

export default Admin
