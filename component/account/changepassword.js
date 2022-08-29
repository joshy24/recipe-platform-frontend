
import { useState } from "react"

const ChangePassword = ({onPasswordChanged, onCancelClicked}) => {

    const [passwordDetails, setPasswordDetails] = useState({newPassword: "", newPasswordAgain: "", oldPassword: ""})

    const onchangeDetails = (e) => {
        let value = e.target.value;
        let name = e.target.name

        setPasswordDetails({...passwordDetails, [name]:value})
    }

    const onSubmitClicked = () => {

    }

    return <div className="popUp">
        <div className="popUpInnerContent">

            <h3 className="pageTitle">Change Password</h3>

            <div className="inputFieldHolder">
                <h4>Old Password</h4>

                <input className="ptInput" onChange={onchangeDetails} type="password" name="oldPassword" value={passwordDetails.oldPassword} placeholder="Old Password" />
            </div>

            <div className="inputFieldHolder">
                <h4>New Password</h4>

                <input className="ptInput" onChange={onchangeDetails} type="password" name="newPassword" value={passwordDetails.newPassword} placeholder="New Password" />
            </div>

            <div className="inputFieldHolder">
                <h4>New Password Again</h4>

                <input className="ptInput" onChange={onchangeDetails} type="password" name="newPasswordAgain" value={passwordDetails.newPasswordAgain} placeholder="New Password Again" />
            </div>

            <div className="popButtonHolder">
                <button onClick={onSubmitClicked} className="rectangleButtonPrimary">Save</button>
                <button onClick={onCancelClicked} className="rectangleButtonSecondary">Cancel</button>
            </div>

        </div>
    </div>
}

export default ChangePassword;
