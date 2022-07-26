import { useEffect, useState } from "react"

import EmptyResult from "../general/emptyResult"

import RecipeToAdd from "./recipeToAdd"

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

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest } from "../../utils/api.requests"

import { RECIPES_TO_ADD, ADD_RECIPES_TO_PRODUCT } from "../../utils/api.endpoints"

const AddRecipes = ({hideAddRecipe, loadProductRecipes, product}) => {
    
    const [recipes, setRecipes] = useState([])

    const [selectedRecipes, setSelectedRecipes] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState("")

    useEffect(() => {
        getRecipesToAdd()
    }, [])

    const onChange = (e, recipe) => {
        const value = e.target.value

        recipe.quantity = value

        const foundIndex = recipes.findIndex(aRecipe => aRecipe._id == recipe._id)

        if(foundIndex != -1){
            const sm = selectedRecipes

            sm.splice(foundIndex,1,recipe)

            setRecipes(sm)
        }
    }

    const getRecipesToAdd = async() => {
        setIsLoading(true)
        try{
            const result = await getRequest(RECIPES_TO_ADD+"?product_id="+product._id)

            const new_result = result.response.map(recipe => {
                return {...recipe, quantity: 0}
            })

            console.log(new_result)

            setRecipes(new_result)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
        }
    }

    const addRecipesToSelected = (recipe) => {
        setError("")
        
        const sm = selectedRecipes;

        const foundIndex = selectedRecipes.findIndex(aRecipe => aRecipe.recipe == recipe._id)

        if(foundIndex == -1){
            sm.push({
                recipe: recipe._id,
                quantity: recipe.quantity
            })
        }
        else{
            sm.splice(foundIndex, 1)
        }

        setSelectedRecipes(sm)
    }

    const doAddRecipes = async()=>{
        if(selectedRecipes.length > 0){
            setError("")
           
            try{
                const response = await postRequest(ADD_RECIPES_TO_PRODUCT, {id: product._id, recipes: selectedRecipes})

                console.log(response)

                loadProductRecipes()

                hideAddRecipe()
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            if(recipes.length > 0){
                setError("Add recipes to product by clicking/tapping the add button")
            }
        }
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Recipes to {product.name}</h4>
                    <h5 style={mediumTextStyle}>Select Recipes to add</h5>
                </div>

                <div style={{display: "flex"}}>
                    <button onClick={doAddRecipes} className="rectangleButtonPrimary">Save</button>
                    <button onClick={hideAddRecipe} style={{marginLeft: "16px"}} className="rectangleButtonSecondary">Close</button>
                </div>
            </div>
            <div className="popUpAddInnerContentBottom">
                <h5 className="colorOrange">{error && error.length > 0 && error}</h5>
                <table className="tabbedListTable" style={{width: "100%"}}>      
                {
                    !isLoading ? 
                        <>
                            {
                                recipes && recipes.length > 0 ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "20%", paddingLeft: "20px"}}>Name</th>
                                    <th style={{width: "20%", paddingLeft: "20px"}}>Yield</th>
                                    <th style={{width: "20%", paddingLeft: "20px"}}>Cost</th>
                                    <th style={{width: "20%", paddingLeft: "20px"}}>Yield To Add</th>
                                    <th style={{width: "20%", paddingLeft: "20px"}}></th>
                                </tr>
                                {
                                    recipes.map(recipe => {
                                        return <RecipeToAdd addToSelected={addRecipesToSelected} recipe={recipe} onChange={onChange} selectedRecipes={selectedRecipes} />
                                    })
                                }
                            </tbody>

                                : <EmptyResult  message={"No Recipes found to add. Add recipes on the recipes pages"} onEmptyButtonClicked={getRecipesToAdd} emptyButtonText={"Try Again"} />
                            }
                        </>
                    : <Skeleton count={8} height={40} />
                }
                </table>
            </div>
        </div>
    </div>
}

export default AddRecipes;