
<<<<<<< HEAD
import styles from "../../styles/Account.module.css"

const SignUpSuccess = () => {
    return <div>
        <h2>SignUp Success</h2>
=======
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

const SignUpSuccess = () => {
    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>SignUp Success</h2>

        <div className={styles.authInputFieldHolderSignupSuccessText}>
            <h4>You have succesfully signed up.<br/>We sent you an email to the email address you entered.<br/>Please follow the link in the email to activate your account.</h4>
        </div>

        <button className={styles.authButton}><Link href="/auth/signin">SignIn</Link></button>

>>>>>>> d396c529c388c972aa2a45a688c575522da10e21
    </div>
}

export default SignUpSuccess;