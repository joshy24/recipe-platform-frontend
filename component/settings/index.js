import {useEffect, useState} from 'react'
import styles from "../../styles/Settings.module.css"

import AddUnit from "./addunit"
import AddChildUnit from "./addchildunit"

import { AppContext } from "../../pages/AppContext";

import { useRouter } from "next/router"

import { toUpperCase, getBaseUnits } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {EDIT_PROFILE_URL, GET_UNITS_URL, DELETE_UNIT_URL} from "../../utils/api.endpoints"

import { deleteRequest, getRequest, putRequest} from "../../utils/api.requests"

import { faTrash, faAdd, faPen } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DeleteDialog from "../general/deletedialog"

import AuthHelperMethods from "../../utils/AuthHelperMethods";
const Auth = new AuthHelperMethods();


const SettingsIndex = () => {
    const router = useRouter() 

    const user = Auth.getAdmin()

    const appContext = AppContext()

    const [isEdit, setIsEdit] = useState(false)
    const [isInput, setIsInput] = useState(false)

    const [showAddUnit, setShowAddUnit] = useState(false)
    const [showAddChildUnit, setShowAddChildUnit] = useState(false)

    const [showDeleteUnit, setShowDeleteUnit] = useState(false)
    const [showEditUnit, setShowEditUnit] = useState(false)

    const [units, setUnits] = useState([])
    const [filteredUnits, setFilteredUnits] = useState([])
    

    const [percentage, setPercentage] = useState((!user.profit_margin || user.profit_margin == 0) ? "" : user.profit_margin)

    const [entityInFocus, setEntityInfocus] = useState(null)

    const [baseUnit, setBaseUnit] = useState("none")

    useEffect(() => {
        getUnits()
    }, [])

    useEffect(() => {
        const baseUnits = getBaseUnits(units)

        if(baseUnits.length > 0 && !baseUnit){
            setBaseUnit(baseUnits[0])
        }
        
    }, [units])

    const closeDeleteUnit = () => {
        setEntityInfocus({})
        setShowDeleteUnit(false)
    }

    const openDeleteUnit = (e, unit) => {
        e.preventDefault()
        setEntityInfocus(unit)
        setShowDeleteUnit(true)
    }

    const closeEditUnit = () => {
        setShowEditUnit(false)
    }

    const deleteUnit = async () => {
        appContext.setBlockingLoading(true)

        try{
            let result = await deleteRequest(DELETE_UNIT_URL, {unitId: entityInFocus._id})

            closeDeleteUnit()

            if(!!result){
                getUnits()
            }

            appContext.setBlockingLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setBlockingLoading(false)
            appContext.setMessage({visible: true, message: "An error occurred deleteing the unit", title: "Unit Not Deleted", type: "ERROR"})
        }
    }
    
    const openEditUnit = () => {
        setShowEditUnit(true)
    }

    const openAddUnit = () => {
        setShowAddUnit(true)
    }

    const closeAddUnit = () => {
        setShowAddUnit(false)
    }

    const openAddChildUnit = (e, parentUnit) => {
        e.preventDefault()
        setEntityInfocus(parentUnit)
        setShowAddChildUnit(true)
    }

    const closeAddChildUnit = () => {
        setEntityInfocus(null)
        setShowAddChildUnit(false)
    }

    const showValidInput = () => {
        setIsInput(true)
    }

    const hideValidInput = () => {
        setIsInput(false)
    }
    
    const switchIsEdit = () => {
        setIsEdit(!isEdit)
    }

    const getUnits = async () => {
        appContext.setLoading(true);

        try{
            let result = await getRequest(GET_UNITS_URL)
            
            if(!!result){
                setUnits(result.response)
                setFilteredUnits(result.response)

            }

            appContext.setLoading(false);
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
            appContext.setMessage({visible: true, message: "An error occurred fetching units", title: "Units Not Loaded", type: "ERROR"})
        }
    }

    const cancelInput = () => {
        hideValidInput()

        setPercentage(user.profit_margin)

        setIsEdit(!isEdit)  
        
    }

    const onChange = (e) => {
        let value = e.target.value;
        let name = e.target.name 
        setPercentage(value)
    }

    const onBaseUnitChange = (e) => {
        let value = e.target.value;

        if(value == "none"){
            setFilteredUnits(units)
        }
        else{
            const filteredtItems = units.filter(aUnit => {
                return (aUnit.parent == value) && !aUnit.isBase
            })

            setFilteredUnits(filteredtItems)
        }

        setBaseUnit(value)
    }

    const saveInput = async () => {
        appContext.setBlockingLoading(true)
        hideValidInput()

        try {
            if(percentage === "") {
                showValidInput()
            } else {

                user.profit_margin = percentage;

                const result = await putRequest(EDIT_PROFILE_URL, user)

                Auth.setAdmin(user)
    
                appContext.setBlockingLoading(false)
    
                setIsEdit(!isEdit)  
            }
        } catch(err) {
            console.log(err)
            appContext.setBlockingLoading(false)
        }
    }

    const doLogout = () => {
        Auth.logout();
        router.push("/auth/signin")
    }

    return <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <h2 className="pageTitle">
                    Settings
                </h2>
            </div>

            <div className={styles.settingsDetails}>
                <h4 style={{marginTop: "0px"}}>
                    Profit margin - 
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
                        <button onClick={saveInput} className={`rectangleButtonPrimary`}>Save</button>
                        <button onClick={cancelInput} className={`rectangleButtonGrey`}>Cancel</button>
                    </div>
                }
            </div>

            <div>
                <div style={{display: "flex", justifyContent: "space-between", width: "100%", minWidth: "600px", alignItems: "center"}}>
                    <h4 style={{marginTop: "0px"}}>
                        <strong>Units</strong>
                    </h4>
                    <div>
                        <button onClick={openAddUnit} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                    </div>
                </div>

                <div className="tabbedListMainHolder" style={{width: "100%", minWidth: "600px", marginTop: "16px", paddingTop: "0px"}}>
                    <div className="tabbedListTableHolder largeTopMargin">   
                        {
                            !appContext.state.isLoading && units && units.length > 0 && <div className={`${styles.tabbedListTable}`}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <h4 style={{margin: "0px 8px 0px 0px"}}>Base Units Filter</h4>
                                    <select style={{margin: "0px"}} onChange={onBaseUnitChange} name="parent" className="pageContentTopSelectField ptSearchInput">
                                        <option value="none">None</option>
                                        {
                                            getBaseUnits(units).map(aBaseUnit => {
                                                return <option key={aBaseUnit._id} value={aBaseUnit._id}>{aBaseUnit.name} ({aBaseUnit.abbreviation})</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        }

                        {

                            !appContext.state.isLoading ? 
                            <table className={`${styles.tabbedListTable}`} style={{width: "100%", minWidth: "600px"}}>
                                <tbody>
                                    <tr style={{marginBottom: "24px"}}>
                                        <th style={{width: "25%"}}>Name</th>
                                        <th style={{width: "25%"}}>Abbreviation</th>
                                        <th style={{width: "25%"}}>Amount</th>
                                        <th style={{width: "25%"}}></th>
                                    </tr>
                                    {
                                        filteredUnits && filteredUnits.length > 0 && filteredUnits.map(unit => {
                                            return <tr className={styles.productItem} key={unit._id}>
                                                    <td>{unit && toUpperCase(unit.name)} {unit.isBase && "(base unit)"}</td>
                                                    <td>{unit.abbreviation}</td>
                                                    <td>{unit.amount}</td>
                                                    <td className="tabbedListContentHorizontalTableContent">
                                                        {
                                                            unit.isDefault ? <></> : <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                        }
                                                        
                                                        {
                                                            unit.isDefault ? <></> : <button onClick={e => openDeleteUnit(e, unit)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                        }

                                                        {
                                                            unit.isBase && <button onClick={e => openAddChildUnit(e, unit)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faAdd} /></button>
                                                        }
                                                    </td> 
                                                    
                                                </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            : <div className="skeletonHolder">
                                    <Skeleton count={8} height={50} />
                                </div>
                        }   
                        
                    </div>
                </div>
            </div>
            
            <div className={styles.settingsButtonsHolder}>
                <button onClick={doLogout} className={`${styles.signOutButton} rectangleButtonGrey`}>Sign Out</button>
            </div>

        </div>
                        
        {
            showAddUnit && <AddUnit closeAddUnit={closeAddUnit} getUnits={getUnits} baseUnits={getBaseUnits(units)} />
        }
        
        {
            showAddChildUnit && <AddChildUnit closeAddChildUnit={closeAddChildUnit} getUnits={getUnits} parentUnitDetails={entityInFocus} />
        }

        {
            showDeleteUnit && <DeleteDialog message={"Confirm that you want to delete "+entityInFocus.name} onPerformDeleteClicked={deleteUnit} onCancelDeleteClicked={closeDeleteUnit} type={"Unit"} />
        }
    </>
}

export default SettingsIndex;