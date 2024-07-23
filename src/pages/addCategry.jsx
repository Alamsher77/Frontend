import {ContestContext} from '../api/ContestContext'
import React,{useContext, useState, useEffect} from 'react'
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import logo5 from '../asetes/upload.jpg'
import UploadImage from '../helpers/uploadsImage'
const addCategry = ()=>{

    const {allProductsCategry,categryapi}= useContext(ContestContext)
    const [showCategryForm,setShowCategryForm] = useState(false)
    const [categryValue,setCategyValue] = useState({
      categry:'',
      catelogo:''
    })
  
    const imageHandler = async(e)=>{
   try{
      const uploadsimage = e.target.files[0]
    const uploadsimageresponse = await UploadImage(uploadsimage)
 
    setCategyValue({
     ...categryValue,catelogo:uploadsimageresponse.url
  })
   }catch(error){
     console.log(error)
   }
    
  }
 
   console.log(allProductsCategry)  
  const removeCategry = async (e)=>{
     const cotegryRquir = confirm('this categry was delete are you sure')
     if(!cotegryRquir){
       return false
     }
      await fetch(`${DomainUrl.url}removeCategry`,{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify({_id:e}),
    })
    .then((res)=> res.json()).then((data)=> {
      if(!data.success){
        toast.error(data.message)
        return false
      }
      toast.success(data.message) 
      categryapi()
       
    })
  }
    
 
    const submitHandler = async()=>{
      
  await fetch(`${DomainUrl.url}productcategry`,{
       method:'POST',
       headers:{
         Accept:'application/json',
         "Content-type":"application/json",
       },
       body:JSON.stringify(categryValue),
     })
     .then((res)=> res.json()).then((data)=> {
       if(!data?.success){
        toast.error(data?.message)
        return false
       }
      
      console.log(data)
       toast.success(data.message)
       categryapi()
        
      setCategyValue({categry:'',catelogo:''})
      setShowCategryForm(false)
     })
    
    }
  
  
  return(
     <>
     <div className="addCategry">
     <h4>Add Categry</h4> 
    <input type="button" onClick={()=> { showCategryForm ? setShowCategryForm(false) : setShowCategryForm(true)}} value="add"/>
     </div>
       {showCategryForm ? <div className="addCategryForm" >
        <h3>Add Categrys</h3>
         <div className="flex items-center gap-2">
           <div className="w-28">
            <label htmlFor="file-name">
            <img src={logo5} className="w-full border"  alt="imag"/>
           </label>
           <input type="file" onChange={imageHandler}  id="file-name" hidden />  
           </div>
           <div className='flex flex-1  '>
            {
               categryValue.catelogo == '' ?(
                <div className="text-red-500"> * please upload image</div>
               ):(
                <div className="w-full flex gap-1 p-2 flex-wrap">
                 <img className="w-12 h-12" src={categryValue.catelogo}/>
                </div>
               )
            }
           </div>
         </div>
        <div className="categryform">
        <label htmlFor="categry" >Categry Name</label>
        <input type="text" id="categry" value={categryValue.categry} onChange={(e)=>{setCategyValue({...categryValue,categry:e.target.value})}} />
        <button onClick={submitHandler}>add</button>
        </div>
      </div>
      :  ''}
     
     {
       allProductsCategry.length !== 0 ?(
          <>
           <div className="showCategry">
      {
         allProductsCategry?.map((iteam,index)=>{
    return  <div className="showCategryIteam" key={index}> 
      <p> {iteam.categry}</p> <span onClick={()=>{removeCategry(iteam._id)}}>✕</span></div>
    })
      }
     </div>
          </>
         ):(
            <>
             no categry
            </>
           )
     }
     </>
    )
}
export default addCategry