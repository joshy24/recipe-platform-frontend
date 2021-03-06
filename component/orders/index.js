
import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddOrder from '../general/addorder'
import { useRouter } from "next/router"

import SearchInput from "../general/searchInput"

import EmptyResult from "../general/emptyResult"

import AppContext from "../../pages/AppContext";

import { getRequest, postRequest } from "../../utils/api.requests"

import { BASE_URL, CREATE_ORDER, SEARCH_ORDERS} from "../../utils/api.endpoints"

const create_order_url = BASE_URL + CREATE_ORDER

const OrdersIndex = () => {

    const value = useContext(AppContext);

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)

    const [orders, setOrders] = useState([])

    const router = useRouter()
    const navigateToOrder = () => {

        router.push("/order")
    }

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const showAddOrder = () => {
        setShowAdd(true)
    }

    const closeAddOrder = () => {
        setShowAdd(false)
    }



    /*
    New functions
    */


    const showSearchOrders = () => {
        setIsSearchOpen(true)
    }

    const closeSearchOrders = () => {
        setIsSearchOpen(false)
    }

    const searchOrders = async () => {
        value.setLoading(true)

        if(searchTerm && searchTerm.length > 0){
            try{
                const result = await getRequest(SEARCH_ORDERS+"?searchTerm="+searchTerm)

                console.log(result)
                value.setIsLoading(false)
            }
            catch(err){
                value.setIsLoading(false)
                console.log(result)
            }
        }
    }

    const addOrder = async (e, order) => {
        value.setLoading(true)

        e.preventDefault();
        try{
            var result = await postRequest(create_order_url, order)

            value.setLoading(false)
            
            setVisits(result)
            
        }
        catch(err){
            value.setLoading(false)

            setMessage("An error occurred performing the search.")
            setErrorMessageVisible(true)
        }
    }

    const loadOrders = async() => {
        value.setIsLoading(true)

        try{
            const result = await getRequest(get_products_url+"?limit="+pagination.limit+"&offset="+pagination.offset)

            setProducts(result.response)

            value.setIsLoading(false)
        }
        catch(err){
            value.setIsLoading(false)
        }
    }

    const showOrders = () => {

    }

    const showDeleteOrder = () => {

    }

    const closeDeleteOrder = () => {

    }

    const deleteOrder = async () => {

    }

    const showOrderLoading = () => {

    }

    const showSkeletonLoading = () => {
        
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }


    return ( <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Orders</h2>

                    <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                        What are Orders? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                    </h5>

                    {
                        whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                            <h6 className="whatIsContent tinyPadding">orders are popular Levantine dish consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit.</h6>
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                        </div>
                    }
                </div>

                <div className="pageHolderContentTopCenter">
                    <div>
                        <h4>Total</h4>
                        <h5>3</h5>
                    </div>
                </div>

                <div className="pageHolderContentTopRight">
                    {
                        isSearchOpen ? <SearchInput searchClicked={searchOrders} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchOrders} /> : <div style={{display: "flex"}}>
                        <button onClick={showSearchOrders} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                        <button onClick={showAddOrder} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                    </div>
                    }
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="tabbedListTableHolder">
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="header" style={{marginBottom: "24px"}}>
                            <th style={{width: "28%"}}>Name</th>
                            <th style={{width: "18%"}}>Created</th>
                            <th style={{width: "18%"}}>Status</th>
                            <th style={{width: "18%"}}>Total cost</th>
                            <th style={{width: "18%"}}></th>
                        </tr>
                        {
                            orders && orders.docs && orders.docs.length && order.docs.map(order => {
                                return <tr className="notHeader">
                                <td >{order.name}</td>
                                <td >{order.created}</td>
                                <td >{order.status}</td>
                                <td >{order.totalCost}</td>
                                <td className="tabbedListContentHorizontalTableContent">
                                    <button onClick={navigateToOrder} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                    <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                            })
                        }

                        

                    </table>

                    {
                        orders && orders.docs && orders.docs.length == 0 && !isLoading && <EmptyResult  message={"No Orders found "} onEmptyButtonClicked={searchOrder} emptyButtonText={"Try Again"} />
                    }
                </div>
            </div>
        </div>


        {
            showAdd && <AddOrder addOrder={addOrder} closeAddOrder={closeAddOrder} />
        }
        </>
    )
}

export default OrdersIndex;


           
            
           
