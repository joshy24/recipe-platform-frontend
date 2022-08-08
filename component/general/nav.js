import styles from "../../styles/Nav.module.css"

import Image from "next/image"

import Link from "next/link"

import NavPopUp from "../general/navpopup"
import { useState } from "react"

import { useRouter } from "next/router"

const Nav = ({setShowMobileMenu}) => {

    const router = useRouter();

    const [showPopup, setShowPopup] = useState(false)

    const showMobileMenu = () => {
        setShowMobileMenu(true)
    }

    const showPopUpMenu = () => {
        setShowPopup(!showPopup)
    }

    const goToProfitable = () => {
        router.push("/profitable")
    }

    return <>
        <div className={styles.nav}>

            <div className={styles.navHolderTop}>
                <span onClick={showMobileMenu} className={styles.mobileNavMenuBtn}></span>
                <h2 className="nameLogo">
                    <Link href="/">Profit Table</Link>
                </h2>
            </div>

            <div className={styles.navHolderTopRight}>
                <div className={styles.navHolder}>
                    <h3><Link href="/dashboard">Dashboard</Link></h3>
                    <h3><Link href="/orders">Orders</Link></h3>
                    <h3><Link href="/products">Products</Link></h3>
                    <h3><Link href="/recipes">Recipes</Link></h3>
                    <h3><Link href="/inventory">Inventory</Link></h3>
                    <button onClick={goToProfitable} className={styles.profitableButton}>% Profitable</button>
                </div>

                <div onClick={showPopUpMenu} className={styles.navAvatar}>
                    <Image src="/images/avatar.png" width={50} height={50} />
                    <Image className={styles.navAvatarCaret} src="/images/caret.png" width={20} height={20}/>        
                </div>
            </div>
        </div>

        {
            showPopup && <NavPopUp showPopUpMenu={showPopUpMenu} />
        }

    </>
}

export default Nav;