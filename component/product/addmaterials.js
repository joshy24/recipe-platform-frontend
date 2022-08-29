import { useEffect, useState, useContext } from "react"

import EmptyResult from "../general/emptyResult"

import MaterialToAdd from "./materialToAdd"

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
    color: "#4D4D4C",
    marginTop: "12px"
}

import { AppContext } from "../../pages/AppContext";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, MATERIALS_TO_ADD, ADD_MATERIALS_TO_PRODUCT } from "../../utils/api.endpoints"

const add_materials_url = BASE_URL + ADD_MATERIALS_TO_PRODUCT

const AddMaterials = ({hideAddMaterial, loadProductMaterials, product}) => {

    const value = AppContext();
    
    const [materials, setMaterials] = useState([])

    const [selectedMaterials, setSelectedMaterials] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState("")

    useEffect(() => {
        getMaterialsToAdd()
    }, [])

    const onChange = (e, material) => {
        const value = e.target.value

        material.quantity = value

        const foundIndex = materials.findIndex(aMaterial => aMaterial._id == material._id)

        if(foundIndex != -1){
            const sm = selectedMaterials

            sm.splice(foundIndex,1,material)

            setMaterials(sm)
        }
    }

    const getMaterialsToAdd = async() => {
        setIsLoading(true)
        try{
            const result = await getRequest(MATERIALS_TO_ADD+"?product_id="+product._id)

            const new_result = result.response.map(material => {
                return {...material, quantity: 0}
            })

            setMaterials(new_result)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
        }
    }

    const addMaterialToSelected = (material) => {
        setError("")
        
        const sm = selectedMaterials;

        const foundIndex = selectedMaterials.findIndex(aMaterial => aMaterial.material == material._id)

        if(foundIndex == -1){
            sm.push({
                material: material._id,
                quantity: material.quantity
            })
        }
        else{
            sm.splice(foundIndex, 1)
        }

        setSelectedMaterials(sm)
    }

    const doAddMaterials = async()=>{
        if(selectedMaterials.length > 0){
            value.setBlockingLoading(true)

            setError("")
           
            try{
                const response = await postRequest(add_materials_url, {id: product._id, materials: selectedMaterials})

                value.setBlockingLoading(false)

                loadProductMaterials()

                hideAddMaterial()
            }
            catch(err){
                console.log(err)
                value.setBlockingLoading(false)
            }
        }
        else{
            if(materials.length > 0){
                setError("Add materials to product by clicking/tapping the add button")
            }
        }
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Materials to {product.name}</h4>
                    <h5 style={mediumTextStyle}>Select Materials to add</h5>
                </div>

                <div style={{display: "flex"}}>
                    <button onClick={doAddMaterials} className="rectangleButtonPrimary">Save</button>
                    <button onClick={hideAddMaterial} style={{marginLeft: "16px"}} className="rectangleButtonSecondary">Close</button>
                </div>
            </div>
            <div className="popUpAddInnerContentBottom">
                <h5 className="colorOrange">{error && error.length > 0 && error}</h5>
                <table className="tabbedListTable" style={{width: "100%"}}>      
                {
                    !isLoading ? 
                        <>
                            {
                                materials && materials.length > 0 ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Name</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Quantity</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Size</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Price</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Quantity To Add</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Total Cost</th>
                                    <th style={{width: "16%", paddingLeft: "20px"}}></th>
                                </tr>
                                {
                                    materials.map(material => {
                                        return <MaterialToAdd addToSelected={addMaterialToSelected} material={material} onChange={onChange} selectedMaterials={selectedMaterials} />
                                    })
                                }
                            </tbody>

                                : <EmptyResult  message={"No Materials found to add. Add materials to inventory"} onEmptyButtonClicked={getMaterialsToAdd} emptyButtonText={"Try Again"} />
                            }
                        </>
                    : <Skeleton count={8} height={40} />
                }
                </table>
            </div>
        </div>
    </div>
}

export default AddMaterials;