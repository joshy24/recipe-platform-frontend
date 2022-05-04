
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

const SignUp = () => {
    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>SignIn</h2>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input type="email" name="email" placeholder="Enter email" />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Phone No.</h4>
            <input type="tel" name="phone" placeholder="Enter Phone No." />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password</h4>
            <input type="password" name="password" placeholder="Enter password" />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Confirm Password</h4>
            <input type="password" name="password" placeholder="Enter password" />
        </div>

        <button className={styles.authButton}>Submit</button>

        <h5 className={styles.authLinkText}>Already have an account? <span className="link"><Link href="/auth/signin">SignIn</Link></span></h5>

        {/*<h5 className={styles.authLinkText}>Forgot Password?</h5>*/}
    </div>
}

export default SignUp;