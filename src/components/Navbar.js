import React, { useContext ,useState} from 'react'
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
import logo from '../images/ecommerce.svg'
import {auth} from '../config/config'
import { CartContext } from '../global/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Navbar({user}) {

    const {totalQty} = useContext(CartContext)

    const history = useHistory()
       

// handle logout
const handleLogout = () => {
  
    auth.signOut().then(() => { 
       
        history.push('/login');
    })
}
    return (
        <div className='navbox'>
            <div className="leftside">
                <img src={logo} alt="" />
            </div>
            {/* if no user */}
            {!user && <div className='rightside'>
              <span><Link to='signup' className='navlink'>SIGN UP</Link></span> 
              <span><Link to='login' className='navlink'>LOGIN</Link></span>  

              </div>}
              {/* if connected */}
              {  <span><Link to="addproducts" className='btn btn-dark btn-lg'>Add Product</Link></span>}
              {user && <div className='rightside'>
                <span><Link to="/" className='navlink'>{user}</Link></span>
                <span><Link to="cartproducts" className='navlink'><i className="fas fa-shopping-cart"></i></Link></span>
                <span className='no-of-products'>{totalQty}</span>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    )
}

export default Navbar
