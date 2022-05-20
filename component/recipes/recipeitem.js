import styles from "../../styles/Recipes.module.css"

import { useRouter } from "next/router"

import {getDate, getAmount} from "../../utils/helper"

const RecipeItem = ({recipe}) => {

    const router = useRouter()

    const navigateToRecipe = () => {

        router.push("/recipe")
    }
    return <div onClick={navigateToRecipe} className={`whiteBox ${styles.recipeItemHolder}`}>
        <div className={styles.recipeName}>
            <h5 className="colorSecondary">{recipe.name}</h5>
        </div>
        <div className={styles.recipeDate}>
            <h5>{getDate(recipe.created)}</h5>
        </div>
        <div className={styles.recipeStatus}>
            <h5>{recipe.status}</h5>
        </div>
        <div className={styles.recipeTotalCost}>
            <h5>{getAmount(recipe.tcost)}</h5>
        </div>
        <div className={styles.recipeFulfilled}>
            <h5>{getDate(recipe.date)}</h5>
        </div>
        <div className={styles.recipeLabourCost}>
            <h5>{getAmount(recipe.lcost)}</h5>
        </div>
        <div className={styles.recipeIngredientCount}>
            <h5>{recipe.ingredients}</h5>
        </div>
        <div className={styles.recipeIngredientDelete}>
            <button className="button greyButton colorBlack">Delete</button>
        </div>

    </div>
}

export default RecipeItem;