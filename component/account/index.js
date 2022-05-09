
import { useState } from "react"
import styles from "../../styles/Account.module.css"

const AccountIndex = () => {
    const [isEdit, setIsEdit] = useState(false)

    const [profile, setProfile] = useState({
        email: "joshuamajeb24@gmail.com",
        password: "password24",
        phone_number: "+2348071973021",
        firstname: "Joshua",
        lastname: "Ajayi-Majebi"
    })

    const switchIsEdit = () => {
        setIsEdit(!isEdit)
    }

    const onChange = (e) => {
        let value = e.target.value;
        let name = e.target.name

        setProfile({...profile, [name]: value})
    }

    return <div className={styles.accountIndex}>
        <div className={styles.accountIndexTop}>
            <h2 className="pageTitle">Account</h2>

            { 
                isEdit ? <button onClick={switchIsEdit} className={`${styles.cancelButton} secondaryButton`}>Cancel</button>
                :<button onClick={switchIsEdit} className={`${styles.editButton} secondaryButton`}>Edit</button>
            }
        </div>

        <div className={styles.accountDetails}>
            <div className={styles.accountInputFieldHolder}>
                <h4>Email</h4>
                { 
                  isEdit ? <input onChange={onChange} type="email" name="email" value={profile.email} placeholder="Enter email" /> : <h5>{profile.email}</h5>
                }
            </div>
            <div className={styles.accountInputFieldHolder}>
                <h4>Password</h4>
                {
                    isEdit ? <button value={profile.password} className={`${styles.changePasswordButton} secondaryButton`}>Change Password</button> : <h5>{profile.password}</h5>
                }
            </div>
            <div className={styles.accountInputFieldHolder}>
                <h4>Phone Number</h4>
                {
                    isEdit ? <input onChange={onChange} value={profile.phone_number} type="phone" name="phone_number" placeholder="Enter phone number" /> : <h5>{profile.phone_number}</h5>
                }
            </div>
            <div className={styles.accountInputFieldHolder}>
                <h4>First Name</h4>
                {
                    isEdit ? <input onChange={onChange} value={profile.firstname} type="text" name="firstname" placeholder="First Name" /> : <h5>{profile.firstname}</h5>
                }
            </div>
            <div className={styles.accountInputFieldHolder}>
                <h4>Last Name</h4>
                {
                    isEdit ? <input onChange={onChange} value={profile.lastname} type="text" name="lastname" placeholder="Last Name" /> : <h5>{profile.lastname}</h5>
                }
            </div>
            <div className={styles.accountInputFieldHolder}>
                
                {
                    isEdit ? <button onClick={switchIsEdit} className={`${styles.saveButton} primaryButton`}>Save</button> : null
                }
            </div>
        </div>        
    </div>
}

export default AccountIndex;