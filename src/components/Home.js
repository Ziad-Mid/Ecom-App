import React,{useEffect} from 'react'
import Navbar from './Navbar'
import Products from './Products'
import {auth} from '../config/config'
import { useHistory } from 'react-router-dom';

function Home({user}) {

    const history = useHistory();
 
    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

    return (
        <div className='wrapper'>
            <Navbar user={user}/>
            <Products/>

        </div>
    )
}

export default Home
