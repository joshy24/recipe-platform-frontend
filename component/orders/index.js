
import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faSearch, faCaretDown, faCaretUp, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddOrder from '../general/addorder'
import { useRouter } from "next/router"

import Pagination from "../general/pagination"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import EmptyResult from "../general/emptyResult"

import { AppContext } from "../../pages/AppContext";

import { getDate, defaultPaginationObject } from "../../utils/helper"

import { getRequest, postRequest } from "../../utils/api.requests"

import { ALL_ORDERS_URL, CREATE_ORDER_URL, SEARCH_ORDERS_URL} from "../../utils/api.endpoints"
   
const OrdersIndex = () => {

    const appContext = AppContext()

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)


    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [changeList, setChangeList] = useState([])

    useEffect(() => {
        loadOrders()
    }, [pagination.page])

    

    const [orders, setOrders] = useState([])

    const router = useRouter()

    const navigateToOrder = (e, id) => {
        e.preventDefault()
        router.push("/order/"+id)
    }

    const navigateToShoppingList = (e, id) => {
        e.preventDefault()
        router.push("/shoppinglist/"+id)
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

        setSearchResult([])
    }

    const searchOrders = async () => {
        appContext.setLoading(true)

        if(searchTerm && searchTerm.length > 0){
            try{
                setIsLoading(true)
                const result = await getRequest(SEARCH_ORDERS_URL+"?searchTerm="+searchTerm+"&page="+pagination.page+"&limit="+(pagination.page+1))
                setIsLoading(false)

                setSearchResult(result.response)
            }
            catch(err){
                console.log(err)
                setIsLoading(false)
            }
        }
    }

    const addOrder = async (e, order) => {
        appContext.setBlockingLoading(true)

        try{
            await postRequest(CREATE_ORDER_URL, order)

            appContext.setBlockingLoading(false)
            
            closeAddOrder()

            loadOrders()
        }
        catch(err){
            appContext.setBlockingLoading(false)

            appContext.setMessage({visible: true, message: "An error occurred saving those details", title: "Saving Error", type: "ERROR"})
        }
    }

    const loadOrders = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(ALL_ORDERS_URL+"?limit="+pagination.limit+"&page="+(pagination.page+1))
            
            setOrders(result.response)

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

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

    const selectedOrder = (event, id) => {
        const checked = event.target.checked;

        if(checked) {
            setChangeList(current => [...current, id])
        } else {
            setChangeList(current =>
                current.filter(element => {
                    return element !== id;
                }),
            );
        }
    }

    const handlePageClick = async (event) => {
        setPagination({...pagination, page: event.selected})
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
                            <h6 className="whatIsContent tinyPadding">A summation of the product(s) ordered per client as well as other order information.</h6>
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                        </div>
                    }
                </div>

                <div className="pageHolderContentTopCenter">
                    <div>
                        <h4>Total</h4>
                        <h5>{(orders && orders.totalDocs) ? orders.totalDocs : 0}</h5>
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

            <div className="pageHolderContentTopMobile">
                <div className="pageHolderContentTopTop">
                    <h2 className="pageTitle">Orders</h2>

                    <div style={{display: "flex"}}>
                        {
                            isSearchOpen ? <SearchInput searchClicked={searchOrders} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchOrders} /> :
                            <div style={{display: "flex"}}>
                                <button onClick={showSearchOrders} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                                <button onClick={showAddOrder} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                            </div>
                        }
                    </div>
                </div>

                <div className="pageHolderContentMiddle">
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
                
                <div className="pageHolderContentTopBottom">
                    <h4>Total</h4>
                    <h5>{(orders && orders.docs) ? orders.docs.length : 0}</h5>
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="largeTopMargin">
                    {
                        orders && orders.docs && <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick} currentPage={pagination.age} />
                    }
                </div>
                
                <div className="tabbedListTableHolder">

                    {
                        !appContext.state.isLoading ?
                        <table className="tabbedListTable" style={{width: "100%"}}>
                           
                            <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "28%"}}>Name</th>
                                    <th style={{width: "18%"}}>Created</th>
                                    <th style={{width: "18%"}}>Status</th>
                                </tr>
                                {
                                    orders && orders.docs && orders.docs.length && orders.docs.map(order => {
                                        return <tr key={order._id} onClick={e => navigateToOrder(e, order._id)} className="notHeader">
                                                <td >{order.name}</td>
                                                <td >{getDate(order.created)}</td>
                                                <td >{order.status}</td>
                                            </tr>
                                    })
                                } 
                            </tbody> 
                        </table> :  
                        <div className="skeletonHolder">
                            <Skeleton count={8} height={50} />
                        </div>
                    }   
                    
                    {
                        orders && orders.docs && orders.docs.length == 0 && !appContext.state.isLoading && <EmptyResult  message={"No Orders found "} onEmptyButtonClicked={searchOrders} emptyButtonText={"Try Again"} />
                    }

                </div>

                {
                    orders && orders.docs && <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick}  currentPage={pagination.page}/>
                }
                
            </div>
        </div>

        {
            showAdd && <AddOrder addOrder={addOrder} closeAdd={closeAddOrder} />
        }

        </>
    )
}

export default OrdersIndex;


           
            
           
