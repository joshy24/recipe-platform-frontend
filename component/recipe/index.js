
import { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router"

import AddIngredients from "./addingredients"

import EditRecipe from "./editrecipe"

import DeleteDialog from "../general/deletedialog"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import { toUpperCase, getAmount } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import AppContext from "../../pages/AppContext";

import EmptyResult from "../general/emptyResult"

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import { BASE_URL, GET_RECIPE, ALL_RECIPE_INGREDIENTS_URL, EDIT_RECIPE_URL, DELETE_RECIPE_URL } from "../../utils/api.endpoints"

const get_recipe_url = BASE_URL + GET_RECIPE

const DetailsTab = "Details"
const IngredientsTab = "Ingredients"

const RecipeIndex = ({id}) => {

    const router = useRouter();

    const value = useContext(AppContext);

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)

    const [recipe, setRecipe] = useState({})

    const [showEditRecipe, setShowEditRecipe] = useState(false)

    const [showDeleteRecipe, setShowDeleteRecipe] = useState(false)

    const [ingredients, setIngredients] = useState([])

    const [pagination, setPagination] = useState({offset: 0, limit: 30})

    useEffect(() => {
        loadRecipe()

        loadRecipeIngredients()
    }, [])

    
    const switchSelectedTab = (e, tab) => {
        e.preventDefault()
        setSelectedTab(tab)
    }

    

    /*
    New functions
    */

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
        value.setLoading(true)
        try{
            const result = await getRequest(ALL_RECIPE_INGREDIENTS_URL+`?id=${id}&offset=${pagination.offset}&limit=${pagination.limit}`)

            setIngredients(result.response)

            value.setLoading(false)

            getRecipeCost()
        }
        catch(err){
            console.log(err)
            value.setLoading(false)
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
        value.setBlockingLoading(true)
        try{
            const result = await putRequest(EDIT_RECIPE_URL, {...recipe, ...editedRecipe})

            console.log(result)

            hideEditRecipe()

            loadRecipe()

            value.setBlockingLoading(false)
        }
        catch(err){
            console.log(err)
            value.setMessage({visible: true, message: "Could not edit recipe successfully", title: "Message", type: "ERROR"})

            value.setBlockingLoading(false)
        }
    }

    const showEditIngredient = () => {
        
    }

    const editIngredient = async () => {
        
    }

    const hideEditIngredient = () => {

    }

    const openDeleteRecipe = () => {
        setShowDeleteRecipe(true)
    }

    const hideDeleteRecipe = () => {
        setShowDeleteRecipe(false)
    }

    const deleteRecipe = async () => {

        value.setBlockingLoading(true)

        try{
            await deleteRequest(DELETE_RECIPE_URL, {id: id})

            value.setBlockingLoading(false)

            router.push("/recipes")
        }
        catch(err){
            value.setBlockingLoading(false)
        }
    }

    const showDeleteIngredient = () => {
        
    }

    const hideDeleteIngredient = () => {
        
    }

    const deleteIngredient = async () => {
        
    }

    const getRecipeCost = () => {
        if(!ingredients || ingredients.length == 0){
            return getAmount(0);
        }

        const aSum = ingredients.reduce((accumulator, ingredient) => {
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

                <h5>
                    Category - <span></span>
                </h5>
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
                                <h5>{recipe && recipe.yield && recipe.yield.amount} {recipe && recipe.yield && recipe.yield.unit} {!recipe || !recipe.yield && 0}</h5>
                                <button style={{marginLeft: "16px"}} onClick={openEditRecipe} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td>Category</td>
                            <td></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Total Cost</td>
                            <td>{getRecipeCost()}</td>
                        </tr>
                    </table> : 
                        <>
                            <table className="tabbedListTable" style={{width: "100%"}}>      
                                {
                                    !value.state.isLoading ? <tbody>
                                        <tr className="header" style={{marginBottom: "24px"}}>
                                            <th style={{width: "20%"}}>Name</th>
                                            <th style={{width: "20%"}}>Quantity</th>
                                            <th style={{width: "20%"}}>Unit</th>
                                            <th style={{width: "20%"}}>Cost</th>
                                            <th style={{width: "20%"}}></th>
                                        </tr>

                                        {
                                            ingredients && ingredients.length > 0 && ingredients.map(ingredient => {
                                                return <tr className="notHeader">
                                                    <td>{toUpperCase(ingredient.name)}</td>
                                                    <td>{ingredient.quantity}</td>
                                                    <td>{ingredient.purchase_size}</td>
                                                    <td>{getAmount(ingredient.totalCost)}</td>
                                                    <td className="tabbedListContentHorizontalTableContent">
                                                        <button style={{marginLeft: "16px"}} onClick={openEditRecipe} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                        <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                    </td>
                                                </tr>
                                            })
                                            
                                        }
                                    </tbody> : <Skeleton height={70} count={6} />
                                }
                            </table>

                            {
                                (!value.state.isLoading && !value.state.isBlockingLoading && (!ingredients || ingredients.length == 0)) && <EmptyResult message="No ingredients found for this recipe" onEmptyButtonClicked={loadRecipeIngredients} emptyButtonText="Try Again" />
                            }
                        </>
                }
            </div>

        </div>

        {
            showAddIngredients && <AddIngredients recipe={recipe} loadRecipeIngredients={loadRecipeIngredients} hideAddIngredients={hideAddIngredients} />
        }

        {
            showEditRecipe && <EditRecipe hideEditRecipe={hideEditRecipe} editRecipe={editRecipe} aRecipe={recipe} />
        }

        {
            showDeleteRecipe && <DeleteDialog type={"Recipe"} onPerformDeleteClicked={deleteRecipe} onCancelDeleteClicked={hideDeleteRecipe} />
        }

    </div>
}

export default RecipeIndex;