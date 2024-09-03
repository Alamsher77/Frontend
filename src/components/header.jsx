import {Link,useNavigate} from "react-router-dom";
import {useState,useContext,useEffect} from "react"
import { MdShoppingCart } from "react-icons/md"; 
import{ toast } from 'react-hot-toast';
  import DomainUrl from '../Configuration/Index'
import {ContestContext} from '../api/ContestContext'
import './header.css'
export const Headers = ()=> {
   const navigate = useNavigate();
  const {userFechApi,allProductsCategry, coutCartData,userDetails,setUserDetails} = useContext(ContestContext) 
 
 const [toggleMenu,setToggleMenu] = useState('')
 const [usersPopupIteams,setUsersPopupIteams] = useState(false)
 const usersTogglePopup = ()=>{
  if(usersPopupIteams){
    setUsersPopupIteams(false)
  }else{
    setUsersPopupIteams(true)
  }
}
 const menuhandler=()=>{
      const sidbarContainer = document.querySelector('.sidbar-container');
     if(toggleMenu == ''){ 
     sidbarContainer.classList.add('active')
     setToggleMenu('close') 
     }else{
     sidbarContainer.classList.remove('active') 
     setToggleMenu('')
     setUsersPopupIteams(false)
     }
  } 
  
 const logoutHandler = async ()=>{
  
     const response = await fetch(`${DomainUrl.url}logout`,{
        method:"GET",
        credentials:"include",
      })
     .catch((error)=> console.log(error))
     const data = await response.json()
     if(data.success){ 
    toast.success(data.message)
    setToggleMenu("") 
    usersTogglePopup()
    menuhandler() 
    setUserDetails(null)
   navigate("/signup") 
     }
  
   } 
   

  
  return(
    <> 
    
   
    <div className={`header ${toggleMenu}`}> 
       <div className='navebars-background' onClick={menuhandler}></div>
      
     <div className="menu" onClick={menuhandler}>
      <div className="menu-iteam"></div>
      <div className="menu-iteam"></div>
      <div className="menu-iteam"></div>
      </div>
      
      <div className="brand">
       <Link to="/" onClick={()=> 
    document.body.removeAttribute('class','close')}> <span>Shopes</span></Link>  
      </div>
       
       <div className="sidbar-container">  
       <div className="close-sid-width " onClick={menuhandler}></div>
  
        <div className="user-info">
        {
          userDetails ? (
           <>
            <div className="cursor-pointer user-image bg-slate-200"   onClick={usersTogglePopup}>{userDetails?.profilePic ? (
              <img src={userDetails?.profilePic} alt="image" />):(
                <h1 className="font-bold text-4xl text-slate-500">{userDetails?.name.charAt(0)}</h1>
              )
            }</div>
            <div className="user-information">
                
                <p> <b>{userDetails?.name}</b> <br /><span>{userDetails?.email}</span></p>
            </div>
           </>
          ):(
           <Link to="signup" className="border  px-3 py-1 text-slate-500 rounded" onClick={menuhandler} >Login now</Link>  
           
          )
        } 
        </div>
         
         {/*navigation*/}
         <div className="bg-slate-200 w-full px-3 py-2 flex gap-1 flex-col">
           
           <Link onClick={menuhandler} className="rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-500 flex flex-col items-center py-2" to="/myOrderProducts"  >My Orders</Link> 
            
           <Link onClick={menuhandler} className="rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-500 flex flex-col items-center py-2" to="#"  >Contact</Link> 
         </div>
         
        {
       //userinfo popup iteams
         usersPopupIteams && (
        <div className="absolute flex flex-col gap-1 justify-center items-center  p-2 top-20 left-2 bg-white shadow-indigo-500/50 ">
         <div className="border border-yellow-600 px-3 py-1 text-yellow-500 rounded"><Link to="adminPanel/addproduct" onClick={usersTogglePopup,menuhandler } >Admin Panel</Link></div>
          <div className="border border-yellow-600 px-3 py-1 text-yellow-500 rounded"><Link to="UserDetails" onClick={usersTogglePopup,menuhandler } >Profile</Link></div>
         <div className="border border-red-600 text-red-500 hover:text-red-600 hover:bg-red-200  px-3 rounded"> <Link to="signup" onClick={logoutHandler} >Log Out</Link></div>
        </div>
       )
        }
         
        </div> 
    {
      userDetails ? (
      <>
         
        
        <div className="text-3xl relative -left-1 flex justify-center items-center w-8 h-8" >
        <sapn className="text-white absolute" ><Link to='cart' onClick={()=> 
    document.body.removeAttribute('className','close')}> <MdShoppingCart/></Link></sapn>
      <div className="bg-red-600 -top-1 left-2 absolute rounded-full text-white w-5 h-5 p-1 flex items-center justify-center">
        <p className="text-sm">{coutCartData}</p>
      </div>
      </div>
      </>
      ):(
       <>
       </>
      )
    }
      
    </div> 
    < />
  )
}
