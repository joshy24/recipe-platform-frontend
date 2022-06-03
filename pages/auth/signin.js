
import AuthIndex from "../../component/auth/index"

import withNoAuth from "../../utils/withNoAuth"

import Message from "../../component/general/message"

import { useState } from "react"

const SignIn = () => {

    const [message, setMessage] = useState({visible: false, message: "", title: "", type: ""})

    return <div>
        <AuthIndex message={message} setMessage={setMessage} page={"signin"} />

        {
            message.visible && <Message setMessage={setMessage} message={message} />
        }
    </div>
}

export default withNoAuth(SignIn);