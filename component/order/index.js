
import { useState, useContext, useEffect } from "react";
import styles from "../../styles/Orders.module.css"

import { useRouter } from "next/router"

import Image from "next/image"

import EditOrder from "./editorder"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AppContext from "../../pages/AppContext";

import { faPen, faAdd, faTrash, faCaretDown, faCaretUp, faShoppingBag } from '@fortawesome/free-solid-svg-icons'

import { GET_ORDER_URL, ORDER_PRODUCTS_URL, EDIT_ORDER_URL, DELETE_ORDER_URL } from "../../utils/api.endpoints"
import AddProducts from "./addproducts"

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"
import DeleteDialog from "../general/deletedialog"
import EmptyResult from "../general/emptyResult"

import { getAmount, toUpperCase, getDate } from "../../utils/helper"

const DetailsTab = "Details"
const ProductsTab = "Products"

const OrderIndex = ({id}) => {

    const router = useRouter();

    const [selected, setSelected] = useState(1)

    const value = useContext(AppContext);

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)

    const [showDeleteOrder, setShowDeleteOrder] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [order, setOrder] = useState({})

    const [showEditOrder, setShowEditOrder] = useState(false)
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({offset: 0, limit: 30})

    
    const [recipes, setRecipes] = useState({})
    const [productPaginate, setProductPaginate] = useState({offset: 0, limit: 30})
    const [recipePaginate, setRecipePaginate] = useState({offset: 0, limit: 30})

    const [entityInFocus, setEntityInFocus] = useState({})

    const [isDelete, setIsDelete] = useState({visible: false, title:"", message:"", type:""})
    

    useEffect(() => {
        loadAllAsync()
    }, [])

    const loadAllAsync = async () => {
        await loadOrder()

        await loadOrderProducts()

    }

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    /*const showAddRecipesModal = () => {
        setShowAddIngredients(true)
    }

    const hideAddIngredientsModal = () => {
        setShowAddIngredients(false)
    }*/


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
1
    const goToShoppingList = () => {
        router.push("/shoppinglist/"+order._id)
    }

    const openEditOrder = () => {
        setShowEditOrder(true)
    }

    const hideEditOrder = () => {
        setShowEditOrder(false)
    }

    const editOrder = async (editedOrder) => {
        value.setBlockingLoading(true)
        try{
            const result = await putRequest(EDIT_ORDER_URL, {...order, ...editedOrder})

            console.log(result)

            hideEditOrder()

            loadOrder()

            value.setBlockingLoading(false)
        }
        catch(err){
            console.log(err)
            value.setMessage({visible: true, message: "Could not edit order successfully", title: "Message", type: "ERROR"})

            value.setBlockingLoading(false)
        }
    } 

    const openAddProduct = () => {
        setShowAddProduct(true)
    }

    const hideAddProduct = () => {
        setShowAddProduct(false)
    }

    const openDeleteOrder = () => {
        setShowDeleteOrder(true)
    }

    const hideDeleteOrder = () => {
        setShowDeleteOrder(false)
    }

    const deleteOrder = async () => {
        
        value.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_ORDER_URL, {id:id/*, product_id: entityInFocus._id*/})

            value.setBlockingLoading(false)

            router.push("/orders")

            //setEntityInFocus({})

            //loadOrderProducts()
        }
        catch(err){
            console.log(err)

            value.setBlockingLoading(false)
        }
        
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
                <button onClick={openAddProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                <button onClick={openDeleteOrder} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={goToShoppingList} className="squareButtonPrimary"><FontAwesomeIcon icon={faShoppingBag} /></button>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTabsHolder">
                <div onClick={e => switchSelectedTab(e, DetailsTab)} className={`${selectedTab == DetailsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Details</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, ProductsTab)} className={`${selectedTab == ProductsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Products</h5>
                </div>
            </div>

            <div className="tabbedListTableHolder"> 
                {
                    selectedTab == DetailsTab ? 
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="notHeader" style={{marginBottom: "24px"}}>
                            <th style={{width: "20%"}}>Name</th>
                            <th style={{width: "80%"}}>{order && order.name && toUpperCase(order.name)}</th>
                        </tr>
                        <tr className="notHeader">
                            <td>Date</td>
                            <td>{order && order.created && getDate(order.created)}</td>
                        </tr>
                        
                        <tr className="notHeader">
                            <td>Order status</td>
                            <td className="tabbedListContentHorizontalTableContent"> 
                                {order.status}
                                <button style={{marginLeft: "16px"}}
                                className="rectangleButtonPrimary">Fulfill</button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td>Fulfillment date</td>
                            <td>{order && order.fulfillment_date && getDate(order.fulfillment_date)}</td>
                        </tr>
                        <tr className="notHeader">
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
                                                        <button style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
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
            showEditOrder && <EditOrder hideEditOrder={hideEditOrder} editOrder={editOrder} aOrder={order} />
        }

        {
            showAddProduct && <AddProducts loadOrderProducts={loadOrderProducts} order={order} hideAddProduct={hideAddProduct} />
        }

        {
            showDeleteOrder && <DeleteDialog onPerformDeleteClicked={deleteOrder} onCancelDeleteClicked={hideDeleteOrder} type={"Order"} />
        }

    </div>
}

export default OrderIndex;