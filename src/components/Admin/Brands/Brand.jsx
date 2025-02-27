import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX, Save, ShoppingBag, Plus, X } from 'react-feather';
import { DELETE, FILE, GET, UpdateStatus } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../../store/slices/modalSlice';
import Modal from '../../Modal/Modal';

const Brand = () => {
  const [brand, setBrand] = useState('')
  const [brandId, setBrandId] = useState('')
  const [search, setSearch] = useState('')
  const [deleteItemId, setDeleteItemId] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const [file, setFile] = useState('')
  const [page, setPage] = useState(0);


  const baseURL = process.env.REACT_APP_IMAGE;
  const perPage = 6;

  const navigate = useNavigate()

  async function getItems() {
    const response = await GET(`/brand/brand-list?page=${page}&limit=${perPage}&search=${search}`)
    setBrand(response.paginatedItems)
    setPageCount(Math.ceil(response.totalItems / perPage))
  }

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  

  async function deleteItem(id) {
    await DELETE('/brand/' + id)
    getItems()
  }

  async function updateOffer(id) {
    await UpdateStatus('/brand/add-offers/' + id)
    getItems()
  }

  const dispatch = useDispatch()

  useEffect(() => {
    getItems()
  }, [page, search])

  return (
    <>

  

      <Modal>
        <div className='p-3 '>
          <p className='text-center text-[22px]'>Do you confirm to delete this brand?</p>
          <div className='flex justify-end text-[#fff] bottom-0 text-[17px]'>
            <Link to="/admin/brand" className='no-underline text-[#fff]'>
              <button onClick={() => dispatch(hideModal())} className='mr-5 p-[6px] underline-none w-[80px] flex items-center text-center justify-center rounded-[6px] bg-[red]'>
                <span className='text-[15px] mr-[5px] mt-[2px]'><XCircle size={14} /></span> <span>Cancel</span>
              </button>
            </Link>
            <button onClick={() => {
              deleteItem(deleteItemId)
              dispatch(hideModal())
            }} className='p-[6px] w-[80px] flex items-center text-center justify-center  rounded-[6px] bg-[#5C3EBA]'>
              <span className='mr-[5px] mt-[2px]'><Save size={14} /></span> <span>Delete</span>
            </button>
          </div>
        </div>
      </Modal>

      <div className="background-white mx-3 box-shadow br-5 h-[800px]">
        <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
          <ShoppingBag className='mr-2' color='#F29314' /> <span className='text-[25px]'>Brands</span>
        </div>
        <div className="px-3 pb-4 pt-2">
          <div className="mb-4 d-flex justify-content-between">
            <NavLink to='/admin/brand/create' className="no-underline">
              <button className=" flex items-center main-bg p-2 rounded-md text-[#fff]">
                <PlusCircle size={18} className='mr-1' />
                <div className=''>Create new</div>
              </button>
            </NavLink>
            <div className="relative">
              <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
              <input onChange={(e) => setSearch(e.target.value)} value={search} 
              type="text" className="z-0  pl-6 ff" placeholder='Search' />
            </div>
          </div>
          <div>
            <div className='grid-brand'>
              {Array.isArray(brand) ? brand.map((item, idx) => {
                return (
                  <div key={idx + 1} className='w-[350px] mb-4 relative  rounded-[10px] ease-in duration-300 shadow-product'>
                    <div>
                    {
                    item.image ? 
                    <div 
                    onClick={() => {
                    localStorage.setItem("brandID", item._id)
                    }}>
                    <NavLink to={`/admin/brand/${item._id}`} className="no-underline relative">  
                    <img className='rounded-t-[10px] w-screen object-cover h-[170px] brightness-[0.95] hover:opacity-[0.8]' src={`${baseURL}${item.image}`} alt="Brand image" />
                    <div className='absolute top-1 right-1 text-[#fff] main-bg py-1 px-2 rounded-xl '>{item.offer ? 'Offer' : 'No offer'}</div>
                    {/* {item.logo && <img className='w-[60px] rounded-full absolute top-1 right-2' src={`${baseURL}${item.logo}`} alt="Brand image" />}   */}
                    </NavLink>
                    </div>
                    :
                    <img className='rounded-t-[10px] w-screen object-cover h-[170px]' src={require("../../../assets/imageicon.png")} alt="Brand image" />
                    } 
                    <div className='bg-[#F4F4F5] rounded-[5px] absolute p-1 bottom-[55px] flex items-center right-2'>         
                          <img className='w-[17px] pr-[4px]' src={require("../../../assets/newstar.png")} alt="" />
                          <span className='text-[12px] my-[2px] text-[#7A7A7A]'>{item.rating}</span>
                    </div>

                    </div>
                    <div className='flex h-[75px] justify-between items-center py-[8px] px-3' >
                      <div>
                      <NavLink to={`/admin/brand/${item._id}`} className="no-underline">  
                      <p className='text-[20px] text-[#000] w-[150px] font-[500] mt-1'>{item.name}</p>
                    </NavLink>
                        
                      </div>
                      <div className='p-1 flex items-center rounded-[5px]'>
                        <div className='flex items-center absolute bottom-2 right-2'>
                          <button><NavLink to={'/admin/brand/update/' + item._id}>
                          <button className="btn btn-table mr-2" style={{ backgroundColor: '#F4F4F5' }}><Edit3 color={'#189ED3'} size={16} /></button>
                          </NavLink></button>
                          <button onClick={() => {
                            setDeleteItemId(item._id)
                            dispatch(showModal())
                          }
                          } className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><Trash2 color={'#E63950'} size={16} /></button>

                            <button onClick={() => {
                            updateOffer(item._id)
                           
                          }
                          }
                           title="Click to submit the form"
                           className="btn btn-table ml-2" style={{ backgroundColor: '#F4F4F5' }}>
                            {item.offer ? <XCircle color={'red'} size={16}/> : <CheckCircle color={'green'} size={16} />}
                            </button>
                       
                        </div>   
                       
                      </div>
                      
                    </div>
                  </div>
                )
              })
                :
            <div>No Brands</div>
              }

            </div>

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
    </>
  )
}

export default Brand
