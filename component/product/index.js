
import { useState } from "react";
import styles from "../../styles/Products.module.css"

//import IngredientList from "./ingredientlist"

//import RecipeDetails from "./details"

//import AddIngredients from "./addingredients"

import Image from "next/image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'


const DetailsTab = "Details"
const RecipesTab = "Recipes"
const MaterialsTab = "Materials"


const ProductIndex = () => {

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)
    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
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

    const loadProduct = () => {

    }

    const loadProductRecipes = () => {

    }

    const loadProductMaterials = () => {

    }

    const showSkeletonLoaders = () => {

    }

    const hideSkeletonLoaders = () => {

    }

    const showEditProduct = () => {

    }

    const hideEditProduct = () => {

    }

    const editProduct = async () => {

    }

    const showAddRecipe = () => {

    }

    const hideAddRecipe = () => {

    }

    const showAddMaterial = () => {

    }

    const hideAddMaterial = () => {

    }

    const showDeleteProduct = () => {

    }

    const hideDeleteProduct = () => {

    }

    const deleteProduct = async () => {

    }

    const showEditProductRecipe = () => {

    }

    const hideEditProductRecipe = () => {

    }

    const editProductRecipe = async () => {

    }

    const showDeleteProductRecipe = () => {

    }

    const hideDeleteProductRecipe = () => {

    }

    const deleteProductRecipe = async () => {

    }





    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div className="pageHolderContentTopLeft">
                <h2 className="pageTitle">Product - <span className="pageTitleContentHeader">Pancake</span></h2>

                <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                    What are Products? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                </h5>

                {
                    whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                        <h6 className="whatIsContent tinyPadding">product is an object, or system, or service made available for consumer use to satisfy the desire or need of a customer.</h6>
                        <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                    </div>
                }
            </div>

            <div className="pageHolderContentTopCenter">
                <div>
                    <h4>Recipes</h4>
                    <h5>4</h5>
                </div>

                <div>
                    <h4>Materials</h4>
                    <h5>6</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={showAddIngredientsModal} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Recipe</button>
                <button onClick={showAddIngredientsModal} className="rectangleButtonPrimary"><FontAwesomeIcon style={{marginRight: "4px"}} icon={faAdd} /> Material</button>
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTabsHolder">
                <div onClick={e => switchSelectedTab(e, DetailsTab)} className={`${selectedTab == DetailsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Details</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, RecipesTab)} className={`${selectedTab == RecipesTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Recipes</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, MaterialsTab)} className={`${selectedTab == MaterialsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Materials</h5>
                </div>
            </div>

            <div className="tabbedListTableHolder"> 
                {
                    selectedTab == DetailsTab ? 
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="notHeader" style={{marginBottom: "24px"}}>
                            <th style={{width: "24%"}}>Profit Margin</th>
                            <th style={{width: "18%"}}>10%</th>
                            <th style={{width: "58%"}}><button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></th>
                        </tr>
                        <tr className="notHeader">
                            <td>Total Price of Recipes</td>
                            <td>#30,000</td>
                            <td></td>
                        </tr>
                        
                        <tr className="notHeader">
                            <td>Total Cost Price</td>
                            <td>#32,000</td>
                            <td></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Labour Cost</td>
                            <td>#10,000</td>
                            <td><button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Overhead Cost</td>
                            <td>#50,000</td>
                            <td><button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Actual Selling Price</td>
                            <td>#58,000</td>
                            <td><button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button></td>
                        </tr>
                        <tr className="notHeader">
                            <td>Proposed Selling Price</td>
                            <td>#60,000</td>
                            <td></td>
                        </tr>
                    </table> :  selectedTab == RecipesTab ? <table className="tabbedListTable" style={{width: "100%"}}>
                                    <tr className="header" style={{marginBottom: "24px"}}>
                                        <th style={{width: "20%"}}>Name</th>
                                        <th style={{width: "20%"}}>Amount</th>
                                        <th style={{width: "20%"}}>Cost</th>
                                        <th style={{width: "20%"}}>Unit</th>
                                        
                                        <th style={{width: "20%"}}></th>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Shawarma</td>
                                        <td>1</td>
                                        <td>#800</td>
                                        <td>Kg</td>
                                        
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Kebab</td>
                                        <td>1</td>
                                        <td>#150</td>
                                        <td>Kg</td>
                                        
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Giz Dodo</td>
                                        <td>1</td>
                                        <td>#400</td>
                                        <td>Kg</td>
                                        
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Milk Bar</td>
                                        <td>1</td>
                                        <td>#600</td>
                                        <td>Kg</td>
                                        
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="header">
                                        <td></td>
                                        <td></td>
                                        <td><b>#20,000</b></td>
                                        <td></td>
                                        
                                        <td className="tabbedListContentHorizontalTableContent"></td>
                                    </tr>
                                </table> : <table className="tabbedListTable" style={{width: "100%"}}>
                                    <tr className="header" style={{marginBottom: "24px"}}>
                                        <th style={{width: "20%"}}>Name</th>
                                        <th style={{width: "20%"}}>Quantity</th>
                                        <th style={{width: "20%"}}>Unit</th>
                                        <th style={{width: "20%"}}>Price</th>
                                        <th style={{width: "20%"}}></th>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Shawarma</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#800</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Kebab</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#150</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Giz Dodo</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#400</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="notHeader">
                                        <td>Milk Bar</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#600</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr className="header">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><b>#35,000</b></td>
                                        <td className="tabbedListContentHorizontalTableContent"></td>
                                    </tr>
                                </table>
                }
            </div>

        </div>

        {
            showAddIngredients && <AddIngredients hideAddIngredientsModal={hideAddIngredientsModal} />
        }

    </div>
}

export default ProductIndex;