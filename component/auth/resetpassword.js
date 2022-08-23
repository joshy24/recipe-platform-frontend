
import { useState, useContext } from "react";

import { useRouter } from "next/router"

import { AppContext }from "../../pages/AppContext";

import styles from "../../styles/Auth.module.css"

const ResetPassword = () => {

    const initialState = { password: "", confirm_password: "" }

    const value = AppContext();

    const [userData, setUserData] = useState(initialState)

    const [isInput, setIsInput] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)

    const router = useRouter()

    const showValidInput = () => {
        setIsInput(true)
    }

    const hideValidInput = () => {
        setIsInput(false)
    }

    const showValidPassword = () => {
        setIsPassword(true)
    }

    const hideValidPassword = () => {
        setIsPassword(false)
    }

    const showConfirmPassword = () => {
        setConfirmPassword(true)
    }

    const hideConfirmPassword = () => {
        setConfirmPassword(false)
    }

    const doResetPassword = async () => {

        hideValidInput()

        hideValidPassword()

        hideConfirmPassword()

        value.setBlockingLoading(true)

        let pRegex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/;

        try{

            if(userData.password === "" || userData.confirm_password === "") {
                showValidInput()
                value.setBlockingLoading(false)

            } else if(!pRegex.test(userData.password)) {
                showValidPassword()
                value.setBlockingLoading(false)

            } else if(!(userData.password === userData.confirm_password)) {
                showConfirmPassword()
                value.setBlockingLoading(false)

            } else {
                router.push("./signin")

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
            <h2 className={styles.authTitle}>Reset Password</h2>
            <div className={styles.authErrorText}>
                {
                    isInput && <h5>An input field cannot be empty.</h5>
                }
                {
                    isPassword && <h5>Password length must be at<br />least up to 8 to 16 with numbers.</h5>
                }
                {
                    confirmPassword && <h5>Password does not match.</h5>
                }
            </div>
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Enter New Password</h4>
            <input className="ptInput" value={userData.password} type="password" name="password" placeholder="Enter password" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password Again</h4>
            <input className="ptInput" value={userData.confirm_password} type="password" name="confirm_password" placeholder="Enter password again" onChange={handleChangeInput} />
        </div>

        <button onClick={doResetPassword} className="rectangleButtonPrimary authContinueButton">Continue</button>

    </div>
}

export default ResetPassword;