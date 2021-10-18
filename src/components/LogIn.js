import React,{useState} from 'react';
import { auth ,db } from '../config/config';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


function LogIn(props) {

     // defining state
     const [data, setData] = useState({
        email:'',
        password:''
    })
    const [currentuser, setCurrentUser] = useState(null)
    const [error, setError] = useState('');

   
    const login = (e) =>{
        e.preventDefault()

        auth.signInWithEmailAndPassword(data.email,data.password)
            .then((uer)=>{
                setData({
                    email:'',
                    password:''
                })
                toast.success('Logged In Successfully ', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                props.history.push('/')
            }).catch(err =>setError(
                toast.error(err.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            ))
    }

    return (
        <div className='container'>
        <br />
        <h2>Login</h2>
        <br />
        <form autoComplete="off" className='form-group' onSubmit={login}>
            <label htmlFor="email">Email</label>
            <input type="email" className='form-control' required
                onChange={(e) => setData({...data,email:e.target.value})} value={data.email} />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" className='form-control' required
                onChange={(e) => setData({...data,password:e.target.value})} value={data.password} />
            <br />
            <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
        </form>
        {/* {error && <span className='error-msg'>{error}</span>} */}
        <br/>
        <span>Don't have an account? Register
            <Link to="signup"> Here</Link>
        </span>
    </div>
    )
}

export default LogIn
