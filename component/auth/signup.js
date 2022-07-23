
import Link from "next/link"

import styles from "../../styles/Auth.module.css"

import { useRouter } from "next/router"

import { useState } from "react";

import AuthHelperMethods from '../../utils/AuthHelperMethods';

const Auth = new AuthHelperMethods();

const SignUp = () => {

    const initialState = { firstname: "", lastname: "", phone_number: "", email: "", password: "", confirm_password: "" }

    const [userData, setUserData] = useState(initialState)

    const router = useRouter()

    const doSignUpAndNavigate = async () => {
        
        try{
            await Auth.signup(userData);
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
        <h2 className={styles.authTitle}>SignUp</h2>

        <div className={styles.authInputFieldHolder}>
            <h4>Firstname</h4>
            <input type="text" value={userData.firstname} name="firstname" placeholder="Enter Firstname" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Lastname</h4>
            <input type="text" value={userData.lastname} name="lastname" placeholder="Enter Lastname" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Email</h4>
            <input type="email" value={userData.email} name="email" placeholder="Enter email" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Phone No.</h4>
            <input type="number" value={userData.phone_number} name="phone_number" placeholder="Enter Phone No." onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Password</h4>
            <input value={userData.password} type="password" name="password" placeholder="Enter password" onChange={handleChangeInput} />
        </div>

        <div className={styles.authInputFieldHolder}>
            <h4>Confirm Password</h4>
            <input value={userData.confirm_password} type="password" name="confirm_password" placeholder="Enter confirm password" onChange={handleChangeInput} />
        </div>

        <button onClick={doSignUpAndNavigate} className="rectangleButtonPrimary">Continue</button>

        <h5 className={styles.authLinkText}>Already have an account? <span className="link"><Link href="/auth/signin">SignIn</Link></span></h5>

        {/*<h5 className={styles.authLinkText}>Forgot Password?</h5>*/}
    </div>
}

export default SignUp;