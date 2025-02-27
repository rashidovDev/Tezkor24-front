import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX, User, Plus } from 'react-feather';
import { checkToken, DELETE, GET, PUT } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { BiUserCircle } from 'react-icons/bi';
import Modal from '../../Modal/Modal';
import { hideModal, showModal } from '../../../store/slices/modalSlice';

const Category = () => {

  const [brand, setBrand] = useState('')
  const [search, setSearch] = useState('') 
  const [pageCount, setPageCount] = useState(1)
  const [brandItem, setBrandItem] = useState('')
  const [subcategory, setSubcategory] = useState()
  const [category, setCategory] = useState()
  const [parameter, setParameter] = useState()

  const [subcat, setSubcat] = useState()
  const [cat, setCat] = useState()
  const [brandId, setBrandId] = useState()

  const [selectedSubcategory, setSelectedsubcategory] = useState([])
  const [selectedcategory, setSelectedcategory] = useState([])

 console.log("SUB", selectedSubcategory)
  const [page, setPage] = useState(0);
  const perPage = 10;
  const startIndex = (page - 1) * perPage; 

  const baseURL = process.env.REACT_APP_IMAGE;

  async function getItems() {
     const response = await GET(`/category/brand-list?page=${page}&limit=${perPage}&search=${search}`)
     setBrand(response.paginatedItems)
     setPageCount(Math.ceil(response.totalItems / perPage))
   }

   async function getSubcategories() {
    const response = await GET(`/subcategory/subcategory-list`)
    setSubcat(response)
   }

   async function getcategories() {
    const response = await GET(`/category/category-list`)
    setCat(response)
   }

   async function addRemoveSubcategory(){
    await PUT(`/subcategory/add-subcategory`, {selectedSubcategory, brandId})
    setSubcategory('')
    getSubcategories()
    getItems()
   }

   async function addRemoveCategory(){
    await PUT(`/category/add-category`, {selectedSubcategory, brandId})
    setSubcategory('')
    getSubcategories()
    getItems()
   }


  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

// async function deleteItem(id) {
//   await DELETE('/auth/user-list/' + id)
//   getItems()
// }

const dispatch = useDispatch()


  useEffect(() => {
        getItems()
        getSubcategories()
        getcategories()
  },[page,search])

  const owner = JSON.parse(localStorage.getItem("admin_user"))

  if(owner.data.user.roles.includes("owner")){
    return (
      <>
      <Modal>
        <div className='w-full mx-auto flex flex-col justify-center'>
        <div className='flex my-1  items-center'><img className='rounded-[10px] w-[90px] h-[60px] object-cover mr-1'
                      src={`${baseURL}${brandItem.image}`} alt="Brand image" /> <h4>{brandItem.name}</h4></div>
       <div className='p-2  select-none  category-list w-full '>
   
       {Array.isArray(parameter) ? 
    parameter
      // .filter(item => !brandItem?.subcategory?.includes(item.name)) // ✅ Correct filtering
      .map((item, idx) => ( // ✅ Then use `.map()` to render JSX
        <div key={idx + 1}>
          <div
            onClick={() => {
              setSelectedsubcategory(prev => {
                const updatedArray = Array.isArray(prev) ? [...prev] : []; // Ensure it's an array
              
                return updatedArray.includes(item.name)
                  ? updatedArray.filter(sub => sub !== item.name) // Remove item
                  : [...updatedArray, item.name]; // Add item
              })
            }}
            className={`${selectedSubcategory?.includes(item.name) ? 'main-bg': ''}
             mx-1 px-2 py-1  flex justify-center border items-center text-[12px] rounded-2xl cursor-pointer`}
          >
            {item.name}
          </div>
        </div>
      ))
  : <div>Subcategory not found</div>}
       </div>

       {
        parameter == cat ?   <div className='flex justify-end items-center'>
          <div>

        <button onClick={() =>{
    addRemoveCategory()
    dispatch(hideModal())
        } } className='main-bg p-2 w-[100px] rounded-xl'>Add</button>
          </div>
        </div> : parameter == subcat &&
         <div className='flex justify-end items-center'>
         <button onClick={() =>{
     addRemoveSubcategory()
     dispatch(hideModal())
         } } className='main-bg text-[#fff]
          p-2 w-[100px] rounded-xl'>Add</button>
         </div>
       } 
       
        </div>
      </Modal>

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
                <th className="text-center"></th>
                <th className="text-center">Name</th>
                <th className="text-center">Category</th>
                <th className="text-center">Sub category</th>
              
              </tr>
            </thead>
            <tbody style={{ overflowX: 'auto'}}>
              { 
               Array.isArray(brand) ?
                brand.map((idx,item) => {
                return (
                  <tr  key={item} className="h-[35px]">
                     <td className="text-center w-[40px]">{page == 0 ? (item + 1) : startIndex + item + 1}</td>
                     <td className="w-[80px]">
                     <img className='rounded-[10px] w-[60px] h-[40px]'
                      src={`${baseURL}${idx.image}`} alt="Brand image" />
                    </td>
                    <td className="text-center w-[180px]">{idx.name}</td>
                    
                        <td className="text-center w-[150px]">
                        <div className='flex justify-between '>
                            {Array.isArray(idx.category) ? idx.category.map((br, idx) => {
                                return(
                                    <span key={idx + 1} className='h-[10px] text-[12px]'>{br},</span> 
                                )         
                            }) : <div className='w-1'></div> }
                      
                        <span onClick={() => {
                        setParameter(cat)
                        setBrandItem(idx)
                        setBrandId(idx._id)
                        dispatch(showModal())
                        }}> <button  className="btn btn-table mr-0 text-center ml-2" 
                        style={{ backgroundColor: '#F4F4F5' }}><PlusCircle color={'#E63950'} size={16} />
                        </button>
                        </span>
                        </div>
                   
                    </td>

                    <td className="text-center w-[150px]">
                        <div className='flex justify-between '>
                            {Array.isArray(idx.subcategory) ? idx.subcategory.map((br, idx) => {
                                return(
                                    <span key={idx + 1} className='h-[10px] text-[12px]'>{br},</span> 
                                )         
                            }) : <div className='w-1'></div> }
                      
                        <span onClick={() => {
                        setParameter(subcat)
                        setBrandItem(idx)
                        setBrandId(idx._id)
                        dispatch(showModal())
                        }}> <button  className="btn btn-table mr-0 text-center ml-2" 
                        style={{ backgroundColor: '#F4F4F5' }}><PlusCircle color={'#E63950'} size={16} />
                        </button>
                        </span>
                        </div>
                   
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
      </>
      
      
    )
  }else{
  return(
    <div className='flex justify-center items-center h-[700px] text-[40px]'>
      Only owner can see this page
    </div>
  )
  }

  
}

export default Category