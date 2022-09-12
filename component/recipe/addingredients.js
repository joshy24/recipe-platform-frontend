import { useEffect, useState, useContext } from "react"

import EmptyResult from "../general/emptyResult"

import IngredientToAdd from "./ingredientsToAdd"

const BigTextStyle = {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "15px",
    color: "#4D4D4C"
}

const mediumTextStyle = {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "15px",
    color: "#4D4D4C",
    marginTop: "12px"
}

import { AppContext } from "../../pages/AppContext";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import { postRequest, getRequest } from "../../utils/api.requests"

import { INGREDIENTS_TO_ADD, ADD_INGREDIENTS_TO_RECIPE_URL } from "../../utils/api.endpoints"

import { defaultPaginationObject } from "../../utils/helper"

const AddIngredients = ({hideAddIngredients, loadRecipeIngredients, recipe}) => {

    const appContext = AppContext();
    
    const [ingredients, setIngredients] = useState({})

    const [selectedIngredients, setSelectedIngredients] = useState([])

    const [error, setError] = useState("")

    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getIngredientsToAddSearch()
    }, [pagination.page])

    const onChange = (e, ingredient) => {
        const value = e.target.value

        ingredient.quantity = value

        const foundIndex = ingredients.findIndex(aIngredient => aIngredient._id == ingredient._id)

        if(foundIndex != -1){
            const sm = selectedIngredients

            sm.splice(foundIndex,1,ingredient)

            setIngredients(sm)
        }
    }

    const getIngredientsToAdd = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(INGREDIENTS_TO_ADD+"?recipe_id="+recipe._id)

            const new_result = result.response.map(ingredient => {
                return {...ingredient, quantity: 0}
            })

            setIngredients(new_result)

            appContext.setLoading(false)
        }
        catch(err){
            appContext.setLoading(false)
            console.log(err)
        }
    }

    const emptySearchAndGetIngredients = async() => {
        setSearchTerm("")

        appContext.setLoading(true)

        try{
            const result = await getRequest(INGREDIENTS_TO_ADD+"?recipe_id="+recipe._id+"&search_term="+"&page="+pagination.page+"&limit="+pagination.limit)

            const new_result = result.response.map(ingredient => {
                return {...ingredient, quantity: 0}
            })

            setIngredients(new_result)

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const getIngredientsToAddSearch = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(INGREDIENTS_TO_ADD+"?recipe_id="+recipe._id+"&search_term="+searchTerm+"&page="+pagination.page+"&limit="+pagination.limit)

            const new_result = result.response.docs.map(ingredient => {
                return {...ingredient, quantity: 0}
            })

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            setIngredients({...result.response, docs: new_result})

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const addIngredientToSelected = (ingredient) => {
        setError("")
        
        const sm = selectedIngredients;

        const foundIndex = selectedIngredients.findIndex(aIngredient => aIngredient.ingredient == ingredient._id)

        if(foundIndex == -1){
            sm.push({
                ingredient: ingredient._id,
                quantity: ingredient.quantity
            })
        }
        else{
            sm.splice(foundIndex, 1)
        }

        setSelectedIngredients(sm)
    }

    const doAddIngredients = async()=>{
        if(selectedIngredients.length > 0){
            appContext.setBlockingLoading(true)

            setError("")
           
            try{
                const response = await postRequest(ADD_INGREDIENTS_TO_RECIPE_URL, {id: recipe._id, ingredients: selectedIngredients})

                appContext.setBlockingLoading(false)

                loadRecipeIngredients()

                hideAddIngredients()
            }
            catch(err){
                console.log(err)
                appContext.setBlockingLoading(false)
            }
        }
        else{
            if(ingredients.length > 0){
                setError("Add ingredients to recipe by clicking/tapping the add button")
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    const handlePageClick = async (event) => {
        setPagination({...pagination, page: event.selected})
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Ingredients to {recipe.name}</h4>
                    <h5 style={mediumTextStyle}>Select ingredients to add</h5>

                    <div style={{marginTop: "16px"}}>
                        <SearchInput search_value={searchTerm} searchClicked={getIngredientsToAddSearch} onSearchChanged={onSearchChanged} closeSearchClicked={emptySearchAndGetIngredients} />
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <button onClick={doAddIngredients} className="rectangleButtonPrimary">Save</button>
                    <button onClick={hideAddIngredients} style={{marginLeft: "16px"}} className="rectangleButtonSecondary">Close</button>
                </div>
            </div>
            <div className="popUpAddInnerContentBottom">
                <h5 className="colorOrange">{error && error.length > 0 && error}</h5>
                <table className="tabbedListTable" style={{width: "100%"}}>      
                {
                    !appContext.state.isLoading ? 
                        <>
                            {
                                ingredients && ingredients.docs && ingredients.docs.length > 0 ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Name</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Quantity</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Size</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Price</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Quantity To Add</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Quantity To Add Cost</th>
                                    <th style={{width: "16%", paddingLeft: "20px"}}></th>
                                </tr>
                                {
                                    ingredients.docs.map(ingredient => {
                                        return <IngredientToAdd addToSelected={addIngredientToSelected} ingredient={ingredient} onChange={onChange} selectedIngredients={selectedIngredients} />
                                    })
                                }
                            </tbody>

                                : <EmptyResult  message={"No Ingredients found to add. Add ingredients to inventory"} onEmptyButtonClicked={getIngredientsToAddSearch} emptyButtonText={"Try Again"} />
                            }
                        </>
                    : <Skeleton count={8} height={40} />
                }
                </table>
            </div>
        </div>
    </div>
}

export default AddIngredients;