import styles from "../../styles/Nav.module.css"

import Image from "next/image"

import Link from "next/link"

import NavPopUp from "../general/navpopup"
import { useState } from "react"

const Nav = ({setShowMobileMenu}) => {

    const [showPopup, setShowPopup] = useState(false)

    const showMobileMenu = () => {
        setShowMobileMenu(true)
    }

    const showPopUpMenu = () => {
        setShowPopup(!showPopup)
    }

    return <>
        <div className={styles.nav}>

            <div className={styles.navHolderTop}>
                <span onClick={showMobileMenu} className={styles.mobileNavMenuBtn}></span>
                <h2 className="nameLogo">
                    <Link href="/">Recipe Platform</Link>
                </h2>
            </div>

            <div className={styles.navHolder}>
                <h3><Link href="/dashboard">Dashboard</Link></h3>
                <h3><Link href="/recipes">Recipes</Link></h3>
                <h3><Link href="/ingredients">Ingredients</Link></h3>
            </div>

            <div onClick={showPopUpMenu} className={styles.navAvatar}>
                <Image src="/images/avatar.png" width={50} height={50} />
                <Image className={styles.navAvatarCaret} src="/images/caret.png" width={20} height={20}/>        
            </div>
        </div>

        {
            showPopup && <NavPopUp showPopUpMenu={showPopUpMenu} />
        }

    </>
}

export default Nav;