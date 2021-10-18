import React,{useContext,useEffect} from 'react'
import {CartContext} from '../global/CartContext'
import Navbar from './Navbar'
import {useHistory , Link} from 'react-router-dom'
import {auth} from '../config/config'


function Cart({user}) {

    // const data = useContext(CartContext)
    // console.log(data)
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })
    return (
        <>
        
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <h1>Cart</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                            <div><Link to="/">Return to Home page</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'>Rs {cart.ProductPrice}.00</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                            <i className="fas fa-plus"></i>
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                            <i className="fas fa-minus"></i>
                            </div>

                            <div className='cart-price'>
                                Rs {cart.TotalProductPrice}.00
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                            <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    ))
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='cashout' className='cashout-link'>
                            <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                Cash on delivery
                        </button>
                        </Link>
                    </div>}
                </div>
            </>
        </>
    )
}

export default Cart
