
import styles from "../../styles/Ingredients.module.css"

import IngredientsList from "./ingredientslist"

import AddIngredient from "../general/addingredient"

import DeleteDialog from "../general/deletedialog"

import { useState } from "react"

import Image from "next/image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash, faSearch, faFileExport, faEdit, faAdd, faPen } from '@fortawesome/free-solid-svg-icons'

const ingredients = [
    {
        _id: 1,
        name: "Salt",
        purchase_quantity: 1,
        purchase_size: "kg",
        price: 200,
    },
    {
        _id: 2,
        name: "Sugar",
        purchase_quantity: 1,
        purchase_size: "g",
        price: 500,
    },
    {
        _id: 3,
        name: "Ketchup",
        purchase_quantity: 1,
        purchase_size: "cl",
        price: 2000,
    },
    {
        _id: 4,
        name: "Butter",
        purchase_quantity: 1,
        purchase_size: "g",
        price: 650,
    }
]

const IngredientsIndex = () => {

    const [showAdd, setShowAdd] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const showAddIngredient = () => {
        setShowAdd(true)
    }

    const closeAddIngredient = () => {
        setShowAdd(false)
    }
    
    const onPerformDeleteClicked = () => {
        setShowDelete(false);
    }

    const onCancelDeleteClicked = () => {
        setShowDelete(false);
    }

    return <> 
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Inventory</h2>
                    <h5>Ingredients and Materials</h5>
                </div>
                
                <div className="pageHolderContentTopRight">
                    <select className="pageContentTopSelectField">
                        <option>All</option>
                        <option>Materials</option>
                        <option>Ingredients</option>
                    </select>
                    <select className="pageContentTopSelectField">
                        <option>All</option>
                        <option>Low</option>
                        <option>Normal</option>
                    </select>
                    <button onClick={showAddIngredient} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faAdd} /></button>
                    <button className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faSearch} /></button>
                    <button onClick={showAddIngredient} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faFileExport} /></button>
                </div>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTableHolder">
                <table className="tabbedListTable" style={{width: "100%"}}>
                    <tr className="header" style={{marginBottom: "24px"}}>
                        <th style={{width: "12%", paddingLeft: "20px"}}>Name</th>
                        <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Quantity</th>
                        <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Size</th>
                        <th style={{width: "12%", paddingLeft: "20px"}}>Price</th>
                        <th style={{width: "12%", paddingLeft: "20px"}}>Quantity (In Stock)</th>
                        <th style={{width: "12%", paddingLeft: "20px"}}>Price (In Stock)</th>
                        <th style={{width: "12%", paddingLeft: "20px"}}>Status</th>
                        <th style={{width: "16%", paddingLeft: "20px"}}></th>
                    </tr>
                    <tr className="notHeader">
                        <td style={{paddingLeft: "30px"}}>Sugar</td>
                        <td style={{paddingLeft: "30px"}}>1</td>
                        <td style={{paddingLeft: "30px"}}>10 kg</td>
                        <td style={{paddingLeft: "30px"}}>#150</td>
                        <td style={{paddingLeft: "30px"}}>50</td>
                        <td style={{paddingLeft: "30px"}}>#15000</td>
                        <td style={{paddingLeft: "30px"}}>NORMAL</td>
                        <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                            <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>
                    <tr className="notHeader">
                        <td style={{paddingLeft: "30px"}}>Salt</td>
                        <td style={{paddingLeft: "30px"}}>1</td>
                        <td style={{paddingLeft: "30px"}}>16 kg</td>
                        <td style={{paddingLeft: "30px"}}>#300</td>
                        <td style={{paddingLeft: "30px"}}>30</td>
                        <td style={{paddingLeft: "30px"}}>#20000</td>
                        <td style={{paddingLeft: "30px"}}>NORMAL</td>
                        <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                            <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>
                    <tr className="notHeader">
                        <td style={{paddingLeft: "30px"}}>Spice</td>
                        <td style={{paddingLeft: "30px"}}>1</td>
                        <td style={{paddingLeft: "30px"}}>5 kg</td>
                        <td style={{paddingLeft: "30px"}}>#40</td>
                        <td style={{paddingLeft: "30px"}}>50</td>
                        <td style={{paddingLeft: "30px"}}>#10,000</td>
                        <td style={{paddingLeft: "30px"}}>LOW</td>
                        <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                            <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>
                    <tr className="notHeader">
                        <td style={{paddingLeft: "30px"}}>Thyme</td>
                        <td style={{paddingLeft: "30px"}}>1</td>
                        <td style={{paddingLeft: "30px"}}>2 kg</td>
                        <td style={{paddingLeft: "30px"}}>#50</td>
                        <td style={{paddingLeft: "30px"}}>4</td>
                        <td style={{paddingLeft: "30px"}}>#200</td>
                        <td style={{paddingLeft: "30px"}}>LOW</td>
                        <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                            <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>
                    <tr className="notHeader">
                        <td style={{paddingLeft: "30px"}}>Curry</td>
                        <td style={{paddingLeft: "30px"}}>1</td>
                        <td style={{paddingLeft: "30px"}}>4 kg</td>
                        <td style={{paddingLeft: "30px"}}>#50</td>
                        <td style={{paddingLeft: "30px"}}>30</td>
                        <td style={{paddingLeft: "30px"}}>#6000</td>
                        <td style={{paddingLeft: "30px"}}>NORMAL</td>
                        <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                            <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
                    </tr>

                    
                </table>
            </div>
        </div>
    </>
}

export default IngredientsIndex;