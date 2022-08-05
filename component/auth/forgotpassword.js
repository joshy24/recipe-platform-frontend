
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

const ForgotPassword = () => {
    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>Forgot Password</h2>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input type="email" name="email" placeholder="Enter email address" />
        </div>

        <button className="rectangleButtonPrimary authContinueButton">Continue</button>

        <h5 className={styles.authLinkText}>Remember password? <span className="link"><Link href="/auth/signin">SignIn</Link></span></h5>

    </div>
}

export default ForgotPassword;