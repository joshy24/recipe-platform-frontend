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

import AppContext from "../../pages/AppContext";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, INGREDIENTS_TO_ADD, ADD_INGREDIENTS_TO_RECIPE_URL } from "../../utils/api.endpoints"

const AddIngredients = ({hideAddIngredients, loadRecipeIngredients, recipe}) => {

    const value = useContext(AppContext);
    
    const [ingredients, setIngredients] = useState([])

    const [selectedIngredients, setSelectedIngredients] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState("")

    useEffect(() => {
        getIngredientsToAdd()
    }, [])

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
        setIsLoading(true)

        try{
            const result = await getRequest(INGREDIENTS_TO_ADD+"?recipe_id="+recipe._id)

            const new_result = result.response.map(ingredient => {
                return {...ingredient, quantity: 0}
            })

            setIngredients(new_result)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
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
            value.setBlockingLoading(true)

            setError("")
           
            try{
                const response = await postRequest(ADD_INGREDIENTS_TO_RECIPE_URL, {id: recipe._id, ingredients: selectedIngredients})

                value.setBlockingLoading(false)

                loadRecipeIngredients()

                hideAddIngredients()
            }
            catch(err){
                console.log(err)
                value.setBlockingLoading(false)
            }
        }
        else{
            if(ingredients.length > 0){
                setError("Add ingredients to recipe by clicking/tapping the add button")
            }
        }
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Ingredients to {recipe.name}</h4>
                    <h5 style={mediumTextStyle}>Select ingredients to add</h5>
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
                    !isLoading ? 
                        <>
                            {
                                ingredients && ingredients.length > 0 ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Name</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Quantity</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Size</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Price</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Quantity To Add</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Total Cost</th>
                                    <th style={{width: "16%", paddingLeft: "20px"}}></th>
                                </tr>
                                {
                                    ingredients.map(ingredient => {
                                        return <IngredientToAdd addToSelected={addIngredientToSelected} ingredient={ingredient} onChange={onChange} selectedIngredients={selectedIngredients} />
                                    })
                                }
                            </tbody>

                                : <EmptyResult  message={"No Ingredients found to add. Add ingredients to inventory"} onEmptyButtonClicked={getIngredientsToAdd} emptyButtonText={"Try Again"} />
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