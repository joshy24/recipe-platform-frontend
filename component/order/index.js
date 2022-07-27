
import { useEffect, useState, useContext } from "react";
import styles from "../../styles/Products.module.css"

import EmptyResult from "../general/emptyResult"

import AppContext from "../../pages/AppContext";

import AddProducts from "./addproducts"

import DeleteDialog from "../general/deletedialog"

import Image from "next/image"

import { toUpperCase, getAmount } from "../../utils/helper"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { postRequest, getRequest, deleteRequest } from "../../utils/api.requests"



import { BASE_URL, GET_ORDER, ALL_PRODUCTS_URL, ALL_RECIPES_URL, DELETE_ORDER_PRODUCT, DELETE_ORDER_RECIPE } from "../../utils/api.endpoints"

const get_order_url = BASE_URL + GET_ORDER

const DetailsTab = "Details"
const ProductsTab = "Products"


const OrderIndex = ({id}) => {
    const value = useContext(AppContext);

    const [showAddRecipe, setShowAddRecipe] = useState(false)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)
    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const [order, setOrder] = useState({})
    const [products, setProducts] = useState({})
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

        await loadOrderRecipes();
    }

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
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


    /*
    New functions
    */

    const loadOrder = async() => {
        value.setLoading(true)
        try{
            const result = await getRequest(get_order_url+"?id="+id)
            
            setOrder(result.response)

            value.setLoading(false)
        }
        catch(err){
            console.log(err)
            value.setLoading(false)
        }
    }

    const loadOrderRecipes = async() => {
        value.setLoading(true)
        try{
            const result = await getRequest(ALL_RECIPES_URL+`?id=${id}&offset=${recipePaginate.offset}&limit=${recipePaginate.limit}`)

            setRecipes(result.response)

            value.setLoading(false)
        }
        catch(err){
            console.log(err)
            value.setLoading(false)
        }
    }

    const loadOrderProducts = async() => {
        value.setLoading(true)
        try{
            const result = await getRequest(ALL_PRODUCTS_URL+`?id=${id}&offset=${productPaginate.offset}&limit=${productPaginate.limit}`)

            setProducts(result.response)

            value.setLoading(false)
        }
        catch(err){
            console.log(err)
            value.setLoading(false)
        }
    }   

    const showSkeletonLoaders = () => {

    }

    const hideSkeletonLoaders = () => {

    }

    const showEditOrder = () => {

    }

    const hideEditOrder = () => {

    }

    const editOrder = async () => {

    }

    const openAddRecipe = () => {
        setShowAddRecipe(true)
    }

    const hideAddRecipe = () => {
        setShowAddRecipe(false)
    }

    const openAddProduct = () => {
        setShowAddProduct(true)
    }

    const hideAddProduct = () => {
        setShowAddProduct(false)
    }

    const showDeleteOrder = () => {

    }

    const hideDeleteOrder = () => {

    }

    const deleteOrder = async () => {
        
    }

    const showDeleteOrderProduct = (e, aProduct) => {
        
        setEntityInFocus(aProduct)
        
        setIsDelete({visible: true, title: "Confirm Action", message:`Confirm that you want to delete ${toUpperCase(aProduct.name)} from ${order.name}`, type: "Order"})
    }

    const hideDeleteOrderProduct = () => {
        setIsDelete({visible: false, title: "", message:``, type: ""})
    }

    const deleteOrderProduct = async () => {

        hideDeleteOrderProduct()
        
        value.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_ORDER_PRODUCT, {id:id, product_id: entityInFocus._id})

            value.setBlockingLoading(false)

            setEntityInFocus({})

            loadOrderProducts()
        }
        catch(err){
            console.log(err)

            value.setBlockingLoading(false)
        }
        
    }

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div className="pageHolderContentTopLeft">
                <h2 className="pageTitle">Order - <span className="pageTitleContentHeader">Dele Momodou{order && order.name}</span></h2>

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
                    <h5>{(recipes && recipes.totalDocs) || 0}</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={openAddProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faTrash} /></button>
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
                            <th style={{width: "80%"}}>Dele Momodu</th>
                        </tr>
                        <tr className="notHeader">
                            <td>Date</td>
                            <td>17-12-2022</td>
                        </tr>
                        
                        <tr className="notHeader">
                            <td>Order status</td>
                            <td className="tabbedListContentHorizontalTableContent"> 
                                Pending
                                <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="rectangleButtonPrimary">Fulfill</button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td>Fulfillment date</td>
                            <td></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Total selling price</td>
                            <td>#30,000</td>
                        </tr>
                    </table>
    
                    : <>
                        {
                            (products && products.docs && products.docs.length > 0) ? <table className="tabbedListTable" style={{width: "100%"}}>
                            <tr className="header" style={{marginBottom: "24px"}}>
                                <th style={{width: "20%"}}>Name</th>
                                <th style={{width: "20%"}}>Quantity</th>
                                <th style={{width: "20%"}}>Unit</th>
                                <th style={{width: "20%"}}>Price</th>
                                <th style={{width: "20%"}}></th>
                            </tr>
                            {
                                products && products.docs && products.docs.length > 0 && products.docs.map(aProduct => {
                                    return <tr key={aProduct._id} className="notHeader">
                                                <td>{toUpperCase(aProduct.name)}</td>
                                                <td>{aProduct.quantity}</td>
                                                <td>{aProduct.purchase_size}</td>
                                                <td>{getAmount(aProduct.totalCost)}</td>
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                    <button onClick={e => showDeleteOrderProduct(e, aProduct)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                })
                            }
                        </table> :  <div style={{marginTop: "40px"}}> <EmptyResult  message={"No products found for this order"} onEmptyButtonClicked={loadOrderProducts} emptyButtonText={"Try Again"} /> </div>
                        }



                    </>
                }
            </div>

        </div>

        {
            showAddProduct && <AddProducts loadOrderProducts={loadOrderProducts} order={order} hideAddProduct={hideAddProduct} />
        }

        {
            isDelete.visible && <DeleteDialog onPerformDeleteClicked={deleteOrderProduct} onCancelDeleteClicked={hideDeleteOrderProduct} type={isDelete.type} message={isDelete.message} title={isDelete.title} />
        }

    </div>
}

export default OrderIndex;