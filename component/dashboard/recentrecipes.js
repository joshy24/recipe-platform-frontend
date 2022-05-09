
import styles from "../../styles/Dashboard.module.css"

import RecentRecipe from "./recentrecipe"

const today = new Date();

const recipes = [{
    name: "Fufu",
    created: "December 17, 2022 03:24:00",
    status: "pending", 
    ingredients: 1,
    cost: 500
},{
    name: "Cake",
    created: "December 17, 2022 03:24:00",
    status: "pending", 
    ingredients: 12,
    cost: 40000
},{
    name: "Shawarma",
    created: "December 17, 2022 03:24:00",
    status: "pending", 
    ingredients: 8,
    cost: 25000
}]

const RecentRecipes = () => {
    return <div className={styles.recentRecipesHolder}>
        <h2 className="colorPrimary">Recent Recipes</h2>

        <div className={styles.recentRecipeHolderTitle}>
            <div className={styles.recipeName}>
                <h5>Name</h5>
            </div>
            <div className={styles.recipeDate}>
                <h5>Created</h5>
            </div>
            <div className={styles.recipeStatus}>
                <h5>Status</h5>
            </div>
            <div className={styles.recipeIngredient}>
                <h5>Ingredients</h5>
            </div>
            <div className={styles.recipeCost}>
                <h5>Total Cost</h5>
            </div>
        </div>

        {
            recipes && recipes.map(recipe => { 
                return <RecentRecipe key={recipe.name} recipe={recipe} />
            })
        }
        
    </div>
}

export default RecentRecipes;

/*
{
            recipes && recipes.map(recipe => {
                return <RecentRecipe key={recipe.name} recipe={recipe} />
            })
        }
*/
