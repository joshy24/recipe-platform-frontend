
<<<<<<< HEAD
import styles from "../../styles/Account.module.css"

const SignUp = () => {
    return <div>
        <h2>SignUp</h2>
=======
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

const SignUp = () => {
    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>SignUp</h2>

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

        <button className={styles.authButton}><Link href="/auth/signupsuccess">Submit</Link></button>

        <h5 className={styles.authLinkText}>Already have an account? <span className="link"><Link href="/auth/signin">SignIn</Link></span></h5>

        {/*<h5 className={styles.authLinkText}>Forgot Password?</h5>*/}
>>>>>>> d396c529c388c972aa2a45a688c575522da10e21
    </div>
}

export default SignUp;