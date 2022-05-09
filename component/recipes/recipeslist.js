
import styles from "../../styles/Recipes.module.css"

import RecipeItem from "./recipeitem"

const today = new Date();

const recipes = [{
    name: "Shawarma",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    tcost: 500,
    date: "December 17, 2022 03:24:00",
    lcost: 25000,
    ingredients: 8
},{
    name: "Spag",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    tcost: 500,
    date: "December 17, 2022 03:24:00",
    lcost: 25000,
    ingredients: 8
},{
    name: "Meatpie",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    tcost: 500,
    date: "December 17, 2022 03:24:00",
    lcost: 25000,
    ingredients: 8
}]

const RecipesList = () => {
    return <div className={styles.recipesListHolder}>

        <div className={styles.recipesListHolderTitle}>
            <div className={styles.recipeName}>
                <h5>Name</h5>
            </div>
            <div className={styles.recipeDate}>
                <h5>Date<br />Created</h5>
            </div>
            <div className={styles.recipeStatus}>
                <h5>Status</h5>
            </div>
            <div className={styles.recipeTotalCost}>
                <h5>Total<br />cost</h5>
            </div>
            <div className={styles.recipeFulfilled}>
                <h5>Fulfillment<br />date</h5>
            </div>
            <div className={styles.recipeLabourCost}>
                <h5>Labour<br />cost</h5>
            </div>
            <div className={styles.recipeIngredientCount}>
                <h5>Ingredient<br />count</h5>
            </div>
        </div>

        {
            recipes && recipes.map(recipe => { 
                return <RecipeItem key={recipe.name} recipe={recipe} />
            })
        }


    </div>
}

export default RecipesList;