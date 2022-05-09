
import { useState } from 'react'
import RecipesIndex from '../../component/recipes/index'
import MobileNav from "../../component/general/mobilenavmenu"
import Nav from "../../component/general/nav"

function Recipes() {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return <div className="pageHolder">
      <Nav setShowMobileMenu={setShowMobileMenu} />
      <RecipesIndex />

      { 
          showMobileMenu && <MobileNav setShowMobileMenu={setShowMobileMenu} />
      }
  </div>
}

export default Recipes;
