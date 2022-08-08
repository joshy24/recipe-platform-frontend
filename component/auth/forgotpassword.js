
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

import AppContext from "../../pages/AppContext";

import { useState, useContext } from "react";

const ForgotPassword = () => {

    const initialState = { email: ''}

    const value = useContext(AppContext);

    const [userData, setUserData] = useState(initialState)

    const [isInput, setIsInput] = useState(false)
    const [isEmail, setIsEmail] = useState(false)

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

    const doSignInAndNavigate = async () => {

        hideValidInput()

        hideValidEmail()

        let eRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        try{
            if(userData.email === "") {
                showValidInput()
                value.setBlockingLoading(false)

            } else if(!eRegex.test(userData.email)) {
                showValidEmail()
                value.setBlockingLoading(false)

            }
        }
        catch(err){
            value.setBlockingLoading(false)
            
        }

    }

    const handleChangeInput = e => {
        const {name, value} = e.target

        setUserData({...userData, [name]: value})
    }

    return <div className={styles.authHolderInnerContent}>
        <div>
            <h2 className={styles.authTitle}>Forgot Password</h2>
            <div className={styles.authErrorText}>
                {
                    isInput && <h5>An input field cannot be empty.</h5>
                }
                {
                    isEmail && <h5>Invalid email address.</h5>
                }
            </div>
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input className="ptInput" type="email" name="email" placeholder="Enter email" value={userData.email} onChange={handleChangeInput} />
        </div>

        <button onClick={doSignInAndNavigate} className="rectangleButtonPrimary authContinueButton">Continue</button>

        <h5 className={styles.authLinkText}>Remember password? <span className="link"><Link href="/auth/signin">SignIn</Link></span></h5>

    </div>
}

export default ForgotPassword;