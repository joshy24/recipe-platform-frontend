
import styles from "../../styles/Recipes.module.css"

import {getDate, getAmount} from "../../utils/helper"

const IngredientsItem = ({ingredient}) => {
    return <div className={`whiteBox ${styles.ingredientItemHolder}`}>
       
            <div className={styles.ingredientName}>
                <h5>{ingredient.name}</h5>
            </div>
            <div className={styles.ingredientPQ}>
                <h5>{ingredient.purchase_quantity}</h5>
            </div>
            <div className={styles.ingredientPS}>
                <h5>{ingredient.purchase_size}</h5>
            </div>
            <div className={styles.ingredientPrice}>
                <h5>{getAmount(ingredient.price)}</h5>
            </div>
            <div className={styles.ingredientEdit}>
                <button className="button secondaryButton colorWhite">Edit</button>
            </div>
            <div className={styles.ingredientDelete}>
                <button className="button greyButton colorBlack">Remove</button>
            </div>
    </div>
}

export default IngredientsItem;