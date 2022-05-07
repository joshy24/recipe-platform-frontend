import styles from "../../styles/Dashboard.module.css"

<<<<<<< HEAD
import {getDate, getAmount} from "../../utils/helper"

const RecentRecipe = ({recipe}) => {
    return <div className={`recipeBox ${styles.recentRecipeHolder}`}>
        <div className={styles.recipeName}>
            <h5 className="colorSecondary">{recipe.name}</h5>
        </div>
        <div className={styles.recipeDate}>
            <h5>{getDate(recipe.created)}</h5>
        </div>
        <div className={styles.recipeStatus}>
            <h5>{recipe.status}</h5>
        </div>
        <div className={styles.recipeIngredient}>
            <h5>{recipe.ingredients}</h5>
        </div>
        <div className={styles.recipeCost}>
            <h5>{getAmount(recipe.cost)}</h5>
        </div>
=======
const RecentRecipe = () => {
    return <div>
        <h2>Recent Recipe</h2>
>>>>>>> mofe
    </div>
}

export default RecentRecipe;