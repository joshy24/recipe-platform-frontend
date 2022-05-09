import styles from "../../styles/Nav.module.css"

import Image from "next/image"

import Link from "next/link"

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
            <h3><Link href="/dashboard">Dashboard</Link></h3>
            <h3><Link href="/recipes">Recipes</Link></h3>
            <h3><Link href="/ingredients">Ingredients</Link></h3>
        </div>

        <div className={styles.navAvatar}>
            <Image src="/images/avatar.png" width={50} height={50} />
            <Image className={styles.navAvatarCaret} src="/images/caret.png" width={20} height={20}/>        
        </div>
    </div>
}

export default Nav;