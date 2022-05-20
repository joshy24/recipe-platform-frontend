
import AuthIndex from "../../component/auth/index"

import withNoAuth from "../../utils/withNoAuth"

const SignupSuccess = () => {
    return <div>
        <AuthIndex page={"signupsuccess"} />
    </div>
}

export default withNoAuth(SignupSuccess);