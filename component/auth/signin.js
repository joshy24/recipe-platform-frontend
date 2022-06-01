
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

import { useRouter } from "next/router"

import Message from "../general/message"

import AuthHelperMethods from '../../utils/AuthHelperMethods';

const Auth = new AuthHelperMethods();

const Signin = () => {
    
    const router = useRouter()

    const doSignInAndNavigate = () => {
        Auth.login(null,null);

        router.push("/dashboard")
    }

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

        <button onClick={doSignInAndNavigate} className={styles.authButton}>Continue</button>

        <h5 className={styles.authLinkText}>Dont have an account? <span className="link"><Link href="/auth/signup">Signup</Link></span></h5>

        <h5 className={styles.authLinkText}><Link href="/auth/forgotpassword">Forgot Password?</Link></h5>

        {

        }

    </div>
}

export default Signin;
