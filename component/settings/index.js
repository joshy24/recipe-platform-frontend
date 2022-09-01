import {useState} from 'react'
import styles from "../../styles/Settings.module.css"

import { useRouter } from "next/router"

import AuthHelperMethods from "../../utils/AuthHelperMethods";
const Auth = new AuthHelperMethods();

const SettingsIndex = () => {
    const router = useRouter() 

    const user = Auth.getAdmin()

    const [isEdit, setIsEdit] = useState(false)

    const [percentage, setPercentage] = useState((!user.profit_margin || user.profit_margin == 0) ? "" : user.profit_margin)
    
    const switchIsEdit = () => {
        setIsEdit(!isEdit)
    }

    const onChange = (e) => {
        let value = e.target.value;
        let name = e.target.name

        setPercentage(value)
    }

    const doLogout = () => {
        Auth.logout();
        router.push("/auth/signin")
    }

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <h2 className="pageTitle">
                Settings
            </h2>
        </div>

        <div className={styles.settingsDetails}>
            <h4 style={{marginTop: "0px"}}>
                Profit margin of Recipes - 
            </h4>

            <div className={styles.settingsInputFieldHolder}>
                { 
                    isEdit
                    ? <input className="ptInput" onChange={onChange} value={percentage} type="number" name="percentage" placeholder="Enter margin percentage" />
                    : <h4>{percentage}</h4>
                } <h4>%</h4>
            </div>

            {
                !isEdit && <button onClick={switchIsEdit} className={`colorWhite rectangleButtonPrimary`}>Edit</button>
            }
        </div>
        
        <div className={styles.settingsButtonsHolder}> 
            {
                isEdit && <div>
                    <button onClick={switchIsEdit} className={`rectangleButtonPrimary`}>Save</button>
                    <button onClick={switchIsEdit} className={`rectangleButtonGrey`}>Cancel</button>
                </div>
            }
        </div>
        
        <div className={styles.settingsButtonsHolder}>
            <button onClick={doLogout} className={`${styles.signOutButton} rectangleButtonGrey`}>Sign Out</button>
        </div>

    </div>
}

export default SettingsIndex;