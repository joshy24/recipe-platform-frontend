import styles from "../../styles/Nav.module.css"

import Image from "next/image"

const Nav = ({setShowMobileMenu}) => {

    const showMobileMenu = () => {
        setShowMobileMenu(true)
    }

    return <div className={styles.nav}>

        <div className={styles.navHolderTop}>
            <span onClick={showMobileMenu} className={styles.mobileNavMenuBtn}></span>
            <h2 className="nameLogo">
                Recipe's
            </h2>
        </div>

        <div className={styles.navHolder}>
            <h3>Dashboard</h3>
            <h3>Recipes</h3>
            <h3>Ingredients</h3>
        </div>

        <div className={styles.navAvatar}>
            <Image src="/images/avatar.png" width={50} height={50} />
            <Image className={styles.navAvatarCaret} src="/images/caret.png" width={20} height={20}/>        
        </div>
    </div>
}

export default Nav;