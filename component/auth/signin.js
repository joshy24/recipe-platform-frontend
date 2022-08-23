
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

import { useRouter } from "next/router"

import { AppContext }from "../../pages/AppContext";

import AuthHelperMethods from '../../utils/AuthHelperMethods';

import { useState } from "react";

const Auth = new AuthHelperMethods();

const Signin = () => {

    const initialState = { email: '', password: ''}

    const value = AppContext();

    const [userData, setUserData] = useState(initialState)

    const [isInput, setIsInput] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isUnfound, setIsUnfound] = useState(false)
    const [isWrong, setIsWrong] = useState(false)

    const router = useRouter()


    const showValidInput = () => {
        setIsInput(true)
    }

    const hideValidInput = () => {
        setIsInput(false)
    }

    const showValidEmail = () => {
        setIsEmail(true)
    }

    const hideValidEmail = () => {
        setIsEmail(false)
    }

    const showValidPassword = () => {
        setIsPassword(true)
    }

    const hideValidPassword = () => {
        setIsPassword(false)
    }

    const showValidUser = () => {
        setIsUnfound(true)
    }

    const hideValidUser = () => {
        setIsUnfound(false)
    }

    const showWrongPassword = () => {
        setIsWrong(true)
    }

    const hideWrongPassword = () => {
        setIsWrong(false)
    }

    const doSignInAndNavigate = async () => {
        
        hideValidInput()

        hideValidEmail()

        hideValidPassword()

        hideValidUser()

        hideWrongPassword()

        let eRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //let pRegex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,100}$/;

        try{

            if(userData.email === "" || userData.password === "") {
                showValidInput()
                return;

            } else if(!eRegex.test(userData.email)) {
                showValidEmail()

            } /*else if(!pRegex.test(userData.password)) {
                showValidPassword()

            }*/ else {
                value.setBlockingLoading(true)

                const res = await Auth.login(userData.email, userData.password);

                res;

                res.msg === 'not_found' ? showValidUser() : res.msg === 'wrong_password' ? showWrongPassword() : router.push("/dashboard")

                value.setBlockingLoading(false)
            }

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
        <div>
            <h2 className={styles.authTitle}>SignIn</h2>
            <div className={styles.authErrorText}>
                {
                    isInput && <h5>An input field cannot be empty.</h5>
                }
                {
                    isEmail && <h5>Invalid email address.</h5>
                }
                {
                    isPassword && <h5>Password length must be at least up to 8 to 16 characters that includes lower and uppercase letters, numbers and special characters.</h5>
                }
                {
                    isUnfound && <h5>We could not find your user details.<br />Please sign up.</h5>
                }
                {
                    isWrong && <h5>Your user password is wrong.<br />Please click on<br />'Forgot Password' to reset your password.</h5>
                }
            </div>
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
