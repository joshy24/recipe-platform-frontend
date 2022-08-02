
import React, { useState,useEffect,useContext  } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddRecipe from '../general/addrecipe'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import {getAmount, getDate} from "../../utils/helper"

import { useRouter } from "next/router"

import AppContext from "../../pages/AppContext";

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, CREATE_RECIPE, GET_ALL_RECIPES, SEARCH_RECIPES_URL } from "../../utils/api.endpoints"

const create_recipe_url = BASE_URL + CREATE_RECIPE

const get_recipes_url = BASE_URL + GET_ALL_RECIPES

const RecipesIndex = () => {
    const value = useContext(AppContext);

    const router = useRouter()

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [recipes, setRecipes] = useState({})

    const [pagination, setPagination] = useState({offset:0, limit: 30})

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)

    useEffect(() => {
        loadRecipes()
    }, [])

    

    const navigateToRecipe = (e, id) => {
        e.preventDefault()
        router.push(`/recipe/${id}`)
    }

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const showAddRecipe = () => {
        setShowAdd(true)
    }

    const closeAddRecipe = () => {
        setShowAdd(false)
    }



    /*
    New functions
    */

    const showSearchRecipes = () => {
        setIsSearchOpen(true)
    }

    const closeSearchRecipes = () => {
        loadRecipes()
        setIsSearchOpen(false)
    }

    const searchRecipes = async (e) => {
        e.preventDefault()
        if(searchTerm && searchTerm.length > 0){
            try{
                value.setLoading(true)
                const result = await getRequest(SEARCH_RECIPES_URL+"?searchTerm="+searchTerm+"&offset="+pagination.offset+"&limit="+pagination.limit)
                value.setLoading(false)
                console.log(result.response)

                setRecipes(result.response)
            }
            catch(err){
                console.log(err)
                value.setLoading(false)
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    const addRecipe = async (e, data) => {
        e.preventDefault();
        try{
            const result = await postRequest(create_recipe_url, data)

            closeAddRecipe()

            console.log(result)

            router.push(`/recipe/${result.response._id}`)
        }
        catch(err){
            console.log(err)
        }
    }

    const loadRecipes = async () => {
        value.setLoading(true)
        
        try{
            const url = get_recipes_url+"?limit="+pagination.limit+"&offset="+pagination.offset

            const result = await getRequest(url)

            setRecipes(result.response)

            value.setLoading(false)
        }
        catch(err){
            value.setLoading(false)
        }
    }

    const showRecipes = () => {

    }

    const showDeleteRecipe = () => {

    }

    const closeDeleteRecipe = () => {

    }

    const deleteRecipe = async () => {

    }

    const showRecipeLoading = () => {

    }

    const showSkeletonLoading = () => {
        
    }

    return ( <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Recipes</h2>

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

                <div className="pageHolderContentTopCenter">
                    <div>
                        <h4>Total</h4>
                        <h5>{recipes ? recipes.totalDocs : 0}</h5>
                    </div>
                </div>

                <div className="pageHolderContentTopRight">
                    {
                        isSearchOpen ? <SearchInput searchClicked={searchRecipes} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchRecipes} /> :
                        <div style={{display: "flex"}}>
                            <button onClick={showSearchRecipes} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                            <button onClick={showAddRecipe} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                        </div>
                    }
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="tabbedListTableHolder">
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        {
                            !value.state.isLoading ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "31%"}}>Name</th>
                                    <th style={{width: "23%"}}>Created</th>
                                    <th style={{width: "23%"}}>Total cost</th>
                                </tr>

                                {
                                    recipes.docs && recipes.docs.length > 0 && recipes.docs.map(recipe => {
                                        return <tr onClick={e => navigateToRecipe(e, recipe._id)} className="notHeader">
                                                    <td >{recipe.name}</td>
                                                    <td >{getDate(recipe.created)}</td>
                                                    <td >{getAmount(recipe.totalCost)}</td>
                                                </tr>
                                    })
                                }

                                
                            </tbody>
                            : <Skeleton count={8} height={40} />
                        }
                        
                    </table>
                </div>
            </div>
        </div>

        {
            showAdd && <AddRecipe closeAddRecipe={closeAddRecipe} addRecipe={addRecipe} />
        }
        </>
    )
}

export default RecipesIndex;


           
            
           
