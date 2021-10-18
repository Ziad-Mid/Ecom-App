import React, {useState} from 'react'
import {auth,db} from '../config/config'
import {Link} from 'react-router-dom'


function SignUp(props) {

    // defining state
     const [data, setData] = useState({
        name:'',
        email:'',
        password:''
    })
    const [error, setError] = useState('');

   

    // signup
    const signup = (e) => {
        e.preventDefault();
        console.log(data)
        auth.createUserWithEmailAndPassword(data.email, data.password).then((cred) => {
            db.collection('UsersData').doc(cred.user.uid).set({
                Name: data.name,
                Email: data.email,
                Password: data.password
            }).then(() => {
                setData({
                    name:'',
                    email:'',
                    password:''
                });
               
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }
    return (
        <div className='container'>
            <br />
            <h2>Sign up</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setData({...data,name: e.target.value})} value={data.name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setData({...data,email:e.target.value})} value={data.email} />
                <br />
                <label htmlFor="passowrd">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setData({...data,password:e.target.value})} value={data.password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Already have an account? Login
                <Link to="login"> Here</Link>
            </span>
        </div>
    )
}

export default SignUp
