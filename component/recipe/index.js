
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

const RecipeIndex = () => {

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selected, setSelected] = useState(1)

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

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <h2 className="pageTitle">Recipe</h2>
            <div>
                <h4>Ingredients - 10</h4>
            </div>
            <div>
                <button className="colorWhite secondaryButton">Edit</button>
                <button onClick={showAddIngredientsModal} className="colorWhite primaryButton">Add Ingredient</button>
                <button className="greyButton">Delete</button>
            </div>
        </div>

        <div>
            <h4>Description -</h4>
        </div>
        <div>
            <h4>Category - Pastry</h4>
        </div>
        
        <div className={styles.recipeContentHolder}>
            <div className={styles.recipeContentHolderTopContent}>
                <div onClick={e => switchSelected(e, 1)} className={`${styles.recipeContentHolderTopContentDetails} ${selected == 1 ? styles.selected : ""}`}>
                    <h4>Details</h4>
                </div>
                <div onClick={e => switchSelected(e, 2)} className={selected == 2 ? styles.selected : ""}>
                    <h4>Ingredients</h4>
                </div>
            </div>
        </div>

        <div className="pageHolderContent">
            {
                (selected == 1) ? <div className={styles.recipeDetails}>
                                    <RecipeDetails recipe={recipe} />
                                </div>
                              : <div className={styles.recipeIngredients}>
                                    <IngredientList />
                                </div>
            }
        </div>

        {
            showAddIngredients && <AddIngredients hideAddIngredientsModal={hideAddIngredientsModal} />
        }

    </div>
}

export default RecipeIndex;