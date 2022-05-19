
import { useState } from "react";
import styles from "../../styles/Recipes.module.css"

import IngredientList from "./ingredientlist"

import RecipeDetails from "./details"

const recipe = {
    name: "Fufu",
    fulfillment_date: "December 17, 2022 03:24:00",
    created: "December 10, 2022 03:24:00",
    status: "pending",
    labour_cost: 3000,
    profit: 500,
    total_cost: 8000
}

const RecipeIndex = () => {

    const [selected, setSelected] = useState(1)

    const switchSelected = (e,num) => {
        e.preventDefault();
        setSelected(num)
    }

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <h2 className="pageTitle">Recipe</h2>
            <div>
                <button className="colorWhite secondaryButton">Edit</button>
                <button className="colorWhite primaryButton">Add Ingredient</button>
                <button className="greyButton">Delete</button>
            </div>
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
    </div>
}

export default RecipeIndex;