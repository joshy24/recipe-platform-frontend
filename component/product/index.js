
import { useEffect, useState, useContext } from "react";
import styles from "../../styles/Products.module.css"

import EmptyResult from "../general/emptyResult"

import AppContext from "../../pages/AppContext";

import AddMaterials from "./addmaterials"
import AddRecipes from "./addrecipes"

import DeleteDialog from "../general/deletedialog"

import Image from "next/image"

import { toUpperCase, getAmount } from "../../utils/helper"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { postRequest, getRequest, deleteRequest } from "../../utils/api.requests"



import { BASE_URL, GET_PRODUCT, ALL_MATERIALS_URL, ALL_RECIPES_URL, DELETE_PRODUCT_MATERIAL, DELETE_PRODUCT_RECIPE } from "../../utils/api.endpoints"

const get_product_url = BASE_URL + GET_PRODUCT

const DetailsTab = "Details"
const RecipesTab = "Recipes"
const MaterialsTab = "Materials"


const ProductIndex = ({id}) => {
    const value = useContext(AppContext);

    const [showAddRecipe, setShowAddRecipe] = useState(false)
    const [showAddMaterial, setShowAddMaterial] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)
    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const [product, setProduct] = useState({})
    const [materials, setMaterials] = useState({})
    const [recipes, setRecipes] = useState({})
    const [materialPaginate, setMaterialPaginate] = useState({offset: 0, limit: 30})
    const [recipePaginate, setRecipePaginate] = useState({offset: 0, limit: 30})

    const [entityInFocus, setEntityInFocus] = useState({})

    const [isDelete, setIsDelete] = useState({visible: false, title:"", message:"", type:""})
    

    useEffect(() => {
        loadAllAsync()
    }, [])

    const loadAllAsync = async () => {
        await loadProduct()

        await loadProductMaterials()

        await loadProductRecipes();
    }

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const switchSelectedTab = (e, tab) => {
        e.preventDefault()
        setSelectedTab(tab)
    }


    /*
    New functions
    */

    const loadProduct = async() => {
        value.setLoading(true)
        try{
            const result = await getRequest(get_product_url+"?id="+id)
            
            setProduct(result.response)

            value.setLoading(false)
        }
        catch(err){
            console.log(err)
            value.setLoading(false)
        }
    }

    const loadProductRecipes = async() => {
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

    const loadProductMaterials = async() => {
        value.setLoading(true)
        try{
            const result = await getRequest(ALL_MATERIALS_URL+`?id=${id}&offset=${materialPaginate.offset}&limit=${materialPaginate.limit}`)

            setMaterials(result.response)

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

    const showEditProduct = () => {

    }

    const hideEditProduct = () => {

    }

    const editProduct = async () => {

    }

    const openAddRecipe = () => {
        setShowAddRecipe(true)
    }

    const hideAddRecipe = () => {
        setShowAddRecipe(false)
    }

    const openAddMaterial = () => {
        setShowAddMaterial(true)
    }

    const hideAddMaterial = () => {
        setShowAddMaterial(false)
    }

    const showDeleteProduct = () => {

    }

    const hideDeleteProduct = () => {

    }

    const deleteProduct = async () => {
        
    }

    const showEditProductRecipe = () => {

    }

    const hideEditProductRecipe = () => {

    }

    const editProductRecipe = async () => {

    }

    const showDeleteProductRecipe = () => {

    }

    const hideDeleteProductRecipe = () => {

    }

    const deleteProductRecipe = async () => {

    }

    const showDeleteProductMaterial = (e, aMaterial) => {
        
        setEntityInFocus(aMaterial)
        
        setIsDelete({visible: true, title: "Confirm Action", message:`Confirm that you want to delete ${toUpperCase(aMaterial.name)} from ${product.name}`, type: "Product"})
    }

    const hideDeleteProductMaterial = () => {
        setIsDelete({visible: false, title: "", message:``, type: ""})
    }

    const deleteProductMaterial = async () => {

        hideDeleteProductMaterial()
        
        value.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_PRODUCT_MATERIAL, {id:id, material_id: entityInFocus._id})

            value.setBlockingLoading(false)

            setEntityInFocus({})

            loadProductMaterials()
        }
        catch(err){
            console.log(err)

            value.setBlockingLoading(false)
        }
        
    }

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div className="pageHolderContentTopLeft">
                <h2 className="pageTitle">Product - <span className="pageTitleContentHeader">{product && product.name}</span></h2>

                <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                    What are Products? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                </h5>

                {
                    whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                        <h6 className="whatIsContent tinyPadding">product is an object, or system, or service made available for consumer use to satisfy the desire or need of a customer.</h6>
                        <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                    </div>
                }
            </div>

            <div className="pageHolderContentTopCenter">
                <div>
                    <h4>Recipes</h4>
                    <h5>{(recipes && recipes.totalDocs) || 0}</h5>
                </div>

                <div>
                    <h4>Materials</h4>
                    <h5>{ (materials && materials.totalDocs) || 0}</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={openAddRecipe} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Recipe</button>
                <button onClick={openAddMaterial} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Material</button>
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTabsHolder">
                <div onClick={e => switchSelectedTab(e, DetailsTab)} className={`${selectedTab == DetailsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Details</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, RecipesTab)} className={`${selectedTab == RecipesTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Recipes</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, MaterialsTab)} className={`${selectedTab == MaterialsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Materials</h5>
                </div>
            </div>

            <div className="tabbedListTableHolder"> 
                {
                    selectedTab == DetailsTab ? 
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="notHeader" style={{marginBottom: "24px"}}>
                            <th style={{width: "24%"}}>Profit Margin</th>
                            <th style={{width: "18%"}}>{product && product.profit_margin}%</th>
                            <th style={{width: "58%"}}><button style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></th>
                        </tr>
                        <tr className="notHeader">
                            <td>Total Price of Recipes</td>
                            <td>₦0</td>
                            <td></td>
                        </tr>
                        
                        <tr className="notHeader">
                            <td>Total Cost Price</td>
                            <td>₦0</td>
                            <td></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Labour Cost</td>
                            <td>{product && getAmount(product.labour_cost)}</td>
                            <td><button style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Overhead Cost</td>
                            <td>{product && getAmount(product.overhead_cost)}</td>
                            <td><button style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Actual Selling Price</td>
                            <td>{product && getAmount(product.actual_selling_price)}</td>
                            <td><button style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Proposed Selling Price</td>
                            <td>₦0</td>
                            <td></td>
                        </tr>
                    </table> :  selectedTab == RecipesTab ? 
                    
                    <>
                        {
                            recipes && recipes.docs && recipes.docs.length > 0 ? <table className="tabbedListTable" style={{width: "100%"}}>
                            <tr className="header" style={{marginBottom: "24px"}}>
                                <th style={{width: "20%"}}>Name</th>
                                <th style={{width: "20%"}}>Amount</th>
                                <th style={{width: "20%"}}>Cost</th>
                                <th style={{width: "20%"}}>Unit</th>
                                
                                <th style={{width: "20%"}}></th>
                            </tr>
                            <tr className="notHeader">
                                <td>Shawarma</td>
                                <td>1</td>
                                <td>#800</td>
                                <td>Kg</td>
                                
                                <td className="tabbedListContentHorizontalTableContent">
                                    <button style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                    <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                            
                        </table> : <div style={{marginTop: "40px"}}> <EmptyResult  message={"No Recipes found for this product"} onEmptyButtonClicked={loadProductRecipes} emptyButtonText={"Try Again"} /> </div>
                        }
                    </>
                    
                    : <>
                        {
                            (materials && materials.docs && materials.docs.length > 0) ? <table className="tabbedListTable" style={{width: "100%"}}>
                            <tr className="header" style={{marginBottom: "24px"}}>
                                <th style={{width: "20%"}}>Name</th>
                                <th style={{width: "20%"}}>Quantity</th>
                                <th style={{width: "20%"}}>Unit</th>
                                <th style={{width: "20%"}}>Price</th>
                                <th style={{width: "20%"}}></th>
                            </tr>
                            {
                                materials && materials.docs && materials.docs.length > 0 && materials.docs.map(aMaterial => {
                                    return <tr key={aMaterial._id} className="notHeader">
                                                <td>{toUpperCase(aMaterial.name)}</td>
                                                <td>{aMaterial.quantity}</td>
                                                <td>{aMaterial.purchase_size}</td>
                                                <td>{getAmount(aMaterial.totalCost)}</td>
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                    <button onClick={e => showDeleteProductMaterial(e, aMaterial)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                })
                            }
                        </table> :  <div style={{marginTop: "40px"}}> <EmptyResult  message={"No Materials found for this product"} onEmptyButtonClicked={loadProductMaterials} emptyButtonText={"Try Again"} /> </div>
                        }



                    </>
                }
            </div>

        </div>

        {
            showAddMaterial && <AddMaterials loadProductMaterials={loadProductMaterials} product={product} hideAddMaterial={hideAddMaterial} />
        }

        {
            showAddRecipe && <AddRecipes  loadProductRecipes={loadProductRecipes} product={product} hideAddRecipe={hideAddRecipe} />
        }

        {
            isDelete.visible && <DeleteDialog onPerformDeleteClicked={deleteProductMaterial} onCancelDeleteClicked={hideDeleteProductMaterial} type={isDelete.type} message={isDelete.message} title={isDelete.title} />
        }

    </div>
}

export default ProductIndex;