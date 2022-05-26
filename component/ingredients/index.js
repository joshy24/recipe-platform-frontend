
import styles from "../../styles/Ingredients.module.css"

import IngredientsList from "./ingredientslist"

import AddIngredient from "../general/addingredient"

import DeleteDialog from "../general/deletedialog"

import { useState } from "react"

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

    const [showAdd, setShowAdd] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const showAddIngredient = () => {
        setShowAdd(true)
    }

    const closeAddIngredient = () => {
        setShowAdd(false)
    }
    
    const onPerformDeleteClicked = () => {
        setShowDelete(false);
    }

    const onCancelDeleteClicked = () => {
        setShowDelete(false);
    }

    return <>
        <div className={styles.ingredientsIndex}>
                <div className={styles.ingredientsTop}>
                    <div>
                        <h2 className="pageTitle">Ingredients</h2>
                    </div>
                    <div className={styles.ingredientsTopRightContent}>
                        <button className="secondaryButton colorWhite">Search</button>
                        <button onClick={showAddIngredient} className="secondaryButton colorWhite">Add Ingredient</button>
                    </div>
                </div>
                
                <IngredientsList setShowDelete={setShowDelete} ingredients={ingredients} />
        </div>

        {
            showAdd && <AddIngredient closeAddIngredient={closeAddIngredient} />
        }

        {
            showDelete && <DeleteDialog onPerformDeleteClicked={onPerformDeleteClicked} onCancelDeleteClicked={onCancelDeleteClicked} type={"Ingredient"} message={"Confirm that you want to remove this ingredient. It will also be removed from all recipes it is attached to."}  />
        }

    </>
}

export default IngredientsIndex;