
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

    const router = useRouter()

    const doSignInAndNavigate = async () => {
        
        try{
            await Auth.login(userData.email,userData.password);

            router.push("/dashboard")
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChangeInput = e => {
        const {name, value} = e.target

        setUserData({...userData, [name]: value})
    }

    return <div className={styles.authHolderInnerContent}>
        <h2 className={styles.authTitle}>SignIn</h2>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input type="email" name="email" placeholder="Enter email" value={userData.email} onChange={handleChangeInput} /> 
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password</h4>
            <input type="password" name="password" placeholder="Enter password" value={userData.password} onChange={handleChangeInput} />
        </div>

        <button onClick={doSignInAndNavigate} className="rectangleButtonPrimary">Continue</button>

        <h5 className={styles.authLinkText}>Dont have an account? <span className="link"><Link href="/auth/signup">Signup</Link></span></h5>

        <h5 className={styles.authLinkText}><Link href="/auth/forgotpassword">Forgot Password?</Link></h5>

        {

        }

    </div>
}

export default Signin;
