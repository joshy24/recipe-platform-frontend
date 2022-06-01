
import styles from "../../styles/Recipes.module.css"

import { useState } from "react"

import IngredientsItemToAdd from "./ingredientitemtoadd"

const ingredientsArray = [
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

const AddIngredients = ({hideAddIngredientsModal}) => {

    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [ingredients, setIngredients] = useState([...ingredientsArray])

    const selectIngredient = (ingredient) => {
        let new_arr = [...selectedIngredients];

        new_arr.includes(ingredient) ? new_arr.splice(new_arr.indexOf(ingredient), 1) : new_arr.push(ingredient)

        setSelectedIngredients(new_arr);
    }

    const editIngredient = (ingredient) => {
        let new_arr = [...selectedIngredients];

        const foundElement = new_arr.find(ele => ele._id == ingredient._id)

        new_arr.splice(new_arr.indexOf(foundElement), 1, ingredient)

        setSelectedIngredients(new_arr);
    }
 
    return <div className="popUp">
        <div className={`${styles.addIngredients} popUpInnerContent`}>
            <div className="popUpInnerContentTop">
                <h3 className="pageTitle">Select Ingredients</h3>
                
                <div>
                    <button onClick={hideAddIngredientsModal} style={{marginRight: "16px"}} className={selectedIngredients.length > 0 ? "primaryButton" : "greyButton"}>
                        Save
                    </button>

                    <button onClick={hideAddIngredientsModal} className="greyButton">
                        Cancel
                    </button>
                </div>
            </div>

            <div className={styles.ingredientsList}>
                <div className={styles.ingredientsHolderTitleToAdd}>
                    <div className={styles.ingredientSelectAdd}>
                        <h5></h5>
                    </div>
                    <div className={styles.ingredientNameAdd}>
                        <h5>Name</h5>
                    </div>
                    <div className={styles.ingredientPQAdd}>
                        <h5>Quantity</h5>
                    </div>
                    <div className={styles.ingredientPSAdd}>
                        <h5>Purchase Size</h5>
                    </div>
                    <div className={styles.ingredientPriceAdd}>
                        <h5>Price</h5>
                    </div>
                </div>

                {
                    ingredients && ingredients.map(ingredient => { 
                        return <IngredientsItemToAdd editIngredient={editIngredient} selectIngredient={selectIngredient} selectedIngredients={selectedIngredients} key={ingredient.name} ingredient={ingredient} />
                    })
                }
            </div>
            
        </div>
    </div>

}

export default AddIngredients;