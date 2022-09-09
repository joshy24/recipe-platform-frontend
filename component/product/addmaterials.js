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

import { defaultPaginationObject } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, MATERIALS_TO_ADD, ADD_MATERIALS_TO_PRODUCT } from "../../utils/api.endpoints"

const add_materials_url = BASE_URL + ADD_MATERIALS_TO_PRODUCT

const AddMaterials = ({hideAddMaterial, loadProductMaterials, product}) => {

    const appContext = AppContext();
    
    const [materials, setMaterials] = useState([])

    const [selectedMaterials, setSelectedMaterials] = useState([])

    const [error, setError] = useState("")

    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getMaterialsToAddSearch()
    }, [])

    const onChange = (e, material) => {
        const value = e.target.value

        material.quantity = value

        const foundIndex = materials.docs.findIndex(aMaterial => aMaterial._id == material._id)

        if(foundIndex != -1){
            const sm = selectedMaterials

            sm.splice(foundIndex,1,material)

            setMaterials({...materials, docs: sm})
        }
    }

    const getMaterialsToAdd = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(MATERIALS_TO_ADD+"?product_id="+product._id)

            const new_result = result.response.map(material => {
                return {...material, quantity: 0}
            })

            setMaterials(new_result)

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const emptySearchAndGetMaterials = async() => {
        setSearchTerm("")

        appContext.setLoading(true)

        try{
            const result = await getRequest(MATERIALS_TO_ADD+"?product_id="+product._id+"&search_term="+"&page="+pagination.page+"&limit="+pagination.limit)

            const new_result = result.response.map(material => {
                return {...material, quantity: 0}
            })

            setMaterials({...result.response, docs: new_result})

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const getMaterialsToAddSearch = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(MATERIALS_TO_ADD+"?product_id="+product._id+"&search_term="+searchTerm+"&page="+pagination.page+"&limit="+pagination.limit)

            const new_result = result.response.docs.map(material => {
                return {...material, quantity: 0}
            })

            setMaterials({...result.response, docs: new_result})

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
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
            appContext.setBlockingLoading(true)

            setError("")
           
            try{
                const response = await postRequest(add_materials_url, {id: product._id, materials: selectedMaterials})

                appContext.setBlockingLoading(false)

                loadProductMaterials()

                hideAddMaterial()
            }
            catch(err){
                console.log(err)
                appContext.setBlockingLoading(false)
            }
        }
        else{
            if(materials.length > 0){
                setError("Add materials to product by clicking/tapping the add button")
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Materials to {product.name}</h4>
                    <h5 style={mediumTextStyle}>Select Materials to add</h5>

                    <div style={{marginTop: "16px"}}>
                        <SearchInput search_value={searchTerm} searchClicked={getMaterialsToAddSearch} onSearchChanged={onSearchChanged} closeSearchClicked={emptySearchAndGetMaterials} />
                    </div>
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
                    !appContext.state.isLoading ? 
                        <>
                            {
                                materials && materials.docs && materials.docs.length > 0 ? <tbody>
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
                                    materials.docs.map(material => {
                                        return <MaterialToAdd addToSelected={addMaterialToSelected} material={material} onChange={onChange} selectedMaterials={selectedMaterials} />
                                    })
                                }
                            </tbody> : <EmptyResult  message={"No Materials found to add. Add materials to inventory"} onEmptyButtonClicked={getMaterialsToAddSearch} emptyButtonText={"Try Again"} />
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