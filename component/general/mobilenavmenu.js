
import styles from "../../styles/Nav.module.css"

const MobileNavMenu = ({setShowMobileMenu}) => {

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    }

    return <div className={styles.mobileNav}>

        <div className={styles.mobileNavHolder}>
            <div className={styles.mobileNavHolderTop}>
                <h2 className="nameLogo">
                    Recipe's
                </h2>
                <span onClick={closeMobileMenu} className={styles.closeBtn}></span>
            </div>
            <h3>Dashboard</h3>
            <h3>Recipes</h3>
            <h3>Ingredients</h3>
            <h3>Account</h3>
            <h3>Settings</h3>

            <h3 className={`button ${styles.logoutBtn}`}>Logout</h3>
        </div>
    </div>
}

export default MobileNavMenu;