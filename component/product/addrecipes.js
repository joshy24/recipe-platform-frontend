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

import { defaultPaginationObject } from "../../utils/helper"

import { postRequest, getRequest } from "../../utils/api.requests"

import SearchInput from "../general/searchInput"

import { RECIPES_TO_ADD, ADD_RECIPES_TO_PRODUCT } from "../../utils/api.endpoints"

import { AppContext } from "../../pages/AppContext";


const AddRecipes = ({hideAddRecipe, loadProductRecipes, product}) => {
    const appContext = AppContext();

    const [recipes, setRecipes] = useState([])

    const [selectedRecipes, setSelectedRecipes] = useState([])

    const [error, setError] = useState("")

    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getRecipesToAddSearch()
    }, [])

    const onChange = (e, recipe) => {
        const value = e.target.value

        recipe.quantity = value

        const foundIndex = recipes.docs.findIndex(aRecipe => aRecipe._id == recipe._id)

        if(foundIndex != -1){
            const sm = selectedRecipes

            sm.splice(foundIndex,1,recipe)

            setRecipes({...recipes, docs: sm})
        }
    }

    const emptySearchAndGetRecipes = async() => {
        setSearchTerm("")

        appContext.setLoading(true)

        try{
            const result = await getRequest(RECIPES_TO_ADD+"?product_id="+product._id+"&search_term="+"&page="+pagination.page+"&limit="+pagination.limit)

            const new_result = result.response.docs.map(recipe => {
                return {...recipe, quantity: 0}
            })
            
            setRecipes({...result.response, docs: new_result})

            setPagination({...pagination, totalPagesCount: result.response.totalPages})
            
            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const getRecipesToAddSearch = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(RECIPES_TO_ADD+"?product_id="+product._id+"&search_term="+searchTerm+"&page="+pagination.page+"&limit="+pagination.limit)
            
            const new_result = result.response.docs.map(recipe => {
                return {...recipe, quantity: 0}
            })

            setRecipes({...result.response, docs: new_result})

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const addRecipesToSelected = (recipe) => {
        setError("")
        
        const sm = selectedRecipes;

        const foundIndex = selectedRecipes.findIndex(aRecipe => aRecipe.recipe == recipe._id)

        if(foundIndex == -1){
            sm.push({
                recipe: recipe._id,
                quantity: {
                    amount: recipe.quantity,
                    unit: recipe.unit
                }
            })
        }
        else{
            sm.splice(foundIndex, 1)
        }

        setSelectedRecipes(sm)
    }

    const doAddRecipes = async()=>{
        if(selectedRecipes.length > 0){
            appContext.setBlockingLoading(true)
            setError("")
           
            try{
                const response = await postRequest(ADD_RECIPES_TO_PRODUCT, {id: product._id, recipes: selectedRecipes})

                appContext.setBlockingLoading(false)

                loadProductRecipes()

                hideAddRecipe()
            }
            catch(err){
                console.log(err)
                appContext.setBlockingLoading(false)
            }
        }
        else{
            if(recipes.length > 0){
                setError("Add recipes to product by clicking/tapping the add button")
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Recipes to {product.name}</h4>
                    <h5 style={mediumTextStyle}>Select Recipes to add</h5>

                    <div style={{marginTop: "16px"}}>
                        <SearchInput search_value={searchTerm} searchClicked={getRecipesToAddSearch} onSearchChanged={onSearchChanged} closeSearchClicked={emptySearchAndGetRecipes} />
                    </div>
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
                    !appContext.state.isLoading ? 
                        <>
                            {
                                recipes && recipes.docs && recipes.docs.length > 0 ? <tbody>
                                    <tr className="header" style={{marginBottom: "24px"}}>
                                        <th style={{width: "25%", paddingLeft: "20px"}}>Name</th>
                                        <th style={{width: "25%", paddingLeft: "20px"}}>Yield</th>
                                        <th style={{width: "25%", paddingLeft: "20px"}}>Yield To Add</th>
                                        <th style={{width: "25%", paddingLeft: "20px"}}>Unit</th>
                                        <th style={{width: "25%", paddingLeft: "20px"}}></th>
                                    </tr>
                                    {
                                        recipes.docs.map(recipe => {
                                            return <RecipeToAdd addToSelected={addRecipesToSelected} recipe={recipe} onChange={onChange} selectedRecipes={selectedRecipes} />
                                        })
                                    }
                                </tbody>

                                : <EmptyResult  message={"No Recipes found to add. Add recipes on the recipes pages"} onEmptyButtonClicked={getRecipesToAddSearch} emptyButtonText={"Try Again"} />
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