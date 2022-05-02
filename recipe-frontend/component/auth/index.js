
import styles from "../../styles/Auth.module.css"

import Signin from "./signin"

import Signup from "./signup"

import ForgotPassword from "./forgotpassword"

import SignUpSuccess from "./signupsuccess"

import ResetPassword from "./resetpassword"

const AuthIndex = ({page}) => {
    return <div className={styles.authHolder}>
        {
            page == "signin" && <Signin />
        }

        {
            page == "signup" && <Signup />
        }

        {
            page == "forgotpassword" && <ForgotPassword />
        }

        {
            page == "signupsuccess" && <SignUpSuccess />
        }

        {
            page == "resetpassword" && <ResetPassword />
        }
    </div>
}

export default AuthIndex;