
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

import { useRouter } from "next/router"

import { AppContext }from "../../pages/AppContext";

import { useState, useContext } from "react";

import AuthHelperMethods from '../../utils/AuthHelperMethods';

const Auth = new AuthHelperMethods();

const SignUp = () => {

    const initialState = { firstname: "", lastname: "", phone_number: "", email: "", password: "", confirm_password: "" }

    const [userData, setUserData] = useState(initialState)

    const value = AppContext();

    const [isInput, setIsInput] = useState(false)
    const [isName, setIsName] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isNumber, setIsNumber] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)

    const router = useRouter()


    const showValidInput = () => {
        setIsInput(true)
    }

    const hideValidInput = () => {
        setIsInput(false)
    }

    const showValidName = () => {
        setIsName(true)
    }

    const hideValidName = () => {
        setIsName(false)
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

    const showValidNumber = () => {
        setIsNumber(true)
    }

    const hideValidNumber = () => {
        setIsNumber(false)
    }

    const showConfirmPassword = () => {
        setConfirmPassword(true)
    }

    const hideConfirmPassword = () => {
        setConfirmPassword(false)
    }


    const doSignUpAndNavigate = async () => {

        hideValidInput()

        hideValidName()

        hideValidEmail()

        hideValidPassword()

        hideValidNumber()

        hideConfirmPassword()

        let flnRegex = /^[a-zA-Z\-]+$/;

        let eRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let nRegex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;

        let pRegex =/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,100}$/;
        
        try{
            
            if(userData.firstname === "" || userData.lastname === "" || userData.phone_number === "" || userData.email === "" || userData.password === "" || userData.confirm_password === "") {
                showValidInput()

            } else if(!flnRegex.test(userData.firstname) || !flnRegex.test(userData.lastname)) {
                showValidName()

            } else if(!eRegex.test(userData.email)) {
                showValidEmail()

            } else if(!nRegex.test(userData.phone_number)) {
                showValidNumber()

            } else if(!pRegex.test(userData.password)) {
                showValidPassword()

            } else if(!(userData.password === userData.confirm_password)) {
                showConfirmPassword()

            } else {
                value.setBlockingLoading(true)

                await Auth.signup(userData);
                router.push("/dashboard")

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
            <h2 className={styles.authTitle}>SignUp</h2>
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Firstname</h4>
            <input className="ptInput" type="text" value={userData.firstname} name="firstname" placeholder="Enter Firstname" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Lastname</h4>
            <input className="ptInput" type="text" value={userData.lastname} name="lastname" placeholder="Enter Lastname" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input className="ptInput" type="email" value={userData.email} name="email" placeholder="Enter email" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Phone No.</h4>
            <input className="ptInput"type="number" value={userData.phone_number} name="phone_number" placeholder="Enter Phone No." onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password</h4>
            <input className="ptInput" value={userData.password} type="password" name="password" placeholder="Enter password" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Confirm Password</h4>
            <input className="ptInput" value={userData.confirm_password} type="password" name="confirm_password" placeholder="Enter confirm password" onChange={handleChangeInput} />
        </div>

        <button onClick={doSignUpAndNavigate} className="rectangleButtonPrimary authContinueButton">Continue</button>

        <div className={styles.authErrorText}>
            {
                isInput && <h5>An input field cannot be empty.</h5>
            }
            {
                isName && <h5>A user's name can only contain letters.</h5>
            }
            {
                isEmail && <h5>Invalid email address.</h5>
            }
            {
                isNumber && <h5>Invalid phone number.</h5>
            }
            {
                isPassword && <h5>Password length must be at least up to 8 to 16 characters that includes lower and uppercase letters, numbers and special characters.</h5>
            }
            {
                confirmPassword && <h5>Password does not match.</h5>
            }
        </div>

        <h5 className={styles.authLinkText}>Already have an account? <span className="link"><Link href="/auth/signin">SignIn</Link></span></h5>
    </div>
}

export default SignUp;