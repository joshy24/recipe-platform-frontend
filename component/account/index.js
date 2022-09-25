
import { useState } from "react"
import styles from "../../styles/Account.module.css"

import ChangePassword from "./changepassword"

import { EDIT_PROFILE_URL } from "../../utils/api.endpoints"

import { putRequest } from "../../utils/api.requests"

import { emailRegex, stringRegex, phoneNumberRegex } from "../../utils/helper"

import { AppContext } from "../../pages/AppContext";

import AuthHelperMethods from '../../utils/AuthHelperMethods';

const Auth = new AuthHelperMethods();

const AccountIndex = () => {
    const appContext = AppContext()

    const [isEdit, setIsEdit] = useState(false)

    const [showChangePassword, setShowChangePassword] = useState(false)

    const user = Auth.getAdmin()

    console.log(user)

    const [profile, setProfile] = useState({
        email: user.email,
        password: "",
        phone_number: user.phone_number,
        firstname: user.firstname,
        lastname: user.lastname
    })

    const switchIsEdit = () => {
        setIsEdit(!isEdit)
    }

    const saveProfile = async () => {

        if(!emailRegex.test(profile.email)){
            appContext.setMessage({visible: true, message: "Please enter a valid email address", title: "Message", type: "ERROR"})
            return
        }

        if(!phoneNumberRegex.test(profile.phone_number)){
            appContext.setMessage({visible: true, message: "Please enter a valid phone number", title: "Message", type: "ERROR"})
            return
        }

        if(!stringRegex.test(profile.firstname)){
            appContext.setMessage({visible: true, message: "Please enter a valid first name", title: "Message", type: "ERROR"})
            return
        }

        if(!stringRegex.test(profile.lastname)){
            appContext.setMessage({visible: true, message: "Please enter a valid last name", title: "Message", type: "ERROR"})
            return
        }

        try{
            appContext.setBlockingLoading(true)

            const response = await putRequest(EDIT_PROFILE_URL, profile)

            console.log(response.data)

            appContext.setBlockingLoading(false)
        }
        catch(err){
            appContext.setBlockingLoading(false)
            appContext.setMessage({visible: true, message: "An error occurred updating your profile", title: "Message", type: "ERROR"})
        }
    }

    const onChange = (e) => {
        let value = e.target.value;
        let name = e.target.name

        setProfile({...profile, [name]: value})
    }

    const openChangePassword = () => {
        setShowChangePassword(true)
    }

    const closeChangePassword = () => {
        setShowChangePassword(false)
    }

    const onPasswordChanged = () => {

    }

    return <div className="pageHolderContent">
        <div className={styles.accountIndexTop}>
            <h2 className="pageTitle">Account</h2>

            { 
                isEdit ? <button onClick={switchIsEdit} className={`${styles.cancelButton} rectangleButtonGrey`}>Cancel</button>
                :<button onClick={switchIsEdit} className={`${styles.editButton} rectangleButtonPrimary`}>Edit</button>
            }
        </div>

        <div className={styles.accountDetails}>
            <div className="inputFieldHolder">
                <h4>Email</h4>
                { 
                  isEdit ? <input className="ptInput" onChange={onChange} type="email" name="email" value={profile.email} placeholder="Enter email" /> : <h5>{profile.email}</h5>
                }
            </div>
            <div className="inputFieldHolder">
                <h4>Password</h4>
                {
                    isEdit ? <button onClick={openChangePassword} value={profile.password} className={`${styles.changePasswordButton} rectangleButtonGrey`}>Change Password</button> : <h5>********</h5>
                }
            </div>
            <div className="inputFieldHolder">
                <h4>Phone Number</h4>
                {
                    isEdit ? <input className="ptInput" onChange={onChange} value={profile.phone_number} type="phone" name="phone_number" placeholder="Enter phone number" /> : <h5>{profile.phone_number}</h5>
                }
            </div>
            <div className="inputFieldHolder">
                <h4>First Name</h4>
                {
                    isEdit ? <input className="ptInput" onChange={onChange} value={profile.firstname} type="text" name="firstname" placeholder="First Name" /> : <h5>{profile.firstname}</h5>
                }
            </div>
            <div className="inputFieldHolder">
                <h4>Last Name</h4>
                {
                    isEdit ? <input className="ptInput" onChange={onChange} value={profile.lastname} type="text" name="lastname" placeholder="Last Name" /> : <h5>{profile.lastname}</h5>
                }
            </div>
            <div className="inputFieldHolder">
                
                {
                    isEdit ? <button onClick={saveProfile} className={`${styles.saveButton} rectangleButtonPrimary`}>Save</button> : null
                }
            </div>
        </div>     

        {
            showChangePassword && <ChangePassword onCancelClicked={closeChangePassword} onPasswordChanged={onPasswordChanged} />
        }

    </div>
}

export default AccountIndex;