import { useState } from 'react'
import DashboardIndex from '../../component/dashboard/index'
import MobileNav from "../../component/general/mobilenavmenu"
import Nav from "../../component/general/nav"

function Dashboard() {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return <div className="pageHolder">
      <Nav setShowMobileMenu={setShowMobileMenu} />
      <DashboardIndex />

      { 
          showMobileMenu && <MobileNav setShowMobileMenu={setShowMobileMenu} />
      }
  </div>
}

export default Dashboard;

/*
<MobileNav />
*/