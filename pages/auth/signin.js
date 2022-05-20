
import AuthIndex from "../../component/auth/index"

import withNoAuth from "../../utils/withNoAuth"

const SignIn = () => {
    return <div>
        <AuthIndex page={"signin"} />
    </div>
}

export default withNoAuth(SignIn);