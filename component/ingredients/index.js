
import styles from "../../styles/Ingredients.module.css"

import IngredientsList from "./ingredientslist"

const ingredients = [
    {
        _id: 1,
        name: "Salt",
        purchase_quantity: 1,
        purchase_size: "kg",
        price: 200,
    },
    {
        _id: 2,
        name: "Sugar",
        purchase_quantity: 1,
        purchase_size: "g",
        price: 500,
    },
    {
        _id: 3,
        name: "Ketchup",
        purchase_quantity: 1,
        purchase_size: "cl",
        price: 2000,
    },
    {
        _id: 4,
        name: "Butter",
        purchase_quantity: 1,
        purchase_size: "g",
        price: 650,
    }
]

const IngredientsIndex = () => {
    return <div className={styles.ingredientsIndex}>
            <div className={styles.ingredientsTop}>
                <div>
                    <h2 className="pageTitle">Ingredients</h2>
                </div>
                <div className={styles.ingredientsTopRightContent}>
                    <button className="secondaryButton colorWhite">Search</button>
                    <button className="secondaryButton colorWhite">Add Ingredient</button>
                </div>
            </div>
            
            <IngredientsList ingredients={ingredients} />
    </div>
}

export default IngredientsIndex;