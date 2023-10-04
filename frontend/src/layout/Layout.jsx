import React, {useState} from 'react'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routes/Routers'

const Layout = () => {
  //Props Drilling
  const [isLoggedin, setIsLoggedIn] = useState(localStorage.getItem('user-info') ? true : false)

  return <>
     <Header value = {{isLoggedin, setIsLoggedIn}}/>
     <main>
        <Routers value = {{isLoggedin, setIsLoggedIn}}/>
     </main>
     <Footer/>
  </>
    
}

export default Layout