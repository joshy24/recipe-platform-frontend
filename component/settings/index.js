import {useState} from 'react'
import styles from "../../styles/Settings.module.css"
import Link from "next/link"

import { useRouter } from "next/router"

import AuthHelperMethods from "../../utils/AuthHelperMethods"

const SettingsIndex = () => {
    const router = useRouter() 

    const Auth = new AuthHelperMethods();

    const [isEdit, setIsEdit] = useState(false)

    const [percentage, setPercentage] = useState(20)
    
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

    return <div className={styles.settingsIndex}>
        <div className={styles.settingsIndexTop}>
            <h2 className="pageTitle">
                Settings
            </h2>
        </div>

        <div className={styles.settingsDetails}>
            <h4>
                Profit margin of Recipes - 
            </h4>

            <div className={styles.settingsInputFieldHolder}>
                { 
                    isEdit
                    ? <input onChange={onChange} value={percentage} type="number" name="percentage" placeholder="Enter margin percentage" />
                    : <h4>{percentage}</h4>
                } <h4>%</h4>
            </div>

            {
                !isEdit && <button onClick={switchIsEdit} className={`colorWhite secondaryButton`}>Edit</button>
            }
        </div>
        
        <div className={styles.settingsButtonsHolder}> 
            {
                isEdit && <div>
                    <button onClick={switchIsEdit} className={`primaryButton`}>Save</button>
                    <button onClick={switchIsEdit} className={`greyButton`}>Cancel</button>
                </div>
            }
        </div>
        
        <div className={styles.settingsButtonsHolder}>
            <button onClick={doLogout} className={`${styles.signOutButton} greyButton`}>Sign Out</button>
        </div>

    </div>
}

export default SettingsIndex;