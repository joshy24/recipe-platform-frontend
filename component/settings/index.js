import {useState} from 'react'
import styles from "../../styles/Settings.module.css"

import { useRouter } from "next/router"

import AuthHelperMethods from "../../utils/AuthHelperMethods";
const Auth = new AuthHelperMethods();

const SettingsIndex = () => {
    const router = useRouter() 

    const user = Auth.getAdmin()

    const [isEdit, setIsEdit] = useState(false)
    const [isInput, setIsInput] = useState(false)

    const [percentage, setPercentage] = useState(user.profit_margin)

    const showValidInput = () => {
        setIsInput(true)
    }

    const hideValidInput = () => {
        setIsInput(false)
    }
    
    const switchIsEdit = () => {
        setIsEdit(!isEdit)
    }

    const validInput = () => {
        hideValidInput()

        if(percentage === "") {
            showValidInput()
        } else {
            setIsEdit(!isEdit)  
        }
    }

    const onChange = (e) => {
        let value = e.target.value;
        let name = e.target.name
        
        let string = value
    
        let usingSplit = string.split('')

        if(usingSplit[0]==="0") {

            let x = 0;

            for(let i=1; i < usingSplit.length; i++) {
                if(usingSplit[i] !== "0") {
                    x++;
                    break;
                }
                x++;
            }
            usingSplit.splice(0, x)
            value = usingSplit.join('')
            
        }

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
                    ? <div>
                        <input className="ptInput" onChange={onChange} value={percentage} type="number" name="percentage" placeholder="Enter margin percentage" />
                        {
                            isInput && <h5 className={styles.settingsErrorText}>Input field cannot be empty.</h5>
                        }
                    </div>
                    : <h4>{percentage}%</h4>
                }
            </div>

            {
                !isEdit && <button onClick={switchIsEdit} className={`colorWhite rectangleButtonPrimary`}>Edit</button>
            }
        </div>
        
        <div className={styles.settingsButtonsHolder}> 
            {
                isEdit && <div>
                    <button onClick={validInput} className={`rectangleButtonPrimary`}>Save</button>
                    <button onClick={validInput} className={`rectangleButtonGrey`}>Cancel</button>
                </div>
            }
        </div>
        
        <div className={styles.settingsButtonsHolder}>
            <button onClick={doLogout} className={`${styles.signOutButton} rectangleButtonGrey`}>Sign Out</button>
        </div>

    </div>
}

export default SettingsIndex;