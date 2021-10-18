import React ,{ useState, useEffect, useContext } from 'react'
import Navbar from './Navbar'
import {auth , db} from '../config/config'
import { CartContext} from '../global/CartContext'
import {useHistory} from 'react-router-dom'

function Cashout(props) {

    const history = useHistory()

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

   // defining state
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [cell, setCell] = useState('');
   const [address, setAddress] = useState('');
   const [error, setError] = useState('');
   const [successMsg, setSuccessMsg] = useState('');

   
   useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('UsersData').doc(user.uid).onSnapshot(snapshot => {
                setName(snapshot.data().Name);
                setEmail(snapshot.data().Email);
            })
        }
        else {
            history.push('/login')
        }
    })
},[])

    
    const cashoutSubmit = (e) => {
        e.preventDefault();

        auth.onAuthStateChanged(user =>{
            if(user){
                const date = new Date()
                const time = date.getTime()

                db.collection('BuyerInfo'+user.uid).doc('_'+time).set({
                    BuyerName : name,
                    Buyeremail : email,
                    BuyerCell : cell,
                    BuyerAddress : address,
                    BuyerPayment : totalPrice,
                    BuyerQuantity : totalQty,
                })
                .then(()=>{
                    setCell('')
                    setAddress('')
                    dispatch('')
                    setSuccessMsg('Your order has been placed successfully, Thank you')

                    setTimeout(()=>{
                        history.push('/')

                    },5000)
                })
                .catch(err => setError(err.message))
            }
        })


    }

    return (
        <>
        <Navbar user={props.user} />
        <div className='container'>
            <br />
            <h2>Cashout Details</h2>
            <br />
            {successMsg && <div className='success-msg'>{successMsg}</div>}
            <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control' required
                    value={name} disabled />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    value={email} disabled />
                <br />
                <label htmlFor="Cell No">Cell No</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                <br />
                <label htmlFor="Delivery Address">Delivery Address</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setAddress(e.target.value)} value={address} />
                <br />
                <label htmlFor="Price To Pay">Price To Pay</label>
                <input type="number" className='form-control' required
                    value={totalPrice} disabled />
                <br />
                <label htmlFor="Total No of Products">Total No of Products</label>
                <input type="number" className='form-control' required
                    value={totalQty} disabled />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    </>
    )
}

export default Cashout