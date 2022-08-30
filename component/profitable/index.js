import { useEffect, useState, useContext } from "react"

import EmptyResult from "../general/emptyResult"

import SearchInput from "../general/searchInput"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AppContext } from "../../pages/AppContext";

import { useRouter } from "next/router"

import { faTrash, faCaretDown, faCaretUp, faEye, faPen } from '@fortawesome/free-solid-svg-icons'

import { toUpperCase, getAmount, downloadFile } from "../../utils/helper"

import Image from "next/image"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import { BASE_URL, GET_ALL_INVENTORY, APPLY_PROFITABLE_CHANGES_URL } from "../../utils/api.endpoints"

const get_inventory_url = BASE_URL + GET_ALL_INVENTORY

const Profitable = () => {

    const router = useRouter()

    const [pagination] = useState({limit: 30, offset: 0})

    const appContext = AppContext()

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [inventoryInFocus, setInventoryInFocus] = useState({})
    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const [filters, setFilters] = useState({type: "materials", status: "All", searchTerm: ""})

    const [inventory, setInventory] = useState([])

    const [changeList, setChangeList] = useState({})

    const [generalAmount, setGeneralAmount] = useState(0)

    const setGeneralChangeAmount = (event) => {
        const aValue = event.target.value

        setGeneralAmount(aValue)
    }

    const navigateToProfitableApply = (e, item) => {
        e.preventDefault()

        const idObj = {}

        idObj[item._id] = changeList[item._id]

        const details = {
            type: filters.type,
            inventoryItem: item,
            changeObject: idObj
        }

        const detailsString = JSON.stringify(details)

        router.push("/profitable/apply/"+detailsString)
    }


    useEffect(() => {
        search();
    }, [])


    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const showSearch = () => {
        setIsSearchOpen(true)
    }

    const hideSearch = () => {
        setIsSearchOpen(false)
    }

    const search = async () => {
        appContext.setLoading(true)

        try{
            let url = get_inventory_url + "?limit="+pagination.limit+"&offset="+pagination.offset+"&type="+filters.type+"&status="+filters.status
            
            var result = await getRequest(url)

            setInventory(result.response.docs)

            appContext.setLoading(false)
        }
        catch(err){
            appContext.setLoading(false)
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    async function onFieldChanged(event){
        event.preventDefault()
        const target = event.target;
        const aVal = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFilters({...filters, [name]:aVal})

        appContext.setLoading(true)

        try{
            let url = get_inventory_url + "?limit="+pagination.limit+"&offset="+pagination.offset+"&type="+ (name == "type" ? aVal : filters.type)+"&searchTerm="+(name == "searchTerm" ? aVal : filters.searchTerm)+"&status="+(name == "status" ? aVal : filters.status)
            
            var result = await getRequest(url)

            setInventory(result.response.docs)

            appContext.setLoading(false)
        }
        catch(err){
            appContext.setLoading(false)
        }
    }

    const onCheckBoxChanged= (event, id) => {
        const target = event.target;
        const aVal = target.type === 'checkbox' ? target.checked : target.value;

        let newChangeList = changeList;

        if(aVal) 
            newChangeList[id] = generalAmount!=0 ? generalAmount : 0
        else
            newChangeList[id] = ''
            delete newChangeList[id]

        setChangeList(newChangeList)
    }

    const onAmountChanged = (event, item) => {
        const target = event.target;
        const aValue = target.value;

        let newChangeList = changeList;

        if(aValue && aValue != '0'){
            newChangeList[item._id] = parseInt(aValue)
        }
        else{
            delete newChangeList[item._id]
        }

        setChangeList(newChangeList)
    }

    const applyChange = async (e, inventoryItem) => {
        appContext.setBlockingLoading(true)

        try{
            let url = APPLY_PROFITABLE_CHANGES_URL
            
            await postRequest(url, {type: filters.type, id: inventoryItem._id, change: changeList[inventoryItem._id]})

            appContext.setBlockingLoading(false)

            router.push("/profitable")
        }
        catch(err){
            console.log(`An error occurred applying changes to ${changeDetails.inventoryItem._id} with error ${err}`)
            appContext.setBlockingLoading(false)
        }
    }

    const goToChange = () => {

    }

    return <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Profit Table</h2>

                    <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                        What is Profit Table? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                    </h5>

                    {
                        whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                            <h6 className="whatIsContent tinyPadding">orders are popular Levantine dish consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit.</h6>
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
                        </div>
                    }
                    
                </div>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTableHolder">
                <table className="tabbedListTable" style={{width: "100%"}}>
                    {
                        !appContext.state.isLoading ? 
                            <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "12%", paddingLeft: "20px", fontSize: "14px"}}>Name</th>
                                    <th style={{width: "12%", paddingLeft: "20px", fontSize: "14px"}}>Purchase Quantity</th>
                                    <th style={{width: "12%", paddingLeft: "20px", fontSize: "14px"}}>Purchase Size</th>
                                    <th style={{width: "12%", paddingLeft: "20px", fontSize: "14px"}}>Price</th>
                                    <th style={{width: "12%", paddingLeft: "20px", fontSize: "14px"}}>Quantity (In Stock)</th>
                                    <th style={{width: "12%", paddingLeft: "20px", fontSize: "14px"}}>Price (In Stock)</th>
                                    <th style={{width: "24%", paddingLeft: "20px", fontSize: "14px"}}>New Price</th>
                                </tr>
                                {
                                    inventory.map(invent => {
                                        return <tr className="notHeader">
                                            <td style={{paddingLeft: "30px"}}>{toUpperCase(invent.name)}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.purchase_quantity && invent.purchase_quantity.amount}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.purchase_size}</td>
                                            <td style={{paddingLeft: "30px"}}>{getAmount(invent.price)}</td>
                                            <td style={{paddingLeft: "30px"}}>{invent.quantity_in_stock}</td>
                                            <td style={{paddingLeft: "30px"}}>{getAmount(invent.price * invent.quantity_in_stock)}</td>
                                            <td style={{paddingLeft: "30px"}} className="tabbedListContentHorizontalTableContent">
                                                <input value={changeList[invent._id]} onChange={e => onAmountChanged(e,invent)} style={{minWidth: "80px"}} className="ptInput" type="number" name="changeInputValue" />
                                                <button onClick={e => applyChange(e, invent)} style={{marginLeft: "16px"}} className="rectangleButtonPrimary">Apply</button>
                                                <button onClick={e => navigateToProfitableApply(e, invent)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faEye} /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        : <Skeleton count={8} height={40} />
                    }
                </table>

                {
                    (!appContext.state.isLoading && !appContext.state.isBlockingLoading && (inventory.length == 0 || !inventory)) && <EmptyResult message="No items found. Try adjusting search parameters." onEmptyButtonClicked={search} emptyButtonText="Try Again" />
                }

            </div>
        </div>
    </>
}

export default Profitable;