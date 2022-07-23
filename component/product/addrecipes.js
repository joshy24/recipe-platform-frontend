import { useEffect, useState } from "react"

const BigTextStyle = {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "15px",
    color: "#4D4D4C"
}

const mediumTextStyle = {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "15px",
    color: "#4D4D4C"
}


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, MATERIALS_TO_ADD } from "../../utils/api.endpoints"

const materials_to_add_url = BASE_URL + MATERIALS_TO_ADD

const materialObject = {
    material: null,
    quantity: 1
}

const AddRecipes = ({closeAddMaterial, addMaterial, product_id}) => {

    //const [material, setMaterial] = useState({name: "", purchase_quantity: "", purchase_size: "", price: 0, quantity_in_stock: 0})
    
    const [materials, setMaterials] = useState([])

    const [selectedMaterials, setSelectedMaterials] = useState([])


    useEffect(() => {
        getMaterialsToAdd()
    }, [])

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setMaterial({...material, [name]:value});
    }

    const getMaterialsToAdd = async() => {
        try{
            const result = await getRequest(materials_to_add_url+"?product_id="+product_id)

            setMaterials(result.response)
        }
        catch(err){
            console.log(err)
        }
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Materials</h4>
                    <h5 style={mediumTextStyle}>Select Materials to add</h5>
                </div>

                <button className="rectangleButtonPrimary">Continue</button>
            </div>
            <div className="popUpAddInnerContentBottom">
                <table className="tabbedListTable" style={{width: "100%"}}>      
                    {
                        <tbody>
                            <tr className="header" style={{marginBottom: "24px"}}>
                                <th style={{width: "20%"}}>Name</th>
                                <th style={{width: "20%"}}>Quantity</th>
                                <th style={{width: "20%"}}>Unit</th>
                                <th style={{width: "20%"}}>Cost</th>
                                <th style={{width: "20%"}}></th>
                            </tr>

                            {
                                materials && materials.length > 0 && materials.map(material => {
                                    <tr className="notHeader">
                                        <td>{material.name}</td>
                                        <td>{material.purchase_quantity}</td>
                                        <td>{material.purchase_size}</td>
                                        <td>₦{material.price}</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody> 
                    }
                </table>
            </div>
        </div>
    </div>
}

export default AddRecipes;