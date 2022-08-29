
import AddIngredient from "../general/addingredient"

import EditIngredient from "../general/editingredient"

import DeleteDialog from "../general/deletedialog"

import { AppContext } from "../../pages/AppContext";

import { useEffect, useState, useContext } from "react"

import EmptyResult from "../general/emptyResult"

import SearchInput from "../general/searchInput"

import Papa from "papaparse"

import Image from "next/image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash, faSearch, faFileExport, faAdd, faPen, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { toUpperCase, getAmount, downloadFile } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import { BASE_URL, DELETE_INGREDIENT_URL, DELETE_MATERIAL_URL, CREATE_INGREDIENT, CREATE_MATERIAL, GET_ALL_INVENTORY, EDIT_INGREDIENT_URL, EDIT_MATERIAL_URL} from "../../utils/api.endpoints"

const create_ingredient_url = BASE_URL + CREATE_INGREDIENT
const create_material_url = BASE_URL + CREATE_MATERIAL
const get_inventory_url = BASE_URL + GET_ALL_INVENTORY

const IngredientsIndex = () => {

    const value = AppContext()

    const [showAdd, setShowAdd] = useState(false)

    const [showEdit, setShowEdit] = useState(false)

    const [isDelete, setIsDelete] = useState({visible: false, title:"", message:"", type:""})

    const [filters, setFilters] = useState({type: "materials", status: "All", searchTerm: ""})

    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const [inventory, setInventory] = useState([])

    const [pagination] = useState({limit: 30, offset: 0})

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [inventoryInFocus, setInventoryInFocus] = useState({})


    useEffect(() => {
        search();
    }, [])

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const openShowAdd = () => {
        setShowAdd(true)
    }

    const closeShowAdd = () => {
        setShowAdd(false)
    }
    
    const onPerformDeleteClicked = () => {
        setShowDelete(false);
    }

    const onCancelDeleteClicked = () => {
        setShowDelete(false);
    }

    const showSearch = () => {
        setIsSearchOpen(true)
    }

    const hideSearch = () => {
        setIsSearchOpen(false)
    }

    const search = async () => {
        value.setLoading(true)

        try{
            let url = get_inventory_url + "?limit="+pagination.limit+"&offset="+pagination.offset+"&type="+filters.type+"&searchTerm="+searchTerm+"&status="+filters.status
            
            var result = await getRequest(url)

            setInventory(result.response)

            value.setLoading(false)
        }
        catch(err){
            value.setLoading(false)
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    const showExport = () => {

    }

    const hideExport = () => {

    }

    const showEditInventory = (e, anInventory) => {
        e.preventDefault()
        setInventoryInFocus(anInventory)
        setShowEdit(true)
    }

    const hideEditInventory = () => {
        setInventoryInFocus({})
        setShowEdit(false)
    }

    const editInventory = async(e, inventorytoEdit) => {
        e.preventDefault();
        
        value.setBlockingLoading(true)

        try{
            ilters.type == "ingredients" ? 
            await putRequest(EDIT_INGREDIENT_URL, {ingredient: {...inventorytoEdit, _id: inventoryInFocus._id}})
            : await putRequest(EDIT_MATERIAL_URL, {material: {...inventorytoEdit, _id: inventoryInFocus._id}});

            hideEditInventory()

            search();

            value.setBlockingLoading(false)
        }
        catch(err){
            value.setBlockingLoading(false)
            setMessage("An error occurred processing the request.")
            setErrorMessageVisible(true)
        }
    }

    const performExport = async () => {
        if(inventory && inventory.docs.length > 0){
            const csv = Papa.unparse(inventory)

            //download content
            downloadFile(csv, "export.csv")
        }
    }

    const showDeleteInventoryItem = (e, anInventory) => {
        e.preventDefault()

        setInventoryInFocus(anInventory)

        setIsDelete({visible: true, title: "Confirm Action", message:`Confirm that you want to delete ${toUpperCase(anInventory.name)} from inventory`})
    }

    const hideDeleteInventoryItem = () => {
        setIsDelete({visible: false, title: "", message:"", type: ""})
    }

    const deleteInventoryItem = async () => {
        hideDeleteInventoryItem()
        
        value.setBlockingLoading(true)
        
        try{
            await deleteRequest(filters.type == "ingredients" ? DELETE_INGREDIENT_URL : DELETE_MATERIAL_URL, {id:inventoryInFocus._id})

            value.setBlockingLoading(false)

            setInventoryInFocus({})

            search()
        }
        catch(err){
            console.log(err)

            value.setBlockingLoading(false)
        }
    }

    const addInventory = async (e, inventoryToAdd) => {
        e.preventDefault();
        
        value.setBlockingLoading(true)

        try{
            var result = inventoryToAdd.type == "Ingredient" ? 
             await postRequest(create_ingredient_url, {ingredient: inventoryToAdd})
             : await postRequest(create_material_url, {material: inventoryToAdd});

            closeShowAdd()

            search();

            value.setBlockingLoading(false)
        }
        catch(err){
            value.setBlockingLoading(false)
            setMessage("An error occurred processing the request.")
            setErrorMessageVisible(true)
        }
    }

    async function onFieldChanged(event){
        event.preventDefault()
        const target = event.target;
        const aVal = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFilters({...filters, [name]:aVal})

        value.setLoading(true)

        try{
            let url = get_inventory_url + "?limit="+pagination.limit+"&offset="+pagination.offset+"&type="+ (name == "type" ? aVal : filters.type)+"&searchTerm="+(name == "searchTerm" ? aVal : filters.searchTerm)+"&status="+(name == "status" ? aVal : filters.status)
            
            var result = await getRequest(url)

            setInventory(result.response)

            value.setLoading(false)
        }
        catch(err){
            value.setLoading(false)
        }
    }

    return <> 
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Inventory</h2>
                    <h5>Ingredients and Materials</h5>

                    <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                        What are {filters.type}? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                    </h5>

                    {
                        whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                            <h6 className="whatIsContent tinyPadding">{filters.type == "ingredients" ? "Ingredients are edible items that are used directly in the production of your recipes e.g flour, sugar, salt." : "Materials are items that are not directly used in recipe production but are required in the preparation/assembly of the final product e.g packaging box."}</h6>
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                        </div>
                    }
                </div>
                
                <div className="pageHolderContentTopRight">
                    {
                        isSearchOpen ? <SearchInput searchClicked={search} onSearchChanged={onSearchChanged} closeSearchClicked={hideSearch} /> :
                        <div style={{display: "flex"}}>
                            <select onChange={onFieldChanged} name="type" className="pageContentTopSelectField">
                                <option value="materials">Materials</option>
                                <option value="ingredients">Ingredients</option>
                            </select>
                            <select onChange={onFieldChanged} name="status" className="pageContentTopSelectField">
                                <option>All</option>
                                <option>Low</option>
                                <option>Normal</option>
                            </select>
                            <button onClick={showSearch} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faSearch} /></button>
                            <button onClick={openShowAdd} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faAdd} /></button>
                            <button onClick={performExport} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faFileExport} /></button>
                        </div>
                    }
                </div>
            </div>

            <div className="pageHolderContentTopMobile">
                <div className="pageHolderContentTopTop">
                    <div>
                        <h2 className="pageTitle">Inventory</h2>
                        <h5>Ingredients and Materials</h5>
                    </div>

                    <div style={{display: "flex", flexWrap: "wrap", marginTop: "16px"}}>
                        {
                            isSearchOpen ? <SearchInput searchClicked={search} onSearchChanged={onSearchChanged} closeSearchClicked={hideSearch} /> :
                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                <select style={mobileTopSpacer} onChange={onFieldChanged} name="type" className="pageContentTopSelectField">
                                    <option value="materials">Materials</option>
                                    <option value="ingredients">Ingredients</option>
                                </select>
                                <select style={mobileTopSpacer} onChange={onFieldChanged} name="status" className="pageContentTopSelectField">
                                    <option>All</option>
                                    <option>Low</option>
                                    <option>Normal</option>
                                </select>
                                
                                <div style={{display: "flex"}}>
                                    <button style={mobileTopSpacer} onClick={showSearch} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faSearch} /></button>
                                    <button style={mobileTopSpacer} onClick={openShowAdd} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faAdd} /></button>
                                    <button style={mobileTopSpacer} onClick={performExport} className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faFileExport} /></button>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="pageHolderContentMiddle">
                    <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                        What are {filters.type}? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                    </h5>

                    {
                        whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                            <h6 className="whatIsContent tinyPadding">{filters.type == "ingredients" ? "Ingredients are edible items that are used directly in the production of your recipes e.g flour, sugar, salt." : "Materials are items that are not directly used in recipe production but are required in the preparation/assembly of the final product e.g packaging box."}</h6>
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                        </div>
                    }
                </div>
                
                <div className="pageHolderContentTopBottom">
                    
                </div>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTableHolder">
                <table className="tabbedListTable" style={{width: "100%"}}>
                    {
                        !value.state.isLoading ? 
                            <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Name</th>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Purchase Quantity</th>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Purchase Size</th>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Price</th>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Quantity (In Stock)</th>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Price (In Stock)</th>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Status</th>
                                    <th style={{width: "10%", paddingLeft: "20px", fontSize: "14px"}}>Low Level</th>
                                    <th style={{width: "20%", paddingLeft: "20px", fontSize: "14px"}}></th>
                                </tr>
                                {
                                    inventory && inventory.docs && inventory.docs.map(invent => {
                                        return <tr className="notHeader">
                                            <td style={{paddingLeft: "30px"}}>{toUpperCase(invent.name)}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.purchase_quantity && invent.purchase_quantity.amount}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.purchase_size}</td>
                                            <td style={{paddingLeft: "30px"}}>{getAmount(invent.price)}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.quantity_in_stock}</td>
                                            <td style={{paddingLeft: "30px"}}>{getAmount(invent.price * invent.quantity_in_stock)}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.lowLevel ? (invent.quantity_in_stock >= invent.lowLevel ? "NORMAL" : "LOW") : "NORMAL"}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.lowLevel || "Not Set"}</td>
                                            <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                                                <button onClick={e => showEditInventory(e, invent)} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                <button onClick={e => showDeleteInventoryItem(e, invent)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        : <Skeleton count={8} height={40} />
                    }
                </table>

                {
                    (!value.state.isLoading && !value.state.isBlockingLoading && (!inventory || !inventory.docs || inventory.docs.length == 0)) && <EmptyResult message="No items found. Try adjusting search parameters." onEmptyButtonClicked={search} emptyButtonText="Try Again" />
                }

            </div>
        </div>

        { 
            showAdd && <AddIngredient closeAddIngredient={closeShowAdd} addInventory={addInventory} /> 
        }

        {
            showEdit && <EditIngredient closeEditIngredient={hideEditInventory} saveEditedInventory={editInventory} inventoryToEdit={inventoryInFocus} inventoryType={filters.type} />
        }

        {
            isDelete.visible && <DeleteDialog onPerformDeleteClicked={deleteInventoryItem} onCancelDeleteClicked={hideDeleteInventoryItem} type={isDelete.type} message={isDelete.message} title={isDelete.title} />
        }
    </>
}

export default IngredientsIndex;

const mobileMiddleSpacer = {
    marginBottom: "16px",
    marginTop: "0px"
}


const mobileTopSpacer = {
    marginBottom: "0px",
    marginTop: "12px"
}