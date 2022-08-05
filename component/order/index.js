
import { useState, useContext, useEffect } from "react";
import styles from "../../styles/Orders.module.css"

import Image from "next/image"

import { useRouter } from "next/router"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AppContext from "../../pages/AppContext";

import { faPen, faAdd, faTrash, faRotateLeft, faCaretDown, faCaretUp, faBagShopping, faShoppingBag } from '@fortawesome/free-solid-svg-icons'

import { GET_ORDER_URL, ORDER_PRODUCTS_URL } from "../../utils/api.endpoints"

import { getRequest, postRequest } from "../../utils/api.requests"

import EmptyResult from "../general/emptyResult"

import { getAmount, toUpperCase, getDate } from "../../utils/helper"

const OrderIndex = ({id}) => {

    const router = useRouter();

    const [selected, setSelected] = useState(1)

    const value = useContext(AppContext);

    const DetailsTab = "Details"
    const IngredientsTab = "Ingredients"

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [order, setOrder] = useState({})
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({offset: 0, limit: 30})

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const switchSelected = (e,num) => {
        e.preventDefault();
        setSelected(num)
    }

    const showAddIngredientsModal = () => {
        setShowAddIngredients(true)
    }

    const hideAddIngredientsModal = () => {
        setShowAddIngredients(false)
    }

    const switchSelectedTab = (e, tab) => {
        e.preventDefault()
        setSelectedTab(tab)
    }

    useEffect(() => {
        loadOrder()
        loadOrderProducts()
    }, [])


    /*
    New functions
    */

    const loadOrder = async() => {
        value.setLoading(true)

        try{
            const result = await getRequest(GET_ORDER_URL+"?id="+id)

            value.setLoading(false)

            setOrder(result.response)
        }
        catch(err){
            value.setLoading(false)
        }
    }

    const loadOrderProducts = async() => {
        value.setLoading(true)
        try{
            const result = await getRequest(ORDER_PRODUCTS_URL+"?id="+id+`&offset=${pagination.offset}&limit=${pagination.limit}`)

            setProducts(result.response)

            console.log(result)

            value.setLoading(false)
        }
        catch(err){
            value.setLoading(false)
        }
    }

    const goToShoppingList = () => {
        router.push("/shoppinglist/"+order._id)
    }

    const showEditOrder = () => {

    }

    const hideEditOrder = () => {

    }

    const editOrder = async () => {

    }

    const showAddProduct = () => {

    }

    const hideAddProduct = () => {

    }

    const addProduct = async () => {

    }

    const showDeleteOrder = () => {

    }

    const hideDeleteOrder = () => {

    }

    const deleteOrder = async () => {

    }

    const showEditOrderProduct = () => {

    }

    const hideEditOrderProduct = () => {

    }

    const editOrderProduct = async () => {

    }

    const showConfirmFulfilled = () => {

    }

    const hideConfirmFulfilled = () => {

    }

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div className="pageHolderContentTopLeft">
                <h2 className="pageTitle">Order - <span className="pageTitleContentHeader">{order && order.name && toUpperCase(order.name)}</span></h2>

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
                    <h4>Products</h4>
                    <h5>{ (products && products.docs) ? products.docs.length : 0}</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                <button className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={goToShoppingList} className="squareButtonPrimary"><FontAwesomeIcon icon={faShoppingBag} /></button>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTabsHolder">
                <div onClick={e => switchSelectedTab(e, DetailsTab)} className={`${selectedTab == DetailsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Details</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, IngredientsTab)} className={`${selectedTab == IngredientsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Products</h5>
                </div>
            </div>

            <div className="tabbedListTableHolder"> 
                {
                    selectedTab == DetailsTab ? 
                    <table className={styles.tabbedListTable} style={{width: "100%"}}>
                        <tr style={{marginBottom: "24px"}}>
                            <th style={{width: "20%"}}>Name</th>
                            <th style={{width: "80%"}}>{order && order.name && toUpperCase(order.name)}</th>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{order && order.created && getDate(order.created)}</td>
                        </tr>
                        <tr>
                            <td>Order status</td>
                            <td className="tabbedListContentHorizontalTableContent"> 
                                {order.status}
                                <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="rectangleButtonPrimary">Fulfill</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Fulfillment date</td>
                            <td>{order && order.fulfillment_date && getDate(order.fulfillment_date)}</td>
                        </tr>
                        <tr>
                            <td>Total selling price</td>
                            <td>{getAmount(order.totalCost)}</td>
                        </tr>
                    </table> : <table className={styles.tabbedListTable} style={{width: "100%"}}>
                                    <tr style={{marginBottom: "24px"}}>
                                        <th style={{width: "25%"}}>Name</th>
                                        <th style={{width: "25%"}}>Quantity</th>
                                        <th style={{width: "25%"}}>Total Cost</th>
                                        <th style={{width: "25%"}}></th>
                                    </tr>
                                    {
                                        products && products.length > 0 && products.map(product => {
                                            return <tr>
                                                    <td>{toUpperCase(product.name)}</td>
                                                    <td>{product.quantity}</td>
                                                    
                                                    <td>#800</td>
                                                    <td className="tabbedListContentHorizontalTableContent">
                                                        <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                        <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                    </td>
                                                </tr>
                                        })
                                    }
                                </table>
                }
            </div>

        </div>

        {
            showAddIngredients && <AddIngredients hideAddIngredientsModal={hideAddIngredientsModal} />
        }

    </div>
}

export default OrderIndex;