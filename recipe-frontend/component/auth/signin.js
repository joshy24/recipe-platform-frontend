
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

const Signin = () => {
    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>SignIn</h2>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input type="email" name="email" placeholder="Enter email" />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password</h4>
            <input type="password" name="password" placeholder="Enter password" />
        </div>

        <button className={styles.authButton}>Continue</button>

        <h5 className={styles.authLinkText}>Dont have an account <span className="link"><Link href="/auth/signup">Signup</Link></span></h5>

        <h5 className={styles.authLinkText}>Forgot Password?</h5>
    </div>
}

export default Signin;