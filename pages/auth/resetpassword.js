
import AuthIndex from "../../component/auth/index"

import withNoAuth from "../../utils/withNoAuth"

const ResetPassword = () => {
    return <div>
        <AuthIndex page={"resetpassword"} />
    </div>
}

export default withNoAuth(ResetPassword);