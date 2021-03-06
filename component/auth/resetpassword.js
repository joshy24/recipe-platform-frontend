
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

const ResetPassword = () => {
    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>Reset Password</h2>

        <div className={styles.authInputFieldHolder}>
            <h4>Enter New Password</h4>
            <input type="password" name="password" placeholder="Enter password" />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password Again</h4>
            <input type="password" name="password again" placeholder="Enter password again" />
        </div>

        <button className={styles.authButton}><Link href="/auth/signin">Continue</Link></button>

    </div>
}

export default ResetPassword;