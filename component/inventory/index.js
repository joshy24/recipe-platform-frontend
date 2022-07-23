
import styles from "../../styles/Ingredients.module.css"

import AddIngredient from "../general/addingredient"

import DeleteDialog from "../general/deletedialog"

import { useEffect, useState } from "react"

import Image from "next/image"

import SearchInput from "../general/searchInput"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash, faSearch, faFileExport, faEdit, faAdd, faPen } from '@fortawesome/free-solid-svg-icons'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, CREATE_INGREDIENT, CREATE_MATERIAL, GET_ALL_INVENTORY, SEARCH_INVENTORY_URL} from "../../utils/api.endpoints"

const create_ingredient_url = BASE_URL + CREATE_INGREDIENT
const create_material_url = BASE_URL + CREATE_MATERIAL
const get_inventory_url = BASE_URL + GET_ALL_INVENTORY

const IngredientsIndex = () => {

    const [showAdd, setShowAdd] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const [filters, setFilters] = useState({type: "materials", status: "All", searchTerm: ""})

    const [inventory, setInventory] = useState([])

    const [pagination] = useState({limit: 30, offset: 0})

    const [isLoading, setIsLoading] = useState(true)

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [searchResult, setSearchResult] = useState([])


    useEffect(() => {
        search();
    }, [])

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

    const showSkeletonLoaders = () => {

    }

    const hideSkeletonLoaders = () => {

    }

    const showSearch = () => {
        setIsSearchOpen(true)
    }

    const hideSearch = () => {
        setIsSearchOpen(false)
    }

    const search = async (type) => {
        try{
            let url = get_inventory_url + "?limit="+pagination.limit+"&offset="+pagination.offset+"&type="+ (type ? type : filters.type)+"&searchTerm="+searchTerm
            
            var result = await getRequest(url)

            console.log(result)
        
            setInventory(result.response.docs)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
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

    const showEditInventory = () => {

    }

    const hideEditInventory = () => {

    }

    const performExport = async () => {

    }

    const showDeleteInventoryItem = () => {

    }

    const hideDeleteInventoryItem = () => {

    }

    const deleteInventoryItem = async () => {

    }

    const addInventory = async (e, inventoryToAdd) => {
        e.preventDefault();
        console.log(inventoryToAdd)
        try{
            var result = inventoryToAdd.type == "Ingredient" ? 
             await postRequest(create_ingredient_url, {ingredient: inventoryToAdd})
             : await postRequest(create_material_url, {material: inventoryToAdd});

            console.log(result)

            closeShowAdd()

            search();
            
        }
        catch(err){

            setMessage("An error occurred performing the search.")
            setErrorMessageVisible(true)
        }
    }

    function onFieldChanged(event){
        event.preventDefault()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFilters({...filters, [name]:value})

        search(value)
    }

    return <> 
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Inventory</h2>
                    <h5>Ingredients and Materials</h5>
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


                            
                            <button className="squareButtonPrimary colorWhite"><FontAwesomeIcon icon={faFileExport} /></button>
                        </div>
                    }
                    
                </div>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTableHolder">
                <table className="tabbedListTable" style={{width: "100%"}}>
                    {
                        !isLoading ? 
                            <tbody>
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
                                {
                                    inventory.map(invent => {
                                        return <tr className="notHeader">
                                            <td style={{paddingLeft: "30px"}}>{invent.name}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.purchase_quantity && invent.purchase_quantity.amount}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.purchase_size}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.price}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.quantity_in_stock}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.price * invent.quantity_in_stock}</td>
                                            <td style={{paddingLeft: "30px"}}>NORMAL</td>
                                            <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                                                <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        : <Skeleton count={8} height={40} />
                    }
                </table>
            </div>
        </div>

        { showAdd ? <AddIngredient closeAddIngredient={closeShowAdd} addInventory={addInventory} /> : "" }
    </>
}

export default IngredientsIndex;