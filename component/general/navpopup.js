
import styles from "../../styles/Nav.module.css"

import Link from "next/link"

const NavPopUp = ({showPopUpMenu}) => {

    return <div className={`${styles.navPopUp} whiteBox`}>
            <h5 onClick={showPopUpMenu}><Link href="/account">Account</Link></h5>
            <h5 onClick={showPopUpMenu}><Link href="/settings">Settings</Link></h5>
            <hr/>
            <h5>Logout</h5>
    </div>
}

export default NavPopUp;