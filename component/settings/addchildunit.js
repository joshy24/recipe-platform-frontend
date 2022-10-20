import styles from "../../styles/Settings.module.css"

import { useState } from "react"

import { CREATE_CHILD_UNIT_URL } from "../../utils/api.endpoints"

import { postRequest } from "../../utils/api.requests"

import { toUpperCase } from "../../utils/helper"

import { AppContext } from "../../pages/AppContext";

const AddChildUnit = ({closeAddChildUnit, getUnits, parentUnitDetails}) => {

    const appContext = AppContext()

    const [parentUnit, setParentUnit] = useState({...parentUnitDetails, amount: 1})
    const [childUnit, setChildUnit] = useState({name: "", abbreviation: "", amount: 1000, isDefault: false, isParent: false, parentId: null})
    
    const onChildChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        
        setChildUnit({...childUnit, [name]:value});
    }

    const doCreateChildUnit = async() => {
        appContext.setLoading(true);

        const allUnits = []

        allUnits.push(parentUnit)

        if(!childUnit.name || !childUnit.abbreviation || !childUnit.amount){
            appContext.setMessage({visible: true, message: "Complete all fields!", title: "Message", type: "INFO"})
            return;
        }

        try{
            let result = await postRequest(CREATE_CHILD_UNIT_URL, {childUnit, parentId: parentUnit._id})

            if(!!result){
                getUnits()
                closeAddChildUnit()
            }

            appContext.setLoading(false);
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
            appContext.setMessage({visible: true, message: "An error occurred saving units", title: "Units Not Saved", type: "ERROR"})
        }
    }

    return <div className="popUp">
            <div className="popUpInnerContentWide">
                <h3 className="pageTitle">Add Unit</h3>

                <h6>Only the parent unit is required</h6>

                <div className={styles.addUnitRowHeader}>
                    <h5 style={{width: "16%"}}></h5>
                    <h5 className="addUnitRowItem">Name</h5>
                    <h5 className="addUnitRowItem">Abbreviation</h5>
                    <h5 className="addUnitRowItem">Amount</h5>
                </div>

                <div className={styles.addUnitRow}>
                    <h5 style={{width: "16%"}}>Parent</h5>
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} readonly="readonly" disabled="disabled" type="text" name="name" value={parentUnit.name} />
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} readonly="readonly" disabled="disabled" type="text" name="abbreviation" value={parentUnit.abbreviation} />
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} readonly="readonly" disabled="disabled" type="number" name="amount" value={parentUnit.amount} />
                </div>

                <div className={styles.addUnitRow}>
                    <h5 style={{width: "16%"}}>Child</h5>
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} onChange={onChildChange} type="text" name="name" value={childUnit.name} placeholder="Name e.g Gram" />
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} onChange={onChildChange} type="text" name="abbreviation" value={childUnit.abbreviation} placeholder="Abbreviation e.g g" />
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} onChange={onChildChange} type="number" name="amount" value={childUnit.amount} placeholder="Amount e.g 1000" />
                </div>

                <div className="popButtonHolder" style={{marginTop: "30px"}}>
                    <button onClick={doCreateChildUnit} className="colorWhite rectangleButtonPrimary">Save</button>
                    <button onClick={closeAddChildUnit} className="colorBlack rectangleButtonSecondary">Close</button>
                </div>
            </div>
        </div>
}

export default AddChildUnit;