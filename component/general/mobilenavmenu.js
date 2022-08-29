
import styles from "../../styles/Nav.module.css"

import Link from "next/link"

const MobileNavMenu = ({setShowMobileMenu}) => {

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    }

    return <div className={styles.mobileNav}>

        <div className={styles.mobileNavHolder}>
            <div className={styles.mobileNavHolderTop}>
                <h2 className="nameLogo">
                    Profit Table
                </h2>
                <span onClick={closeMobileMenu} className={styles.closeBtn}></span>
            </div>
            <h3><Link href="/dashboard">Dashboard</Link></h3>
            <h3><Link href="/orders">Orders</Link></h3>
            <h3><Link href="/products">Products</Link></h3>
            <h3><Link href="/recipes">Recipes</Link></h3>
            <h3><Link href="/inventory">Inventory</Link></h3>
            <h3>Account</h3>
            <h3>Settings</h3>

            <h3 className={`button ${styles.logoutBtn}`}>Logout</h3>
        </div>
    </div>
}

export default MobileNavMenu;