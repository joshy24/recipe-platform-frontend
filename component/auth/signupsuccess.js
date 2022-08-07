
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

const SignUpSuccess = () => {
    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>SignUp Success</h2>

        <div className={styles.authInputFieldHolderSignupSuccessText}>
            <h4>You have succesfully signed up.<br/>We sent you an email to the email address you entered.<br/>Please follow the link in the email to activate your account.</h4>
        </div>

        <Link href="/auth/signin"><button className={`rectangleButtonPrimary ${styles.authButton}`}>SignIn</button></Link>

    </div>
}

export default SignUpSuccess;