
import styles from "../../styles/Nav.module.css"

import Link from "next/link"

import { useRouter } from "next/router"

import AuthHelperMethods from '../../utils/AuthHelperMethods';

const Auth = new AuthHelperMethods();

const NavPopUp = ({showPopUpMenu}) => {
    
    const router = useRouter()

    const doLogout = () => {
        showPopUpMenu()
        Auth.logout();
        router.push("/auth/signin")
    }

    return <div className={`${styles.navPopUp} whiteBox`}>
            <h5 onClick={showPopUpMenu}><Link href="/account">Account</Link></h5>
            <h5 onClick={showPopUpMenu}><Link href="/settings">Settings</Link></h5>
            <hr/>
            <button className="flatButton" onClick={doLogout}>Logout</button>
    </div>
}

export default NavPopUp;