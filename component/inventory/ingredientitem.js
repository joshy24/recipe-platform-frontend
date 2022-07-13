
import styles from "../../styles/Ingredients.module.css"

import {getDate, getAmount} from "../../utils/helper"

import { useRouter } from "next/router"

const IngredientsItem = ({ingredient, setShowDelete}) => {

    const removeIngredient = () => {
        setShowDelete(true);
    }

    const router = useRouter()

    const navigateToIngredient = () => {

        router.push("/ingredient/1")
    }

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
            <div onClick={navigateToIngredient} className={styles.ingredientEdit}>
                <button className="button secondaryButton colorWhite">Edit</button>
            </div>
            <div className={styles.ingredientDelete}>
                <button onClick={removeIngredient} className="button greyButton colorBlack">Remove</button>
            </div>
    </div>
}

export default IngredientsItem;