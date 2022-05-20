
import AuthIndex from "../../component/auth/index"

import withNoAuth from "../../utils/withNoAuth"

const ForgotPassword = () => {
    return <div>
        <AuthIndex page={"forgotpassword"} />
    </div>
}

export default withNoAuth(ForgotPassword);