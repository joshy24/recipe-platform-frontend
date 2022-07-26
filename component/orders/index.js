
import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddOrder from '../general/addorder'
import { useRouter } from "next/router"
import { getDate } from "../../utils/helper"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import EmptyResult from "../general/emptyResult"

import { getRequest, postRequest } from "../../utils/api.requests"

import { BASE_URL, GET_ALL_ORDERS, ADD_ORDER, SEARCH_ORDERS_URL} from "../../utils/api.endpoints"

const get_orders_url = BASE_URL + GET_ALL_ORDERS

const add_order_url = BASE_URL + ADD_ORDER

const OrdersIndex = () => {

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)


    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState({offset:0, limit: 30})

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        loadOrders()
    }, [])

    const [orders, setOrders] = useState([])

    const router = useRouter()
    const navigateToOrder = (e, id) => {
        e.preventDefault()
        router.push("/order"+id)
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

        setSearchResult([])
    }

    const searchOrders = async () => {
        if(searchTerm && searchTerm.length > 0){
            try{
                setIsLoading(true)
                const result = await getRequest(SEARCH_ORDERS_URL+"?searchTerm="+searchTerm+"&offset="+pagination.offset+"&limit="+pagination.limit)
                setIsLoading(false)
                console.log(result)

                setSearchResult(result.response)
            }
            catch(err){
                console.log(err)
                setIsLoading(false)
            }
        }
    }

    const addOrder = async (e, data) => {
        e.preventDefault()
        setIsLoading(true)

        try{
            const result = await postRequest(add_order_url, data)

            router.push("/order"+result.response._id)

            closeAddOrder()

            loadOrders()
            
        }
        catch(err){
            console.log(err)
            setIsLoading(false)

            //setMessage("An error occurred performing the search.")
            //setErrorMessageVisible(true)
        }
    }

    const loadOrders = async() => {
        setIsLoading(true)

        try{
            const result = await getRequest(get_orders_url+"?limit="+pagination.limit+"&offset="+pagination.offset)

            console.log(result)

            setOrders(result.response)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
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
                            <h6 className="whatIsContent tinyPadding">orders are popular Levantine dish consisting of meat cut into thin slices, stcked in a cone-like shape and roasted on a slowly-turning vertical rotisserie or spit.</h6>
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                        </div>
                    }
                </div>

                <div className="pageHolderContentTopCenter">
                    <div>
                        <h4>Total</h4>
                        <h5>{orders ? orders.totalDocs : 0}</h5>
                    </div>
                </div>

                <div className="pageHolderContentTopRight">
                    {
                        isSearchOpen ? <SearchInput searchClicked={searchOrders} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchOrders} /> :
                        <div style={{display: "flex"}}>
                            <button onClick={showSearchOrders} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                            <button onClick={showAddOrder} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                        </div>
                    }
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="tabbedListTableHolder">
                    <table className="tabbedListTable" style={{width: "100%"}}> 
                        <tbody>
                            <tr className="header" style={{marginBottom: "24px"}}>
                                <th style={{width: "28%"}}>Name</th>
                                <th style={{width: "18%"}}>Created</th>
                                <th style={{width: "18%"}}>Status</th>
                                <th style={{width: "18%"}}>Total cost</th>
                                <th style={{width: "18%"}}></th>
                            </tr>
                            
                            {
                                !isLoading ? <>
                                    {
                                        searchResult && searchResult.length > 0 ? searchResult.map(order => {
                                            return <tr className="notHeader">
                                                <td >{order.name}</td>
                                                <td >{getDate(order.created)}</td>
                                                <td>{order.status}</td>
                                                <td >₦0</td>
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button onClick={e => navigateToOrder(e, order._id)} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                                    <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                        }) :
                                        orders && orders.docs && orders.docs.length > 0 && orders.docs.map(order => {
                                            return <tr className="notHeader">
                                                <td >{order.name}</td>
                                                <td >{getDate(order.created)}</td>
                                                <td>{order.status}</td>
                                                <td >₦0</td>
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button onClick={e => navigateToOrder(e, order._id)} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                                    <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                        }) 
                                    }
                                </>
                                : <tr className="notHeader">
                                    <td ><Skeleton height={60} count={6} /></td>
                                    <td ><Skeleton height={60} count={6} /></td>
                                    <td ><Skeleton height={60} count={6} /></td>
                                    <td ><Skeleton height={60} count={6} /></td>
                                    <td className="tabbedListContentHorizontalTableContent">
                                        <Skeleton height={60} count={6} />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>

                    {             
                        (orders && orders.docs && orders.docs.length==0) && !isLoading && <EmptyResult message="No orders found" onEmptyButtonClicked={loadOrders} emptyButtonText="Reload" />    
                    }
                </div>
            </div>
        </div>
        {
            showAdd && <AddOrder addOrder={addOrder} closeAdd={closeAddOrder} />
        }
        </>
    )
}

export default OrdersIndex;


           
            
           
