import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactPaginate from 'react-paginate';
import { checkToken, GET } from '../../api/frontApi';
import { NavLink } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import { navigateTo } from '../../utils/navigation';

const Purchases = () => {

    const [product, setProduct] = useState('')
    const [pageCount, setPageCount] = useState(1)
    const [page, setPage] = useState(0);
    const perPage = 4;

    async function getItems() {
        await checkToken()
        const response = await GET(`/front/purchase-user?page=${page}&limit=${perPage}`)
        setProduct(response.paginatedItems)
        setPageCount(Math.ceil(response.totalItems / perPage))
    }

    const handlePageClick = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };

    useEffect(() => {
        getItems()
    }, [page])

    return (
        <div className=' relative md:h-[450px] w-[90%] mx-auto h-[550px] text-[10px]'>
            {/* <NavLink to="/" className="no-underline w-[100px]  bg-[red]">
              <button className='flex items-center w-[100px] text-[#8E8E93]'><ChevronLeft size={17} /> <span className='mb-[1px]'>Back</span></button>
            </NavLink> */}
            {/* <h1 className='my-4'>Purchases</h1> */}
            <h1 className='my-3 md:hidden'>Orders</h1>
            {
               Array.isArray(product) && product.length > 0 ? 
                <div style={{ overflowX: 'auto' }} className='' >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><div className='text-[16px]'>#</div></TableCell>
                                <TableCell><div className='text-[16px]'>OrderID</div></TableCell>
                                <TableCell align="center">Courier</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align="center">Date Ordered</TableCell>
                                <TableCell align="center"><div className='text-[14px]'>Payment Method</div> </TableCell>
                                <TableCell align="center"><div className='text-[14px]'>Total Price</div> </TableCell>
                                {/* <TableCell align="center"><div className='text-[16px]'>Total Price</div> </TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(product) &&
                                product.map((item, idx) => (
                                    <TableRow
                                        key={idx + 1}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row"><div className='text-[16px]'>{idx + 1}</div></TableCell>
                                        <TableCell align="left">{item._id} </TableCell>
                                        <TableCell align="center">{item.courier?.name} </TableCell>
                                        <TableCell align="center"  >{item.courier?.phoneNumber} </TableCell>
                                        <TableCell align="center"> {`${item.dateOrdered.day}/${item.dateOrdered.month}/${item.dateOrdered.year} \t
                                        ${item.dateOrdered.hours.hour}:${item.dateOrdered.hours.minutes}`} </TableCell>
                                            <TableCell align="center">{item.paymentMethod} </TableCell>
                                          <TableCell align="center">{item.totalPrice} </TableCell>
                                       </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
                :
                <div>You have no purchases yet</div>
            }
           
            <div className='absolute bottom-0 right-0'>

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
}

export default Purchases