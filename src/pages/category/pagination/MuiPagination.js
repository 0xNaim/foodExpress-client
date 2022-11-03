import React from 'react';
import { Pagination } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MuiPagination = (props) => {

    const {products, postsPerPage, handleChange, currentPage, setCurrentPage} = props;

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(products / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const nextPage = ()=>{
        setCurrentPage(currentPage + 1)
    }
    const prevPage = ()=>{
        if(currentPage === 1){
            return
        }
        setCurrentPage(currentPage - 1)
    }

  return (
    // <Pagination count={5} variant="outlined" shape="rounded" onChange={handleChange} />
    <div style={{display:"flex", gap:"2rem"}}>
       <div onClick={prevPage} style={{background:"#078852",display:"flex", alignItems:"center", justifyContent:"center"}}><KeyboardArrowLeftIcon sx={{cursor:"pointer", height:"2rem", width:"2rem", color:"white"}}/></div> 
       <div onClick={nextPage} style={{background:"#078852",display:"flex", alignItems:"center", justifyContent:"center"}}><KeyboardArrowRightIcon sx={{cursor:"pointer", height:"2rem", width:"2rem", color:"white"}}/></div> 

    </div>

  )
}

export default MuiPagination