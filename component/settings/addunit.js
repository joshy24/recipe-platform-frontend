import styles from "../../styles/Settings.module.css"

import { useState } from "react"

import { CREATE_UNITS_URL } from "../../utils/api.endpoints"

import { postRequest } from "../../utils/api.requests"

import { AppContext } from "../../pages/AppContext";

import { getBaseUnits } from "../../utils/helper"

const AddUnit = ({closeAddUnit, getUnits, baseUnits}) => {
    const appContext = AppContext()

    const [unit, setUnit] = useState({name: "", abbreviation: "", amount: 1000, isDefault: false, parent: null, isBase: false})
    
    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        const isBase = (name=="parent" && value!="none") ? true : false
        
        setUnit({...unit, [name]:value, isBase:isBase});
    }

    const doCreateUnit = async() => {
        appContext.setLoading(true);

        if(!!unit.name && !!unit.abbreviation && !!unit.amount){
            allUnits.push(childUnit)
        }

        if(!isBase && !parent){
            appContext.setMessage({visible: true, message: "Either add unit to base or make unit base unit", title: "Units Not Saved", type: "INFO"})
            return;
        }

        try{
            let result = await postRequest(CREATE_UNITS_URL, {unit})

            if(!!result){
                getUnits()
                closeAddUnit()
            }

            appContext.setLoading(false);
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
            appContext.setMessage({visible: true, message: "An error occurred saving units. Please make sure the unit does not exist", title: "Units Not Saved", type: "ERROR"})
        }
    }

    return <div className="popUp">
            <div className="popUpInnerContentWide">
                <h3 className="pageTitle">Add Unit</h3>

                <h6>Only the parent unit is required</h6>

                

                <div className={styles.addUnitRow}>
                    <h5 style={{width: "16%"}}>Base</h5>
                    <select onChange={onChange} name="parent" className="pageContentTopSelectField ptSearchInput">
                        <option value="none">None</option>
                        {
                            baseUnits.map(aBaseUnit => {
                                return <option value={aBaseUnit}>{aBaseUnit.name} ({aBaseUnit.abbreviation})</option>
                            })
                        }
                    </select>
                </div>

                <div className={styles.addUnitRow}>
                    <h5 style={{width: "16%"}}>Unit</h5>
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} onChange={onChange} type="text" name="name" value={unit.name} placeholder="Name - e.g Gram" />
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} onChange={onChange} type="text" name="abbreviation" value={unit.abbreviation} placeholder="Abbreviation - e.g g" />
                    <input className={`ptSearchInput ${styles.addUnitRowItem}`} onChange={onChange} type="number" name="amount" value={unit.amount} placeholder="Amount - e.g 1000" />
                </div>

                <div className="popButtonHolder" style={{marginTop: "30px"}}>
                    <button onClick={doCreateUnit} className="colorWhite rectangleButtonPrimary">Save</button>
                    <button onClick={closeAddUnit} className="colorBlack rectangleButtonSecondary">Close</button>
                </div>
            </div>
        </div>
}

export default AddUnit;

/*
    <div className={styles.addUnitRowHeader}>
        <h5 style={{width: "16%"}}></h5>
        <h5 className="addUnitRowItem">Name</h5>
        <h5 className="addUnitRowItem">Abbreviation</h5>
        <h5 className="addUnitRowItem">Amount</h5>
    </div>  
*/