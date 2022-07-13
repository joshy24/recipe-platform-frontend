
import styles from "../../styles/Orders.module.css"

import RecipesItem from "./recipesitem"

const recipes = [
    {
        _id: 1,
        name: "Pancake",
        purchase_quantity: 3,
        total_cost: 200,
    },
    {
        _id: 2,
        name: "Shawarma",
        purchase_quantity: 2,
        total_cost: 500,
    },
    {
        _id: 3,
        name: "Ice Cream",
        purchase_quantity: 10,
        total_cost: 2000,
    },
    {
        _id: 4,
        name: "Fruit Salad",
        purchase_quantity: 1,
        total_cost: 650,
    }
]

const RecipesItemList = () => {
    return <div className={styles.recipesList}>
        <div className={styles.recipesHolderTitle}>
            <div className={styles.recipeName}>
                <h5>Name</h5>
            </div>
            <div className={styles.recipePQ}>
                <h5>Quantity</h5>
            </div>
            <div className={styles.recipeCost}>
                <h5>Total cost</h5>
            </div>
            <div className={styles.recipeEdit}>
                
            </div>
            <div className={styles.recipeEdit}>
                
            </div>
            <div className={styles.recipeDelete}>
                
            </div>
        </div>

        {
            recipes && recipes.map(recipe => { 
                return <RecipesItem key={recipe.name} recipe={recipe} />
            })
        }

    </div>
}

export default RecipesItemList;