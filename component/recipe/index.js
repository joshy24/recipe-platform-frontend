
import { useState, useEffect } from "react";
import styles from "../../styles/Recipes.module.css"

import IngredientList from "./ingredientlist"

import RecipeDetails from "./details"

import AddIngredients from "./addingredients"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, GET_RECIPE } from "../../utils/api.endpoints"

const get_recipe_url = BASE_URL + GET_RECIPE

const recipe = {
    name: "Fufu",
    created: "December 10, 2022 03:24:00",
    total_cost: 8000
}

const DetailsTab = "Details"
const IngredientsTab = "Ingredients"

const RecipeIndex = ({id}) => {

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)

    const [recipe, setRecipe] = useState({})

    const [ingredients, setIngredients] = useState([])

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        loadRecipe()
    }, [])

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

    

    /*
    New functions
    */

    const loadRecipe = async() => {
        try{
            const url = get_recipe_url+"/?id="+id

            const aRecipe = await getRequest(url)

            console.log(aRecipe.response)

            setRecipe(aRecipe.response);
        }
        catch(err){
            console.log(err)
        }
    }

    const showRecipesSkeleton = () => {

    }

    const hideRecipesSkeleton = () => {

    }

    const showEditRecipe = () => {

    }

    const hideEditRecipe = () => {
        
    }

    const editRecipe = async () => {

    }

    const showEditIngredient = () => {
        
    }

    const editIngredient = async () => {
        
    }

    const hideEditIngredient = () => {

    }

    const showDeleteRecipe = () => {
        
    }

    const hideDeleteRecipe = () => {
        
    }

    const deleteRecipe = async () => {
        
    }

    const showDeleteIngredient = () => {
        
    }

    const hideDeleteIngredient = () => {
        
    }

    const deleteIngredient = async () => {
        
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
                    <h5>₦0</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                <button className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
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
                                <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faRotateLeft} /></button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td>Category</td>
                            <td></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Total Cost</td>
                            <td>₦0</td>
                        </tr>
                    </table> : <table className="tabbedListTable" style={{width: "100%"}}>      
                                {
                                    !isLoading ? <tbody>
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
                                                    <td>Shawarma</td>
                                                    <td>1</td>
                                                    <td>Kg</td>
                                                    <td>#800</td>
                                                    <td className="tabbedListContentHorizontalTableContent">
                                                        <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                                        <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                    </td>
                                                </tr>
                                            })
                                            
                                        }
                                    </tbody> : <Skeleton height={70} count={6} />
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

export default RecipeIndex;