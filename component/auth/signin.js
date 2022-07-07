
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

import { useRouter } from "next/router"

import Message from "../general/message"

import AuthHelperMethods from '../../utils/AuthHelperMethods';

import { useState } from "react";

import { postRequest } from "../../utils/api.requests";

const Auth = new AuthHelperMethods();

const Signin = () => {

    const initialState = { email: '', password: ''}
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData



    const router = useRouter()

    const doSignInAndNavigate = () => {
        Auth.login(null,null);

        router.push("/dashboard")
    }

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await postRequest(userData) //makes a request to get userdata
        if(res.error) return //What it should do if request is unsuccessful
    }
    return <div  onSubmit={handleSubmit} className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>SignIn</h2>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input type="email" name="email" placeholder="Enter email" value={email} onChange={handleChangeInput} /> 
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password</h4>
            <input type="password" name="password" placeholder="Enter password" value={password} onChange={handleChangeInput} />
        </div>

        <button onClick={doSignInAndNavigate} className={styles.authButton}>Continue</button>

        <h5 className={styles.authLinkText}>Dont have an account? <span className="link"><Link href="/auth/signup">Signup</Link></span></h5>

        <h5 className={styles.authLinkText}><Link href="/auth/forgotpassword">Forgot Password?</Link></h5>

        {

        }

    </div>
}

export default Signin;
