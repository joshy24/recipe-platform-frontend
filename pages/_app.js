import '../styles/globals.css'

import MobileNav from "../component/general/mobilenavmenu"
import Nav from "../component/general/nav"

import { useState } from "react"

const MyApp = ({ Component, pageProps }) => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return <div>
    <Nav setShowMobileMenu={setShowMobileMenu} />
    <Component {...pageProps} />
    { 
        showMobileMenu && <MobileNav setShowMobileMenu={setShowMobileMenu} />
    }
  </div>
}

export default MyApp
