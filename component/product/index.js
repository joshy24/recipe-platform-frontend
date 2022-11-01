
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

import Pagination from "../general/pagination"

import EditProduct from "./edit"

import Image from "next/image"

import { toUpperCase, getAmount, defaultPaginationObject } from "../../utils/helper"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { putRequest, getRequest, deleteRequest } from "../../utils/api.requests"

import { BASE_URL, GET_PRODUCT, ALL_MATERIALS_URL, ALL_RECIPES_URL, DELETE_PRODUCT_MATERIAL, DELETE_PRODUCT_RECIPE, EDIT_PRODUCT_RECIPE_URL, EDIT_PRODUCT_MATERIAL_URL, DELETE_PRODUCT_URL, EDIT_PRODUCT_URL, GET_MATERIAL_UNITS_URL } from "../../utils/api.endpoints"

const get_product_url = BASE_URL + GET_PRODUCT

const DetailsTab = "Details"
const RecipesTab = "Recipes"
const MaterialsTab = "Materials"

const ProductIndex = ({id}) => {
    const appContext = AppContext()

    const router = useRouter()

    const [showAddRecipe, setShowAddRecipe] = useState(false)
    const [showAddMaterial, setShowAddMaterial] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)
    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const [product, setProduct] = useState({})
    const [materials, setMaterials] = useState({})
    const [recipes, setRecipes] = useState({})

    const [materialUnits, setMaterialUnits] = useState(null)

    const [materialPaginate, setMaterialPaginate] = useState(defaultPaginationObject)
    const [recipePaginate, setRecipePaginate] = useState(defaultPaginationObject)

    const [entityInFocus, setEntityInFocus] = useState({})

    const [isDelete, setIsDelete] = useState({visible: false, title:"", message:"", type:""})

    const [showDeleteRecipe, setShowDeleteRecipe] = useState(false)
    const [showEditRecipe, setShowEditRecipe] = useState(false)
    const [showEditMaterial, setShowEditMaterial] = useState(false)

    //Product
    const [showDeleteProduct, setShowDeleteProduct] = useState(false)
    const [showEditProduct, setShowEditProduct] = useState(false)
    

    useEffect(() => {
        getMaterialUnits()
        loadAllAsync()
    }, [])

    useEffect(() => {
        loadProductMaterials()
    }, [materialPaginate.page])

    useEffect(() => {
        loadProductRecipes()
    }, [recipePaginate.page])

    const loadAllAsync = async () => {
        await loadProduct()

        await loadProductMaterials()

        await loadProductRecipes();
    }

    useEffect(() => {
        if((recipes.docs && recipes.docs.length == 0) && (materials.docs && materials.docs.length == 0)){
            appContext.setMessage({visible: true, message: "Please add Recipes and Materials to this product", title: "Message", type: "INFO"})
        }
    }, [materials, recipes])

    
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

    const getMaterialUnits = async () => {
        appContext.setLoading(true);

        try{
            let result = await getRequest(GET_MATERIAL_UNITS_URL)

            if(!!result){
                setMaterialUnits(result.response)
            }
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
            appContext.setMessage({visible: true, message: "An error occurred fetching material units", title: "Material Units Not Loaded", type: "ERROR"})
        }
    }

    const loadProduct = async() => {
        appContext.setLoading(true)
        try{
            const result = await getRequest(get_product_url+"?id="+id)
            
            setProduct(result.response)

            appContext.setLoading(false)
        }
        catch(err){
            appContext.setLoading(false)
        }
    }

    const loadProductRecipes = async() => {
        appContext.setLoading(true)
        try{
            const result = await getRequest(ALL_RECIPES_URL+`?id=${id}&page=${recipePaginate.page+1}&limit=${recipePaginate.limit}`)
            console.log(result.response)
            setRecipes(result.response)

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const loadProductMaterials = async() => {
        appContext.setLoading(true)
        try{
            const result = await getRequest(ALL_MATERIALS_URL+`?id=${id}&page=${materialPaginate.page+1}&limit=${materialPaginate.limit}`)

            setMaterials(result.response)

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }   

    const checkRecipesAdded = () => {
        if(!recipes || !recipes.docs || recipes.docs.length == 0){
            return false
        }

        return true;
    }

    const checkMaterialsAdded = () => {
        if(!materials || !materials.docs || materials.docs.length == 0){
            return false
        }

        return true;
    }

    const openEditProduct = () => {
        if(appContext.state.isLoading){
            return 
        }

        if(!checkMaterialsAdded() && !checkRecipesAdded()){
            appContext.setMessage({visible: true, message: "Please add Recipes and Materials before editing the product", title: "Message", type: "INFO"})
            return;
        }

        setShowEditProduct(true)
    }

    const hideEditProduct = () => {
        setShowEditProduct(false)
    }

    const editProduct = async (editedProduct) => {
        appContext.setBlockingLoading(true)
        
        try{
            await putRequest(EDIT_PRODUCT_URL, {id:id, ...editedProduct})

            appContext.setBlockingLoading(false)

            hideEditProduct()

            loadProduct()
        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)

            appContext.setMessage({visible: true, message: "Could not edit product successfully", title: "Message", type: "ERROR"})
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
        appContext.setBlockingLoading(true)
        
        try{
            await putRequest(EDIT_PRODUCT_MATERIAL_URL, {id:id, material_id: newEditedMaterial._id, quantity: newEditedMaterial.quantity})

            appContext.setBlockingLoading(false)

            
            hideEditMaterial()

            loadProductMaterials()
        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)

            appContext.setMessage({visible: true, message: "Could not edit product material successfully", title: "Message", type: "ERROR"})
        }
    }

    const openDeleteProduct = () => {
        setShowDeleteProduct(true)
    }

    const hideDeleteProduct = () => {
        setShowDeleteProduct(false)
    }

    const deleteProduct = async () => {
        appContext.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_PRODUCT_URL, {id:id})

            appContext.setBlockingLoading(false)

            hideDeleteProduct();

            router.push("/products")
        }
        catch(err){
            appContext.setBlockingLoading(false)

            hideDeleteProduct();

            appContext.setMessage({visible: true, message: `Could not delete ${product.name} successfully`, title: "Message", type: "ERROR"})
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
        appContext.setBlockingLoading(true)
        
        try{
            await putRequest(EDIT_PRODUCT_RECIPE_URL, {id:id, recipe_id: newEditedRecipe._id, quantity: newEditedRecipe.yield.amount, unit: newEditedRecipe.yield.unit})

            appContext.setBlockingLoading(false)

            
            hideEditProductRecipe()

            loadProductRecipes()
        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)

            appContext.setMessage({visible: true, message: "Could not edit product recipe successfully", title: "Message", type: "ERROR"})
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
        appContext.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_PRODUCT_RECIPE, {id:id, recipe_id: entityInFocus._id})

            appContext.setBlockingLoading(false)

            hideDeleteProductRecipe();

            loadProductRecipes()
        }
        catch(err){
            appContext.setBlockingLoading(false)

            hideDeleteProductRecipe();

            appContext.setMessage({visible: true, message: "Could not delete product recipe successfully", title: "Message", type: "ERROR"})
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
        
        appContext.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_PRODUCT_MATERIAL, {id:id, material_id: entityInFocus._id})

            appContext.setBlockingLoading(false)

            hideDeleteProductMaterial()

            loadProductMaterials()
        }
        catch(err){
            appContext.setBlockingLoading(false)

            hideDeleteProductMaterial()

            appContext.setMessage({visible: true, message: "Could not delete product material successfully", title: "Message", type: "ERROR"})
        }
    }

    const goToRecipe = (e, recipe_id) => {
        e.preventDefault()
        router.push("/recipe/"+recipe_id);
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
        return getTotalCost() + parseInt(product.labour_cost) + parseInt(product.overhead_cost)
    }

    const getProposedSellingCost = () => {
        const totalCost = getTotalCost() + (product.labour_cost ? product.labour_cost : 0) + (product.overhead_cost ? product.overhead_cost : 0)

        const profit = product.profit_margin ? (product.profit_margin / 100) * totalCost : 0

        return totalCost + profit
    }

    const handleMaterialsPageClick = async (event) => {
        setMaterialPaginate({...materialPaginate, page: event.selected})
    }

    const handleRecipesPageClick = async (event) => {
        setRecipePaginate({...recipePaginate, page: event.selected})
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
                    <h5>{DetailsTab}</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, RecipesTab)} className={`${selectedTab == RecipesTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>{RecipesTab}</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, MaterialsTab)} className={`${selectedTab == MaterialsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>{MaterialsTab}</h5>
                </div>
            </div>
            
                {
                    selectedTab == DetailsTab ? 
                    <div className="tabbedListTableHolder largeTopMargin"> 
                        <table className="tabbedListTable" style={{width: "100%"}}>
                            <tr className="notHeader">
                                <td style={{width: "24%"}}>Cost Price</td>
                                <td style={{width: "76%"}}>{product && getAmount(getTotalCost())}</td>
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
                                <td>{product && getAmount(getTotalCostPrice())}</td>
                            </tr>
                            <tr className="notHeader" style={{marginBottom: "24px"}}>
                                <td>Profit Margin</td>
                                <td>{(product && product.profit_margin) ? product.profit_margin : 0}%</td>
                            </tr>
                            <tr className="notHeader">
                                <td>Proposed Selling Price</td>
                                <td>{product && getAmount(getProposedSellingCost())}</td>
                            </tr>
                            <tr className="notHeader">
                                <td>Actual Selling Price</td>
                                <td>{product && getAmount(product.actual_selling_price)}</td>
                            </tr>
                        </table>
                    </div> :  selectedTab == RecipesTab ? 
                    
                    <div className="tabbedListTableHolder"> 
                        <div className="largeTopMargin">
                            {
                                recipes && recipes.docs && <Pagination pageCount={recipePaginate.totalPagesCount} handlePageClick={handleRecipesPageClick} currentPage={recipePaginate.page} />
                            }
                        </div>
                        {
                            recipes && recipes.docs && recipes.docs.length > 0 ? <table className="tabbedListTable" style={{width: "100%"}}>
                            <tr className="header" style={{marginBottom: "24px"}}>
                                <th style={{width: "20%"}}>Name</th>
                                <th style={{width: "20%"}}>Quantity</th>
                                <th style={{width: "20%"}}>Unit</th>
                                <th style={{width: "20%"}}>Cost</th>
                                <th style={{width: "20%"}}></th>
                            </tr>
                            {
                                recipes && recipes.docs && recipes.docs.length > 0 && recipes.docs.map(aRecipe => {
                                    return <tr key={aRecipe._id} className="notHeader">
                                                <td>{toUpperCase(aRecipe.name)}</td>
                                                <td>{ aRecipe.yield ? aRecipe.yield.amount : 0 }</td>
                                                <td>{ aRecipe.yield ? aRecipe.yield.unit.name : "" } ({ aRecipe.yield ? aRecipe.yield.unit.abbreviation : "" })</td>
                                                <td>{ getAmount(aRecipe.cost) }</td>
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button onClick={e => showEditProductRecipe(e, aRecipe)} style={{marginLeft: "16px"}}  className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                    <button onClick={e => showDeleteProductRecipe(e, aRecipe)} style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                })
                            }
                            
                            </table> : <div style={{marginTop: "40px"}}> <EmptyResult  message={"No Recipes found for this product"} onEmptyButtonClicked={loadProductRecipes} emptyButtonText={"Try Again"} /> </div>
                        }
                        {
                            recipes && recipes.docs && <Pagination pageCount={recipePaginate.totalPagesCount} handlePageClick={handleRecipesPageClick} currentPage={recipePaginate.page} />
                        }
                    </div>
                    
                    : <div className="tabbedListTableHolder"> 
                        <div className="largeTopMargin">
                            {
                                materials && materials.docs && <Pagination pageCount={materialPaginate.totalPagesCount} handlePageClick={handleMaterialsPageClick} currentPage={materialPaginate.page} />
                            }
                        </div>
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
                                                <td>{aMaterial.purchase_quantity.unit.name} ({aMaterial.purchase_quantity.unit.abbreviation})</td>
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

                        {
                            materials && materials.docs && <Pagination pageCount={materialPaginate.totalPagesCount} handlePageClick={handleMaterialsPageClick} currentPage={materialPaginate.page} />
                        }
                    </div>
                }
        </div>

        {
            showAddMaterial && <AddMaterials units={materialUnits} loadProductMaterials={loadProductMaterials} product={product} hideAddMaterial={hideAddMaterial} />
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
            showEditProduct && <EditProduct totalCost={getTotalCost} productToEdit={product} closeEdit={hideEditProduct} editProduct={editProduct} proposedSellingPrice={getAmount(getProposedSellingCost())} />
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