
import styles from "../../styles/Orders.module.css"

import {getDate, getAmount} from "../../utils/helper"

const RecipesItem = ({recipe}) => {
    return <div className={`whiteBox ${styles.recipeItemHolder}`}>
       
            <div className={styles.recipeName}>
                <h5>{recipe.name}</h5>
            </div>
            <div className={styles.recipePQ}>
                <h5>{recipe.purchase_quantity}</h5>
            </div>
            <div className={styles.recipeCost}>
                <h5>{getAmount(recipe.total_cost)}</h5>
            </div>
            <div className={styles.recipeEdit}>
                <button className="button secondaryButton colorWhite">Edit</button>
            </div>
            <div className={styles.recipeEdit}>
                <button className="colorWhite primaryButton">View</button>
            </div>
            <div className={styles.recipeDelete}>
                <button className="button greyButton colorBlack">Remove</button>
            </div>
    </div>
}

export default RecipesItem;