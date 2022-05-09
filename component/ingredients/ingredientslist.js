
import styles from "../../styles/Ingredients.module.css"

import IngredientsItem from "./ingredientitem"

const IngredientsList = ({ingredients}) => {
    return <div className={styles.ingredientsList}>
        <div className={styles.ingredientsHolderTitle}>
            <div className={styles.ingredientName}>
                <h5>Name</h5>
            </div>
            <div className={styles.ingredientPQ}>
                <h5>Purchase Quantity</h5>
            </div>
            <div className={styles.ingredientPS}>
                <h5>Purchase Size</h5>
            </div>
            <div className={styles.ingredientPrice}>
                <h5>Price</h5>
            </div>
            <div className={styles.ingredientEdit}>
                
            </div>
            <div className={styles.ingredientDelete}>
                
            </div>
        </div>

        {
            ingredients && ingredients.map(ingredient => { 
                return <IngredientsItem key={ingredient.name} ingredient={ingredient} />
            })
        }

    </div>
}

export default IngredientsList;