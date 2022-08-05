
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

import { useRouter } from "next/router"

import Message from "../general/message"

import AppContext from "../../pages/AppContext";

import AuthHelperMethods from '../../utils/AuthHelperMethods';

import { useState, useContext } from "react";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest } from "../../utils/api.requests";

const Auth = new AuthHelperMethods();

const Signin = () => {

    const initialState = { email: '', password: ''}

    const value = useContext(AppContext);

    const [userData, setUserData] = useState(initialState)

    const router = useRouter()

    const doSignInAndNavigate = async () => {

        value.setBlockingLoading(true)
        
        try{
            await Auth.login(userData.email,userData.password);

            router.push("/dashboard")

            value.setBlockingLoading(false)
        }
        catch(err){
            value.setBlockingLoading(false)
            console.log(err)
        }
    }

    const handleChangeInput = e => {
        const {name, value} = e.target

        setUserData({...userData, [name]: value})
    }

    return <div className={styles.authHolderInnerContent}>
        <div style={{marginBottom: "30px"}}>
            <h2 className={styles.authTitle}>SignIn</h2>
            <h5>Input field cannot be empty</h5>
            <h5>Invalid email address</h5>
            <h5>Password length must be least up to 10<br />with numbers and special characters</h5>
        </div>
        


        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input className="ptInput" type="email" name="email" placeholder="Enter email" value={userData.email} onChange={handleChangeInput} /> 
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password</h4>
            <input className="ptInput" type="password" name="password" placeholder="Enter password" value={userData.password} onChange={handleChangeInput} />
        </div>

        <button onClick={doSignInAndNavigate} className="rectangleButtonPrimary authContinueButton">Continue</button>

        <h5 className={styles.authLinkText}>Dont have an account? <span className="link"><Link href="/auth/signup">Signup</Link></span></h5>

        <h5 className={styles.authLinkText}><Link href="/auth/forgotpassword">Forgot Password?</Link></h5>

        {

        }

    </div>
}

export default Signin;
