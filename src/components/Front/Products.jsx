import { useEffect, useState } from 'react'
import { GET } from '../../api/frontApi'
import ReactPaginate from 'react-paginate';
import {useDispatch} from "react-redux"
import { addItemToCart } from '../../store/slices/basketSlice';
import Basket from './Basket';

const Products = () => {
    const [category, setCategory] = useState("")
    const [isButton, setIsButton] = useState('')
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState('') 
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState([1,2,3,4,5,6,7,8])

    const [page, setPage] = useState(0);
    const perPage = 8;

    async function getItems() {
        const response = await GET(`/product/product-list?category=${category}&page=${page}&limit=${perPage}&search=${search}`)
        setProduct(response.paginatedItems)
        setLoading(false)
        setPageCount(Math.ceil(response.totalItems/perPage))
    }

    const handlePageClick = (selectedPage) => {
        setPage(selectedPage.selected + 1);
      };
    

    // const getProducts = async () => {
    //     const response = await GET(`/product`)
    //     setProduct(response.data)
    // }

    const dispatch = useDispatch()

    const addProduct = (product) => {
       dispatch(addItemToCart(product))
    }

    useEffect(() => {
        getItems()
        // getProducts()
    }, [page,search,category])

    return (
        <div className='bg-[#F6F7F9] mt-5 pb-5'>
             <h1 className='text-[#8633E0] text-center pt-4'>Products</h1>
             <div className='md:w-[80%] m-auto py-5 flex relative'>
            <div className='w-1/5 pr-5'>
                <div className=''>
                    <div className='bg-[#8633E0] p-3 rounded-t-lg'>
                        <h2 className='text-center text-[#fff] '>Category</h2>
                    </div>
                    <div className='flex flex-col text-[20px] bg-[#fff]'>
                        <button onClick={() => setCategory("")} className={`py-3 border ${category === "" ? 'bg-[#8633E0] text-[#fff]' : 'hover:bg-[#8633E0]'}  hover:text-[#fff]`} >All Products</button>
                        <button onClick={() => setCategory("Smartphone")} className={`py-3 border ${category === "Smartphone" ? 'bg-[#8633E0] text-[#fff]' : 'hover:bg-[#8633E0]'}  hover:text-[#fff]`} >Smartphones</button>
                        <button onClick={() => setCategory("Laptop")} className={`py-3 border ${category === "Laptop" ? 'bg-[#8633E0] text-[#fff]' : 'hover:bg-[#8633E0]'}  hover:text-[#fff]`}>Laptops</button>
                        <button onClick={() => setCategory("Accesory")} className={`py-3 border ${category === "Accesory" ? 'bg-[#8633E0] text-[#fff]' : 'hover:bg-[#8633E0]'}  hover:text-[#fff]`}>Accesories</button>
                    </div>
                </div>
            </div>
            <div className='w-[4/5] ml-5 grid-system'>

                { loading ?
                        count.map((coun, idx )=> {
                            return (
                                <div key={idx + 1} className='bg-[#fff] shadow mb-4 w-[220px] mr-3 p-3 hover:translate-y-3 ease-in duration-300'>
                                <img className='mt-2 mb-3 h-[150px] w-screen skeleton '  alt="" />
                                <h5 className='skeleton skeleton-title h-[20px]'></h5>
                                <p className='py-1 skeleton skeleton-description h-[20px]'></p>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <p className='text-[20px] mt-[10px] skeleton-price'></p>
                                    </div>
                                    <div className=''>
                                            <div className='bg-[#EFEFEF] p-1 flex items-center rounded-[5px]'>
                                            <div className='skeleton-rating'></div>
                                            </div>
                                    </div>
                                </div>
                            </div> 
                            )
                        })
                   :
                    product.length > 0 ? product.map((prod, idx)=> {
                        return(
                            <div key={idx + 1} onMouseMove={() => setIsButton(prod._id)} onMouseLeave={() => setIsButton('')}
                            className='bg-[#fff]  shadow mb-4 w-[220px] mr-3 p-3 hover:translate-y-3 ease-in duration-300'>
                            <img className='mt-2 ml-3 h-[150px]' src={`http://localhost:5000/${prod.image}`} alt="" />
                            <h5 className='pt-3'>{prod.name}</h5>
                            <p className='py-1'>{prod.description.slice(0,22)}</p>
                            <div className='flex bottom-0 justify-between items-center'>
                                <div>
                                    <p className='text-[20px] mt-[10px]'>{prod.price}$</p>
                                </div>
                                <div className=''>
                                    {isButton === prod._id ?
                                        <button 
                                        onClick={() => {
                                            addProduct(prod)
                                        }}
                                        className='bg-[#8633E0] py-1 px-2 text-[#fff] rounded-[6px] '>
                                            Add to Cart
                                        </button>
                                        :
                                        <div className='bg-[#EFEFEF] p-1 flex items-center rounded-[5px]'>
                                            <img className='w-[17px] pr-[2px]' src={require("../../assets/newstar.png")} alt="" />
                                            <span className='text-[12px] my-[2px] text-[#7A7A7A]'>4.7</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        )
                    }) :  <div className='flex justify-center items-center'>
                        <h2>Nothing is found</h2>
                    </div>
                }
            </div>
        <div className='absolute right-5 bottom-[-35px]'>
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

export default Products