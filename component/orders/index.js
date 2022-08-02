
import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddOrder from '../general/addorder'
import { useRouter } from "next/router"

import SearchInput from "../general/searchInput"

import EmptyResult from "../general/emptyResult"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import AppContext from "../../pages/AppContext";

import { getAmount, toUpperCase, getDate } from "../../utils/helper"

import { getRequest, postRequest } from "../../utils/api.requests"

import { ALL_ORDERS_URL, CREATE_ORDER_URL, SEARCH_ORDERS_URL} from "../../utils/api.endpoints"

const OrdersIndex = () => {

    const value = useContext(AppContext);

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)

    const [pagination, setPagination] = useState({offset: 0, limit: 30})

    const [orders, setOrders] = useState([])

    const router = useRouter()

    const navigateToOrder = (e, id) => {
        e.preventDefault()
        router.push("/order/"+id)
    }

    useEffect(() => {
        loadOrders();
    },[])

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
        value.setBlockingLoading(true)

        e.preventDefault();
        try{
            await postRequest(CREATE_ORDER_URL, order)

            value.setBlockingLoading(false)
            
            closeAddOrder()

            loadOrders()
        }
        catch(err){
            value.setBlockingLoading(false)

            value.setMessage({visible: true, message: "An error occurred saving those details", title: "Saving Error", type: "ERROR"})
        }
    }

    const loadOrders = async() => {
        value.setLoading(true)

        try{
            const result = await getRequest(ALL_ORDERS_URL+"?limit="+pagination.limit+"&offset="+pagination.offset)

            setOrders(result.response)

            value.setLoading(false)
        }
        catch(err){
            value.setLoading(false)
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
                        <h5>{(orders && orders.docs) ? orders.docs.length : 0}</h5>
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
                            <th style={{width: "34%"}}>Name</th>
                            <th style={{width: "22%"}}>Created</th>
                            <th style={{width: "22%"}}>Status</th>
                            <th style={{width: "22%"}}>Total cost</th>
                        </tr>
                        {
                            orders && orders.docs && orders.docs.length && orders.docs.map(order => {
                                return <tr onClick={e => navigateToOrder(e, order._id)} className="notHeader">
                                        <td >{order.name}</td>
                                        <td >{getDate(order.created)}</td>
                                        <td >{order.status}</td>
                                        <td >{getAmount(order.totalCost)}</td>
                                    </tr>
                            })
                        } 

                        {
                            value.state.loading && <tr className="notHeader">
                            <td ><Skeleton height={60} count={6} /></td>
                            <td ><Skeleton height={60} count={6} /></td>
                            <td ><Skeleton height={60} count={6} /></td>
                            <td ><Skeleton height={60} count={6} /></td>
                        </tr> 
                        }

                    </table>

                    {
                        orders && orders.docs && orders.docs.length == 0 && !value.state.loading && <EmptyResult  message={"No Orders found "} onEmptyButtonClicked={searchOrder} emptyButtonText={"Try Again"} />
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


           
            
           
