
import React, { useState,useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddRecipe from '../general/addrecipe'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import {getDate} from "../../utils/helper"

import { useRouter } from "next/router"

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, CREATE_RECIPE, GET_ALL_RECIPES, SEARCH_RECIPES_URL } from "../../utils/api.endpoints"

const create_recipe_url = BASE_URL + CREATE_RECIPE

const get_recipes_url = BASE_URL + GET_ALL_RECIPES

const RecipesIndex = () => {
    const router = useRouter()

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [recipes, setRecipes] = useState({})

    const [isLoading, setIsLoading] = useState(true)

    const [pagination, setPagination] = useState({offset:0, limit: 30})

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [searchResult, setSearchResult] = useState([])

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
        setIsSearchOpen(false)
    }

    const searchRecipes = async () => {
        if(searchTerm && searchTerm.length > 0){
            try{
                setIsLoading(true)
                const result = await getRequest(SEARCH_RECIPES_URL+"?searchTerm="+searchTerm+"&offset="+pagination.offset+"&limit="+pagination.limit)
                setIsLoading(false)
                console.log(result)

                setSearchResult(result.response)
            }
            catch(err){
                console.log(err)
                setIsLoading(false)
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

            console.log(result)

            closeAddRecipe()

            loadRecipes();
        }
        catch(err){
            console.log(err)
        }
    }

    const loadRecipes = async () => {
        try{
            const url = get_recipes_url+"?limit="+pagination.limit+"&offset="+pagination.offset

            const result = await getRequest(url)

            console.log(result.response.docs)

            setRecipes(result.response)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
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
                            !isLoading ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "31%"}}>Name</th>
                                    <th style={{width: "23%"}}>Created</th>
                                    <th style={{width: "23%"}}>Total cost</th>
                                    <th style={{width: "23%"}}></th>
                                </tr>

                                {
                                    recipes.docs && recipes.docs.length > 0 && recipes.docs.map(recipe => {
                                        return <tr className="notHeader">
                                                    <td >{recipe.name}</td>
                                                    <td >{getDate(recipe.created)}</td>
                                                    <td >₦{0}</td>
                                                    <td className="tabbedListContentHorizontalTableContent">
                                                        <button onClick={e => navigateToRecipe(e, recipe._id)} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                                        <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                    </td>
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


           
            
           
