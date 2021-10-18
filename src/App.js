import React, {Component,useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import AddProducts from './components/AddProducts';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { ProductsContextProvider } from './global/ProductsContext';
import {auth,db} from './config/config'
import { CartContextProvider } from './global/CartContext';
import Cart from './components/Cart';
import Cashout from './components/Cashout';
import {NotFound} from './components/NotFound'
function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
   // getting user info for navigation bar
   auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('UsersData').doc(user.uid).get().then(snapshot => {
            setUser( snapshot.data().Name )
        })
    }
    else {
        setUser(null)
    }
})
  }, [])


  return (
    <ProductsContextProvider>
      <CartContextProvider>
     <Router>
       <Switch>
         <Route exact path='/' component={() => <Home user={user} />} />
         <Route  path='/addproducts' component={AddProducts} />
         <Route  path='/signup' component={SignUp} />
         <Route  path='/login' component={LogIn} />
         <Route path='/cartproducts' component={()=> <Cart user={user}/>}/>
        <Route path='/cashout' component={()=> <Cashout user={user} />} />
        <Route component={NotFound} />
       </Switch>
     </Router>
     </CartContextProvider>

    </ProductsContextProvider>
   
  );
}

export default App;
