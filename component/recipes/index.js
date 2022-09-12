
import React, { useState,useEffect,useContext  } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import EmptyResult from "../general/emptyResult"

import Image from "next/image"

import { faAdd, faSearch, faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddRecipe from '../general/addrecipe'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import {getAmount, getDate, defaultPaginationObject } from "../../utils/helper"

import { useRouter } from "next/router"

import { AppContext } from "../../pages/AppContext";

import Pagination from "../general/pagination"

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, CREATE_RECIPE, GET_ALL_RECIPES, SEARCH_RECIPES_URL } from "../../utils/api.endpoints"

const create_recipe_url = BASE_URL + CREATE_RECIPE

const get_recipes_url = BASE_URL + GET_ALL_RECIPES

const RecipesIndex = () => {

    const appContext = AppContext()

    const router = useRouter()

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [recipes, setRecipes] = useState({})
    
    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)

    useEffect(() => {
        loadRecipes()
    }, [pagination.page])

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
        if(searchTerm && searchTerm.length > 0){
            loadRecipes()
        }

        setIsSearchOpen(false)
    }

    const searchRecipes = async (e) => {
        e.preventDefault()
        if(searchTerm && searchTerm.length > 0){
            try{
                appContext.setLoading(true)
                const result = await getRequest(SEARCH_RECIPES_URL+"?searchTerm="+searchTerm+"&page="+(pagination.page+1)+"&limit="+pagination.limit)
                appContext.setLoading(false)

                setRecipes(result.response)
            }
            catch(err){
                console.log(err)
                appContext.setLoading(false)
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    const addRecipe = async (e, data) => {
        appContext.setBlockingLoading(true)
        e.preventDefault();
        try{
            const result = await postRequest(create_recipe_url, data)

            closeAddRecipe()

            appContext.setBlockingLoading(false)

            router.push(`/recipe/${result.response._id}`)
        }
        catch(err){
            console.log(err)
            appContext.setBlockingLoading(false)
            appContext.setMessage({visible: true, message: "Could not create recipe...", title: "Message", type: "ERROR"})
        }
    }

    const loadRecipes = async () => {
        appContext.setLoading(true)
        
        try{
            const url = get_recipes_url+"?limit="+pagination.limit+"&page="+(pagination.page+1)

            const result = await getRequest(url)

            setRecipes(result.response)

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)
        }
        catch(err){
            appContext.setLoading(false)
        }
    }

    const handlePageClick = async (event) => {
        setPagination({...pagination, page: event.selected})
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
                            <h6 className="whatIsContent tinyPadding">A recipe consists of ingredients (and quantity requried for each ingredient) to create individual recipes. e.g Red velvet recipe</h6>
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
                        isSearchOpen ? <SearchInput search_value={searchTerm} searchClicked={searchRecipes} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchRecipes} /> :
                        <div style={{display: "flex"}}>
                            <button onClick={showSearchRecipes} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                            <button onClick={showAddRecipe} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                        </div>
                    }
                </div>
            </div>

            <div className="pageHolderContentTopMobile">
                <div className="pageHolderContentTopTop">
                    <h2 className="pageTitle">Recipes</h2>

                    <div style={{display: "flex"}}>
                        {
                            isSearchOpen ? <SearchInput searchClicked={searchRecipes} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchRecipes} /> :
                            <div style={{display: "flex"}}>
                                <button onClick={showSearchRecipes} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                                <button onClick={showAddRecipe} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                            </div>
                        }
                    </div>
                </div>

                <div className="pageHolderContentMiddle">
                    <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                        What are Recipes? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                    </h5>

                    {
                        whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                            <h6 className="whatIsContent tinyPadding">A recipe consists of ingredients (and quantity requried for each ingredient) to create individual recipes. e.g Red velvet recipe</h6>
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                        </div>
                    }
                </div>
                
                <div className="pageHolderContentTopBottom">
                    <h4>Total</h4>
                    <h5>{recipes ? recipes.totalDocs : 0}</h5>
                </div>
            </div>

            <div className="tabbedListMainHolder">
                
                <div className="largeTopMargin">
                    {
                        recipes && recipes.docs && <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick} currentPage={pagination.page} />
                    }
                </div>

                <div className="tabbedListTableHolder">
                    {
                            !appContext.state.isLoading ? 
                        <table className="tabbedListTable" style={{width: "100%"}}>

                            <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "31%"}}>Name</th>
                                    <th style={{width: "23%"}}>Created</th>
                                    <th style={{width: "23%"}}>Total cost</th>
                                </tr>

                                {
                                    recipes && recipes.docs && recipes.docs.length > 0 && recipes.docs.map(recipe => {
                                        return <tr key={recipe._id} onClick={e => navigateToRecipe(e, recipe._id)} className="notHeader">
                                                    <td >{recipe.name}</td>
                                                    <td >{getDate(recipe.created)}</td>
                                                    <td >{getAmount(recipe.totalCost)}</td>
                                                </tr>
                                    })
                                }

                            </tbody>
                        </table>
                        : <div className="skeletonHolder">
                            <Skeleton count={8} height={50} />
                        </div>
                    }

                    {             
                        (recipes && recipes.docs && recipes.docs.length==0) && !appContext.state.isLoading && <EmptyResult message="No recipes found" onEmptyButtonClicked={loadRecipes} emptyButtonText="Reload" />    
                    }

                </div>

                {
                    recipes && recipes.docs && <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick} currentPage={pagination.page} />
                }

            </div>
        </div>

        {
            showAdd && <AddRecipe closeAddRecipe={closeAddRecipe} addRecipe={addRecipe} />
        }
        </>
    )
}

export default RecipesIndex;


           
            
           
