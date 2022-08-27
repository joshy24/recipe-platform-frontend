
import { useEffect, useState, useContext } from "react";

import style from "../../styles/Products.module.css"

import { useRouter } from "next/router"

import EmptyResult from "../general/emptyResult"

import { AppContext } from "../../pages/AppContext";

import AddMaterials from "./addmaterials"
import AddRecipes from "./addrecipes"

import EditProductRecipe from "./editRecipe"
import EditProductMaterial from "./editMaterial"

import DeleteDialog from "../general/deletedialog"

import EditProduct from "./edit"

import Image from "next/image"

import { toUpperCase, getAmount } from "../../utils/helper"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { putRequest, getRequest, deleteRequest } from "../../utils/api.requests"

import { BASE_URL, GET_PRODUCT, ALL_MATERIALS_URL, ALL_RECIPES_URL, DELETE_PRODUCT_MATERIAL, DELETE_PRODUCT_RECIPE, EDIT_PRODUCT_RECIPE_URL, EDIT_PRODUCT_MATERIAL_URL, DELETE_PRODUCT_URL, EDIT_PRODUCT_URL } from "../../utils/api.endpoints"

const get_product_url = BASE_URL + GET_PRODUCT

const DetailsTab = "Details"
const RecipesTab = "Recipes"
const MaterialsTab = "Materials"


const ProductIndex = ({id}) => {
    const value = AppContext()

    const router = useRouter()

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

    const [showDeleteRecipe, setShowDeleteRecipe] = useState(false)
    const [showEditRecipe, setShowEditRecipe] = useState(false)
    const [showEditMaterial, setShowEditMaterial] = useState(false)

    //Product
    const [showDeleteProduct, setShowDeleteProduct] = useState(false)
    const [showEditProduct, setShowEditProduct] = useState(false)
    

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

    const openEditProduct = () => {
        setShowEditProduct(true)
    }

    const hideEditProduct = () => {
        setShowEditProduct(false)
    }

    const editProduct = async (editedProduct) => {
        value.setBlockingLoading(true)
        
        try{
            await putRequest(EDIT_PRODUCT_URL, {id:id, ...editedProduct})

            value.setBlockingLoading(false)

            hideEditProduct()

            loadProduct()
        }
        catch(err){
            console.log(err)

            value.setBlockingLoading(false)

            value.setMessage({visible: true, message: "Could not edit product successfully", title: "Message", type: "ERROR"})
        }
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

    const openEditMaterial = (e, materialToEdit) => {
        e.preventDefault()
        setEntityInFocus(materialToEdit)
        setShowEditMaterial(true)
    }

    const hideEditMaterial = () => {
        setShowEditMaterial(false)
        setEntityInFocus({})
    }

    const editProductMaterial = async (newEditedMaterial) => {
        value.setBlockingLoading(true)
        
        try{
            await putRequest(EDIT_PRODUCT_MATERIAL_URL, {id:id, material_id: newEditedMaterial._id, quantity: newEditedMaterial.quantity})

            value.setBlockingLoading(false)

            
            hideEditMaterial()

            loadProductMaterials()
        }
        catch(err){
            console.log(err)

            value.setBlockingLoading(false)

            value.setMessage({visible: true, message: "Could not edit product material successfully", title: "Message", type: "ERROR"})
        }
    }

    const openDeleteProduct = () => {
        setShowDeleteProduct(true)
    }

    const hideDeleteProduct = () => {
        setShowDeleteProduct(false)
    }

    const deleteProduct = async () => {
        value.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_PRODUCT_URL, {id:id})

            value.setBlockingLoading(false)

            hideDeleteProduct();

            router.push("/products")
        }
        catch(err){
            value.setBlockingLoading(false)

            hideDeleteProduct();

            value.setMessage({visible: true, message: `Could not delete ${product.name} successfully`, title: "Message", type: "ERROR"})
        }
    }

    const showEditProductRecipe = (e, recipeToEdit) => {
        e.preventDefault()
        setEntityInFocus(recipeToEdit)
        setShowEditRecipe(true)
    }

    const hideEditProductRecipe = () => {
        setEntityInFocus({})
        setShowEditRecipe(false)
    }

    const editProductRecipe = async (newEditedRecipe) => {
        value.setBlockingLoading(true)
        
        try{
            await putRequest(EDIT_PRODUCT_RECIPE_URL, {id:id, recipe_id: newEditedRecipe._id, quantity: newEditedRecipe.yield.amount})

            value.setBlockingLoading(false)

            
            hideEditProductRecipe()

            loadProductRecipes()
        }
        catch(err){
            console.log(err)

            value.setBlockingLoading(false)

            value.setMessage({visible: true, message: "Could not edit product recipe successfully", title: "Message", type: "ERROR"})
        }
    }

    const showDeleteProductRecipe = (e, productRecipe) => {
        e.preventDefault()
        setEntityInFocus(productRecipe)
        setShowDeleteRecipe(true)
    }

    const hideDeleteProductRecipe = () => {
        setEntityInFocus({})
        setShowDeleteRecipe(false)
    }

    const deleteProductRecipe = async () => { 
        value.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_PRODUCT_RECIPE, {id:id, recipe_id: entityInFocus._id})

            value.setBlockingLoading(false)

            hideDeleteProductRecipe();

            loadProductRecipes()
        }
        catch(err){
            value.setBlockingLoading(false)

            hideDeleteProductRecipe();

            value.setMessage({visible: true, message: "Could not delete product recipe successfully", title: "Message", type: "ERROR"})
        }
    }

    const showDeleteProductMaterial = (e, aMaterial) => {
        
        setEntityInFocus(aMaterial)
        
        setIsDelete({visible: true, title: "Confirm Action", message:`Confirm that you want to delete ${toUpperCase(aMaterial.name)} from ${product.name}`, type: "Product"})
    }

    const hideDeleteProductMaterial = () => {
        setIsDelete({visible: false, title: "", message:``, type: ""})
    }

    const deleteProductMaterial = async () => {
        
        value.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_PRODUCT_MATERIAL, {id:id, material_id: entityInFocus._id})

            value.setBlockingLoading(false)

            hideDeleteProductMaterial()

            loadProductMaterials()
        }
        catch(err){
            value.setBlockingLoading(false)

            hideDeleteProductMaterial()

            value.setMessage({visible: true, message: "Could not delete product material successfully", title: "Message", type: "ERROR"})
        }
        
    }

    const getRecipesCost = () => {
        if(!recipes || !recipes.docs)
            return 0

        return recipes.docs.reduce((acc,recipe) => {
            return acc + recipe.cost
        }, 0)
    }

    const getMaterialsCost = () => {
        if(!materials || !materials.docs)
            return 0

        return materials.docs.reduce((acc,material) => {
            return acc + material.totalCost
        }, 0)
    }

    const getTotalCost = () => {
        return getRecipesCost() + getMaterialsCost()
    }

    const getTotalCostPrice = () => {
        return getTotalCost() + product.labour_cost + product.overhead_cost
    }

    const getProposedSellingCost = () => {
        const totalCost = getTotalCost() + product.labour_cost + product.overhead_cost

        const profit = (product.profit_margin / 100) * totalCost
        
        return totalCost + profit
    }

    return <div className="pageHolderContent">
        <div className={`pageHolderContentTopOther ${style.pageHolderContentTopForProduct}`}>
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
                <button onClick={openEditProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={openAddRecipe} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Recipe</button>
                <button onClick={openAddMaterial} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Material</button>
                <button onClick={openDeleteProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>

        <div className={style.pageHolderContentTopMobile}>
            <div style={mobileTopSpacer} className={style.pageHolderContentTopTop}>
                <h2 className="pageTitle">Product - <span className="pageTitleContentHeader">{product && product.name}</span></h2>
            
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <button style={mobileTopButtonsSpacer} onClick={openEditProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                    <button style={mobileTopButtonsSpacer} onClick={openAddRecipe} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Recipe</button>
                    <button style={mobileTopButtonsSpacer} onClick={openAddMaterial} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Material</button>
                    <button style={mobileTopButtonsSpacer} onClick={openDeleteProduct} className="squareButtonPrimary"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>

            <div className={style.pageHolderContentMiddle}>
                <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                    What are Products? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                </h5>

                {
                    whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                        <h6 className="whatIsContent tinyPadding">A product is a sellable item made from a combination of recipes and materials e.g 6 inches buttercream cake.</h6>
                        <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                    </div>
                }
            </div>
            
            <div className={style.pageHolderContentTopBottom}>
                <div className={style.pageHolderContentTopBottomItem}>
                    <h4 className={style.text}>Recipes</h4>
                    <span>-</span>
                    <h5 className={style.text}>{(recipes && recipes.totalDocs) || 0}</h5>
                </div>

                <div className={style.pageHolderContentTopBottomItem}>
                    <h4 className={style.text}>Materials</h4>
                    <span>-</span>
                    <h5 className={style.text}>{ (materials && materials.totalDocs) || 0}</h5>
                </div>
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
                        <tr className="notHeader">
                            <td style={{width: "24%"}}>Cost Price</td>
                            <td style={{width: "76%"}}>{product && recipes.docs && materials.docs && getAmount(getTotalCost())}</td>
                        </tr>
                        <tr className="notHeader">
                            <td>Labour Cost</td>
                            <td>{product && getAmount(product.labour_cost)}</td>
                        </tr>
                        <tr className="notHeader">
                            <td>Overhead Cost</td>
                            <td>{product && getAmount(product.overhead_cost)}</td>
                        </tr>
                        <tr className="notHeader">
                            <td>Total Cost Price</td>
                            <td>{product && recipes.docs && materials.docs && getAmount(getTotalCostPrice())}</td>
                        </tr>
                        <tr className="notHeader" style={{marginBottom: "24px"}}>
                            <td>Profit Margin</td>
                            <td>{product && product.profit_margin}%</td>
                        </tr>
                        <tr className="notHeader">
                            <td>Proposed Selling Price</td>
                            <td>{product && recipes.docs && materials.docs && getAmount(getProposedSellingCost())}</td>
                        </tr>
                        <tr className="notHeader">
                            <td>Actual Selling Price</td>
                            <td>{product && getAmount(product.actual_selling_price)}</td>
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
                            {
                                recipes && recipes.docs && recipes.docs.length > 0 && recipes.docs.map(aRecipe => {
                                    return <tr className="notHeader">
                                                <td>{toUpperCase(aRecipe.name)}</td>
                                                <td>{ aRecipe.yield ? aRecipe.yield.amount : 0 }</td>
                                                <td>{ getAmount(aRecipe.cost) }</td>
                                                <td>{ aRecipe.yield ? aRecipe.yield.unit : "" }</td>
                                                
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button onClick={e => showEditProductRecipe(e, aRecipe)} style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                    <button onClick={e => showDeleteProductRecipe(e, aRecipe)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                })
                            }
                            
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
                                                    <button onClick={e => openEditMaterial(e,aMaterial)} style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
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

        {
            showEditRecipe && <EditProductRecipe recipe={entityInFocus} onPerformEditClicked={editProductRecipe} onCancelEditClicked={hideEditProductRecipe} />
        }

        {
            showEditMaterial && <EditProductMaterial material={entityInFocus} onPerformEditClicked={editProductMaterial} onCancelEditClicked={hideEditMaterial} />
        }

        {
            showDeleteRecipe && <DeleteDialog onPerformDeleteClicked={deleteProductRecipe} onCancelDeleteClicked={hideDeleteProductRecipe} message={`Confirm that you want to remove ${entityInFocus.name} from ${product.name}?`} title={"Confirm Action"} />
        }

        {
            showDeleteProduct && <DeleteDialog onPerformDeleteClicked={deleteProduct} onCancelDeleteClicked={hideDeleteProduct} message={`Confirm that you want to delete ${product.name}?`} title={"Confirm Action"} />
        }

        {
            showEditProduct && <EditProduct productToEdit={product} closeEdit={hideEditProduct} editProduct={editProduct} proposedSellingPrice={getAmount(getProposedSellingCost())} />
        }

    </div>
}

export default ProductIndex;


const mobileMiddleSpacer = {
    marginBottom: "16px",
    marginTop: "0px"
}

const mobileMiddleRightSpacer = {
    marginRight: "16px"
}

const mobileTopSpacer = {
    marginBottom: "0px",
    marginTop: "0px"
}

const mobileTopButtonsSpacer = {
    marginBottom: "4px",
    marginTop: "4px"
}