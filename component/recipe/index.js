
import { useState } from "react";
import styles from "../../styles/Recipes.module.css"

import IngredientList from "./ingredientlist"

import RecipeDetails from "./details"

import AddIngredients from "./addingredients"

const recipe = {
    name: "Fufu",
    created: "December 10, 2022 03:24:00",
    total_cost: 8000
}

const DetailsTab = "Details"
const IngredientsTab = "Ingredients"

const RecipeIndex = () => {

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)

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

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div>
                <h2 className="pageTitle">Recipe - <span>Shawarma</span></h2>

                <h5>Description - </h5>

                <h5>Category - </h5>
            </div>

            <div>
                <h4>Total Cost</h4>
                <h5>#30,000</h5>
            </div>

            <div>
                <button className="colorWhite secondaryButton">Edit</button>
                <button onClick={showAddIngredientsModal} className="colorWhite primaryButton">Add Ingredient</button>
                <button className="greyButton">Delete</button>
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
                    <table className={styles.tabbedListTable} style={{width: "100%"}}>
                        <tr style={{marginBottom: "24px"}}>
                            <th style={{width: "20%"}}>Name</th>
                            <th style={{width: "80%"}}>Ife</th>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>A short description of the recipe</td>
                        </tr>
                        <tr>
                            <td>Yield</td>
                            <td> 20kg</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>Pastery</td>
                        </tr>
                        <tr>
                            <td>Total Cost</td>
                            <td>#30,000</td>
                        </tr>
                    </table> : <table className={styles.tabbedListTable} style={{width: "100%"}}>
                                    <tr style={{marginBottom: "24px"}}>
                                        <th style={{width: "20%"}}>Name</th>
                                        <th style={{width: "20%"}}>Quantity</th>
                                        <th style={{width: "20%"}}>Unit</th>
                                        <th style={{width: "20%"}}>Cost</th>
                                        <th style={{width: "20%"}}></th>
                                    </tr>
                                    <tr>
                                        <td>Shawarma</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#800</td>
                                        <td>
                                            <button>

                                            </button>
                                            <button>
                                                
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kebab</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#150</td>
                                        <td>
                                            <button>

                                            </button>
                                            <button>
                                                
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Giz Dodo</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#400</td>
                                        <td>
                                            <button>

                                            </button>
                                            <button>
                                                
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Milk Bar</td>
                                        <td>1</td>
                                        <td>Kg</td>
                                        <td>#600</td>
                                        <td>
                                            <button>

                                            </button>
                                            <button>
                                                
                                            </button>
                                        </td>
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

export default RecipeIndex;