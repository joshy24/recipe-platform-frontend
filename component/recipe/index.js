
import { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router"

import AddIngredients from "./addingredients"

import EditRecipe from "./editrecipe"

import EditRecipeIngredient from "./editrecipeingredient"

import DeleteDialog from "../general/deletedialog"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import Image from "next/image"

import { toUpperCase, getAmount, defaultPaginationObject } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { AppContext } from "../../pages/AppContext";

import EmptyResult from "../general/emptyResult"

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import { BASE_URL, GET_UNITS_URL, GET_RECIPE, ALL_RECIPE_INGREDIENTS_URL, EDIT_RECIPE_URL, DELETE_RECIPE_URL, EDIT_RECIPE_INGREDIENT_URL, DELETE_RECIPE_INGREDIENT_URL } from "../../utils/api.endpoints"

const get_recipe_url = BASE_URL + GET_RECIPE

const DetailsTab = "Details"
const IngredientsTab = "Ingredients"

const RecipeIndex = ({id}) => {

    const router = useRouter();

    const appContext = AppContext()

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)

    const [recipe, setRecipe] = useState({})

    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const [showEditRecipe, setShowEditRecipe] = useState(false)

    const [showDeleteRecipe, setShowDeleteRecipe] = useState(false)

    const [ingredients, setIngredients] = useState([])

    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [showEditRecipeIngredient, setShowEditRecipeIngredient] = useState(false)

    const [showDeleteRecipeIngredient, setShowDeleteRecipeIngredient] = useState(false)

    const [entityInFocus, setEntityInFocus] = useState({})

    const [units, setUnits] = useState(null)
    

    useEffect(() => {
        loadRecipe()

        loadRecipeIngredients()

        getUnits()
    }, [])

    
    const switchSelectedTab = (e, tab) => {
        e.preventDefault()
        setSelectedTab(tab)
    }

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }
    

    /*
    New functions
    */

    const getUnits = async () => {
        appContext.setLoading(true);

        try{
            let result = await getRequest(GET_UNITS_URL)

            if(!!result){
                setUnits(result.response)
            }
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
            appContext.setMessage({visible: true, message: "An error occurred fetching units", title: "Units Not Loaded", type: "ERROR"})
        }
    }

    const loadRecipe = async() => {
        try{
            const url = get_recipe_url+"/?id="+id

            const aRecipe = await getRequest(url)

            setRecipe(aRecipe.response);
        }
        catch(err){
            console.log(err)
        }
    }

    const loadRecipeIngredients = async() => {
        appContext.setLoading(true)
        try{
            const result = await getRequest(ALL_RECIPE_INGREDIENTS_URL+`?id=${id}&page=${pagination.page}&limit=${pagination.limit}`)

            setIngredients(result.response)

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)

            getRecipeCost()
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const openAddIngredients = () => {
        setShowAddIngredients(true)
    }

    const hideAddIngredients = () => {
        setShowAddIngredients(false)
    }

    const openEditRecipe = () => {
        setShowEditRecipe(true)
    }

    const hideEditRecipe = () => {
        setShowEditRecipe(false)
    }

    const editRecipe = async (e, editedRecipe) => {
        appContext.setBlockingLoading(true)
        try{
            const result = await putRequest(EDIT_RECIPE_URL, {...recipe, ...editedRecipe})

            console.log(result)

            hideEditRecipe()

            loadRecipe()

            appContext.setBlockingLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setMessage({visible: true, message: "Could not edit recipe successfully", title: "Message", type: "ERROR"})

            appContext.setBlockingLoading(false)
        }
    }

    const editIngredient = async (newEditedRecipe) => {
        appContext.setBlockingLoading(true)

        try{
            await putRequest(EDIT_RECIPE_INGREDIENT_URL, {id:id, ingredient_id: newEditedRecipe._id, quantity: newEditedRecipe.quantity, purchase_size: newEditedRecipe.purchase_size})

            appContext.setBlockingLoading(false)

            
            hideEditRecipeIngredient()

            loadRecipeIngredients()
        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)

            hideEditRecipeIngredient()

            appContext.setMessage({visible: true, message: "Could not edit recipe ingredient successfully", title: "Message", type: "ERROR"})
        }
    }

    const openEditRecipeIngredient = (e, ingredientToEdit) => {
        e.preventDefault()
        setEntityInFocus(ingredientToEdit)
        setShowEditRecipeIngredient(true)
    }

    const hideEditRecipeIngredient = () => {
        setEntityInFocus({})
        setShowEditRecipeIngredient(false)
    }

    const openDeleteRecipe = () => {
        setShowDeleteRecipe(true)
    }

    const hideDeleteRecipe = () => {
        setShowDeleteRecipe(false)
    }

    const deleteRecipe = async () => {

        appContext.setBlockingLoading(true)

        try{
            await deleteRequest(DELETE_RECIPE_URL, {id: id})

            appContext.setBlockingLoading(false)

            router.push("/recipes")
        }
        catch(err){
            appContext.setBlockingLoading(false)
        }
    }

    const showDeleteIngredient = (e, ingredientToDelete) => {
        e.preventDefault()
        setEntityInFocus(ingredientToDelete)
        setShowDeleteRecipeIngredient(true)
    }
     

    const hideDeleteIngredient = () => {
        setEntityInFocus({})
        setShowDeleteRecipeIngredient(false)
    }
    
    const deleteIngredient = async () => {
        appContext.setBlockingLoading(true)
        
        try{
            await deleteRequest(DELETE_RECIPE_INGREDIENT_URL, {ingredient_id:entityInFocus._id, id:id})

            appContext.setBlockingLoading(false)

            hideDeleteIngredient();

            loadRecipeIngredients()
        }
        catch(err){
            console.log(err)

            appContext.setBlockingLoading(false)

            hideDeleteIngredient()

            appContext.setMessage({visible: true, message: "Could not delete ingredient from recipe", title: "Error Deleting", type: "ERROR"})
        }
    }

    const getRecipeCost = () => {
        if(!ingredients || !ingredients.docs || ingredients.docs.length == 0){
            return getAmount(0);
        }

        const aSum = ingredients.docs.reduce((accumulator, ingredient) => {
            return accumulator+=ingredient.totalCost
        }, 0)

        return getAmount(aSum)
    }


    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div className="pageHolderContentTopLeft">
                <h2 className="pageTitle">Recipe - <span className="pageTitleContentHeader">{recipe && recipe.name}</span></h2>

                <h5>
                    Description - <span>{recipe && recipe.description}</span>
                </h5>

                <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                    What is a Recipe? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                </h5>

                {
                    whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                        <h6 className="whatIsContent tinyPadding">A recipe consists of ingredients (and quantity requried for each ingredient) to create individual recipes. e.g Red velvet recipe</h6>
                        <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                    </div>
                }
            </div>

            <div className="pageHolderContentTopCenter">
                <div>
                    <h4>Total Cost</h4>
                    <h5>{getRecipeCost()}</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button onClick={openEditRecipe} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={openAddIngredients} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                <button onClick={openDeleteRecipe} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>

        <div className="pageHolderContentTopMobile">
            <div style={mobileTopSpacer} className="pageHolderContentTopTop">
                <h2 className="pageTitle">Recipe - <span className="pageTitleContentHeader">{recipe && recipe.name}</span></h2>
            </div>

            <div className="pageHolderContentMiddle">
                <h5 style={mobileMiddleSpacer}> 
                    Description - <span>{recipe && recipe.description}</span>
                </h5>
                <div style={{display: "flex"}}>
                    <button style={mobileMiddleRightSpacer} onClick={openEditRecipe} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                    <button style={mobileMiddleRightSpacer} onClick={openAddIngredients} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                    <button style={mobileMiddleRightSpacer} onClick={openDeleteRecipe} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                </div>

                <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                    What are Recipes? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                </h5>

                {
                    whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                        <h6 className="whatIsContent tinyPadding">is a popular Levantine dish consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit.</h6>
                        <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                    </div>
                }
            </div>
            
            <div className="pageHolderContentTopBottom">
                <div className="pageHolderContentTopBottomItem">
                    <h4>Total Cost</h4>
                    <span>-</span>
                    <h5>{getRecipeCost()}</h5>
                </div>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTabsHolder">
                <div onClick={e => switchSelectedTab(e, DetailsTab)} className={`${selectedTab == DetailsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Details</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, IngredientsTab)} className={`${selectedTab == IngredientsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Ingredients</h5>
                </div>
            </div>

            <div className="tabbedListTableHolder"> 
                {
                    selectedTab == DetailsTab ? 
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="notHeader" style={{marginBottom: "24px"}}>
                            <th style={{width: "20%"}}>Name</th>
                            <th style={{width: "80%"}}>{recipe && recipe.name}</th>
                        </tr>
                        <tr className="notHeader">
                            <td>Description</td>
                            <td>{recipe && recipe.description}</td>
                        </tr>
                        <tr className="notHeader">
                            <td>Yield</td>
                            <td className="tabbedListContentHorizontalTableContent"> 
                                <h5>{recipe && recipe.yield && recipe.yield.amount} {recipe && recipe.yield && recipe.yield.unit.abbreviation} {!recipe || !recipe.yield && 0}</h5>
                                <button style={{marginLeft: "16px"}} onClick={openEditRecipe} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td>Total Cost</td>
                            <td>{getRecipeCost()}</td>
                        </tr>
                    </table> : 
                        <>
                            <table className="tabbedListTable" style={{width: "100%"}}>      
                                {
                                    !appContext.state.isLoading ? <tbody>
                                        <tr className="header" style={{marginBottom: "24px"}}>
                                            <th style={{width: "20%"}}>Name</th>
                                            <th style={{width: "20%"}}>Quantity</th>
                                            <th style={{width: "20%"}}>Unit</th>
                                            <th style={{width: "20%"}}>Cost</th>
                                            <th style={{width: "20%"}}></th>
                                        </tr>

                                        {
                                            ingredients && ingredients.docs && ingredients.docs.length > 0 && ingredients.docs.map(ingredient => {
                                                return <tr key={ingredient._id} className="notHeader">
                                                    <td>{toUpperCase(ingredient.name)}</td>
                                                    <td>{ingredient.quantity}</td>
                                                    <td>{ingredient.purchase_quantity.unit.name} ({ingredient.purchase_quantity.unit.abbreviation})</td>
                                                    <td>{getAmount(ingredient.totalCost)}</td>
                                                    <td className="tabbedListContentHorizontalTableContent">
                                                        <button style={{marginLeft: "16px"}} onClick={e => openEditRecipeIngredient(e, ingredient)} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                        <button style={{marginLeft: "16px"}} onClick={e => showDeleteIngredient(e, ingredient)} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                    </td>
                                                </tr>
                                            })
                                            
                                        }
                                    </tbody> : <Skeleton height={70} count={6} />
                                }
                            </table>

                            {
                                (!appContext.state.isLoading && !appContext.state.isBlockingLoading && (!ingredients || !ingredients.docs || ingredients.docs.length == 0)) && <EmptyResult message="No ingredients found for this recipe" onEmptyButtonClicked={loadRecipeIngredients} emptyButtonText="Try Again" />
                            }
                        </>
                }
            </div>

        </div>

        {
            showAddIngredients && <AddIngredients units={units} recipe={recipe} loadRecipeIngredients={loadRecipeIngredients} hideAddIngredients={hideAddIngredients} />
        }

        {
            showEditRecipe && <EditRecipe hideEditRecipe={hideEditRecipe} editRecipe={editRecipe} aRecipe={recipe} />
        }

        {
            showDeleteRecipe && <DeleteDialog type={"Recipe"} onPerformDeleteClicked={deleteRecipe} onCancelDeleteClicked={hideDeleteRecipe} />
        }

        {
            showEditRecipeIngredient && <EditRecipeIngredient ingredient={entityInFocus} onPerformEditClicked={editIngredient} onCancelEditClicked={hideEditRecipeIngredient} />
        }

        {
            showDeleteRecipeIngredient && <DeleteDialog onPerformDeleteClicked={deleteIngredient} onCancelDeleteClicked={hideDeleteIngredient} type={`${entityInFocus.name} from ${recipe.name}`} />
        }

    </div>
}

export default RecipeIndex;

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