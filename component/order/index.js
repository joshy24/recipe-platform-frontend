
import { useState, useContext, useEffect } from "react";
import styles from "../../styles/Orders.module.css"

import { useRouter } from "next/router"

import Image from "next/image"

import EditOrder from "./editorder"

import EditOrderProduct from "./editorderproduct"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Pagination from "../general/pagination"

import { AppContext } from "../../pages/AppContext";

import { faPen, faAdd, faTrash, faCaretDown, faCaretUp, faShoppingBag } from '@fortawesome/free-solid-svg-icons'

import { GET_ORDER_URL, ORDER_PRODUCTS_URL, EDIT_ORDER_URL, DELETE_ORDER_URL, FULFILL_ORDER_URL, DELETE_ORDER_PRODUCT_URL, EDIT_ORDER_PRODUCT_URL } from "../../utils/api.endpoints"

import AddProducts from "./addproducts"

import { getRequest, putRequest, deleteRequest } from "../../utils/api.requests"
import DeleteDialog from "../general/deletedialog"
import MessageDialog from "../general/messagedialog"

import { getAmount, toUpperCase, getDate, defaultPaginationObject } from "../../utils/helper"

const DetailsTab = "Details"
const ProductsTab = "Products"

const OrderIndex = ({id}) => {

    const router = useRouter();

    const [selected, setSelected] = useState(1)

    const appContext = AppContext()

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)

    const [showDeleteOrder, setShowDeleteOrder] = useState(false)
    const [showDeleteOrderProduct, setShowDeleteOrderProduct] = useState(false)
    const [showEditOrderProduct, setShowEditOrderProduct] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [order, setOrder] = useState({})

    const [showEditOrder, setShowEditOrder] = useState(false)
    const [products, setProducts] = useState([])
    const [showFulfillOrderMessage, setShowFulfillOrderMessage] = useState(false)
    const [isStatus, setIsStatus] = useState(false)

    const [pagination, setPagination] = useState(defaultPaginationObject)
    
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

    useEffect(() => {
        loadOrderProducts()
    }, [pagination.page])

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

    const showPendingStatus = () => {
        setIsStatus(true)
    }

    const showFulfilledStatus = () => {
        setIsStatus(false)
    }

    /*
    New functions
    */

    const loadOrder = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(GET_ORDER_URL+"?id="+id)

            appContext.setLoading(false)

            setOrder(result.response)
        }
        catch(err){
            appContext.setLoading(false)
        }
    }

    const loadOrderProducts = async() => {
        appContext.setLoading(true)
        try{
            const result = await getRequest(ORDER_PRODUCTS_URL+"?id="+id+`&page=${pagination.page}&limit=${pagination.limit}`)

            setProducts(result.response)

            appContext.setLoading(false)
        }
        catch(err){
            appContext.setLoading(false)
        }
    }

    const goToShoppingList = () => {
        router.push("/shoppinglist/"+order._id)
    }

    const openEditOrder = () => {
        setShowEditOrder(true)
    }

    const hideEditOrder = () => {
        setShowEditOrder(false)
    }

    const editOrder = async (e, editedOrder) => {
        appContext.setBlockingLoading(true)
        try{
            const newEditedOrder = {...order, ...editedOrder, id:order._id }
            console.log(newEditedOrder)
            const result = await putRequest(EDIT_ORDER_URL,newEditedOrder)

            console.log(result)

            hideEditOrder()

            loadOrder()

            appContext.setBlockingLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setMessage({visible: true, message: "Could not edit order successfully", title: "Message", type: "ERROR"})

            appContext.setBlockingLoading(false)
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

    const openDeleteOrderProduct = (e, productToDelete) => {
        e.preventDefault()
        setEntityInFocus(productToDelete)
        setShowDeleteOrderProduct(true)
    }

    const hideDeleteOrderProduct = () => {
        setEntityInFocus({})
        setShowDeleteOrderProduct(false)
    }

    const openEditOrderProduct = (e, productToEdit) => {
        e.preventDefault()
        setEntityInFocus(productToEdit)
        setShowEditOrderProduct(true)
    }

    const hideEditOrderProduct = () => {
        setEntityInFocus({})
        setShowEditOrderProduct(false)
    }

    const deleteOrder = async () => {
        
        appContext.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_ORDER_URL, {id:id})

            appContext.setBlockingLoading(false)

            router.push("/orders")

        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)
        }
        
    }

    const openFulfillOrderMessage = () => {
        setShowFulfillOrderMessage(true)
    }

    const closeFulfillOrderMessage = () => {
        setShowFulfillOrderMessage(false)
    }

    const fulfillOrder = async () => {
        closeFulfillOrderMessage()
        appContext.setBlockingLoading(true)
        
        try{
            const result = await putRequest(FULFILL_ORDER_URL, {id: order._id})

            appContext.setBlockingLoading(false)

            loadOrder()
        }
        catch(err){
            appContext.setBlockingLoading(false)
            console.log(err)
        }
    }
    
    const deleteOrderProduct = async () => {
        
        appContext.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_ORDER_PRODUCT_URL, {product_id:entityInFocus._id, id:id})

            appContext.setBlockingLoading(false)

            hideDeleteOrderProduct();

            loadOrderProducts()
        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)

            hideDeleteOrderProduct()

            appContext.setMessage({visible: true, message: "Could not delete product from order", title: "Error Deleting", type: "ERROR"})
        }
    }

    const editOrderProduct = async (newEditedProduct) => {
        
        appContext.setBlockingLoading(true)
        
        try{
            await putRequest(EDIT_ORDER_PRODUCT_URL, {id:id, product_id: newEditedProduct._id, quantity: newEditedProduct.quantity})

            appContext.setBlockingLoading(false)

            
            hideEditOrderProduct()

            loadOrderProducts()
        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)

            hideEditOrderProduct()

            appContext.setMessage({visible: true, message: "Could not edit order product successfully", title: "Message", type: "ERROR"})
        }
        
    }

    const goToProduct = (e, product_id) => {
        e.preventDefault()
        router.push("/product/"+product_id);
    }

    const getTotalCost = () => {
        if(products && products.length > 0){
            const costSum = products.reduce((acc, aProduct) => {
                return acc + aProduct.totalCost
            }, 0)

            return costSum;
        }

        return 0;

    }

    const handlePageClick = async (event) => {
        setPagination({...pagination, page: event.selected})
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
                        <h6 className="whatIsContent tinyPadding">A summation of the product(s) ordered per client as well as other order information.</h6>
                        <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                    </div>
                }
            </div>

            <div className="pageHolderContentTopCenter">
                <div>
                    <h4>Products</h4>
                    <h5>{ products ? products.length : 0}</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button onClick={openEditOrder} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={openAddProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                <button onClick={openDeleteOrder} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={goToShoppingList} className="squareButtonPrimary"><FontAwesomeIcon icon={faShoppingBag} /></button>
            </div>
        </div>

        <div className="pageHolderContentTopMobile">
            <div className="pageHolderContentTopTop">
                <h2 className="pageTitle">Order - <span className="pageTitleContentHeader">{order && order.name && toUpperCase(order.name)}</span></h2>

                <div style={{display: "flex"}}>
                    <button onClick={openEditOrder} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                    <button onClick={openAddProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                    <button onClick={openDeleteOrder} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                    <button onClick={goToShoppingList} className="squareButtonPrimary"><FontAwesomeIcon icon={faShoppingBag} /></button>
                </div>
            </div>

            <div className="pageHolderContentMiddle">
                <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                    What are Orders? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                </h5>
                {
                    whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                        <h6 className="whatIsContent tinyPadding">orders are popular Levantine dish consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit.</h6>
                        <div className="whatIsContentCloseBtn">
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} src="/images/closeorange.png" width={44} height={44} minWidth={40} />
                        </div>
                    </div>
                }
            </div>
            
            <div className="pageHolderContentTopBottom">
                <div className="pageHolderContentTopBottomItem">
                    <h4>Products</h4>
                    <span>-</span>
                    <h5>{ products ? products.length : 0 }</h5>
                </div>
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

            {
                selectedTab == DetailsTab ? <div className="tabbedListTableHolder largeTopMargin"> 
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tbody>
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
                                    {order && order.status}
                                    {
                                        order && order.status == "PENDING" && <button onClick={openFulfillOrderMessage} style={{marginLeft: "16px"}} className="rectangleButtonPrimary">Fulfill</button>
                                    }
                                </td>
                            </tr>
                        
                            <tr className="notHeader">
                                <td>Fulfillment date</td>
                                <td>{order && order.fulfillment_date && getDate(order.fulfillment_date)}</td>
                            </tr>
                            <tr className="notHeader">
                                <td>Total selling price</td>
                                <td>{getAmount(getTotalCost())}</td>
                            </tr>
                            <tr className="notHeader">
                                <td>Note</td>
                                <td>{order && order.note}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> : <div className="tabbedListTableHolder">  
                            
                            <div className="largeTopMargin">
                                {
                                    <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick} currentPage={pagination.page} />
                                }
                            </div>

                            <table className={styles.tabbedListTable} style={{width: "100%"}}>
                                    <tbody>
                                        <tr style={{marginBottom: "24px"}}>
                                            <th style={{width: "25%"}}>Name</th>
                                            <th style={{width: "25%"}}>Quantity</th>
                                            <th style={{width: "25%"}}>Total Cost</th>
                                            <th style={{width: "25%"}}></th>
                                        </tr>
                                        {
                                            products && products.length > 0 && products.map(product => {
                                                return <tr className={styles.productItem} key={product._id}>
                                                        <td>{product && toUpperCase(product.name)}</td>
                                                        <td>{product.quantity}</td>
                                                        
                                                        <td>{getAmount(product.totalCost)}</td>
                                                        <td className="tabbedListContentHorizontalTableContent">
                                                            <button onClick={e => openEditOrderProduct(e, product)} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                            <button onClick={e => openDeleteOrderProduct(e, product)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                        </td>
                                                    </tr>
                                            })
                                        }
                                    </tbody>
                                </table>

                                {
                                    <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick} currentPage={pagination.page} />
                                }
                            </div>
            }
            </div>

        {
            showEditOrder && <EditOrder hideEditOrder={hideEditOrder} editOrder={editOrder} aOrder={order} />
        }

        {
            showAddProduct && <AddProducts loadOrderProducts={loadOrderProducts} order={order} hideAddProduct={hideAddProduct} />
        }

        {
            showFulfillOrderMessage && <MessageDialog onPerformClicked={fulfillOrder} onCancelClicked={closeFulfillOrderMessage}  title="Confirm Fulfillment" message="Are you sure you want to fulfill this order? Fulfilling this order will deduct the quantity of items in this order from inventory." />
        }

        {
            showDeleteOrder && <DeleteDialog onPerformDeleteClicked={deleteOrder} onCancelDeleteClicked={hideDeleteOrder} type={"Order"} />
        }
        
        {
            showDeleteOrderProduct && <DeleteDialog onPerformDeleteClicked={deleteOrderProduct} onCancelDeleteClicked={hideDeleteOrderProduct} type={`${entityInFocus.name} from ${order.name}`} />
        }

        {
            showEditOrderProduct && <EditOrderProduct product={entityInFocus} onPerformEditClicked={editOrderProduct} onCancelEditClicked={hideEditOrderProduct} />
        }

    </div>
}


export default OrderIndex;