import { useState } from "react"

import styles from "../../styles/Orders.module.css"

import { useRouter } from "next/router"

import {getDate, getAmount} from "../../utils/helper"

import DeleteDialog from "../general/deletedialog"

const RecipesItem = ({recipe}) => {
    
    const router = useRouter()

    const navigateToRecipe = () => {

        router.push("/recipe")
    }

    const [showDelete, setShowDelete] = useState(false)

    const showDeleteDialog = () => {
        setShowDelete(true)
    }

    const onPerformDeleteClicked = () => {
        setShowDelete(false);
    }

    const onCancelDeleteClicked = () => {
        setShowDelete(false);
    }

    return <>
        <div className={`whiteBox ${styles.recipeItemHolder}`}>
       
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
            <div onClick={navigateToRecipe} className={styles.recipeView}>
                <button className="colorWhite primaryButton">View</button>
            </div>
            <div onClick={showDeleteDialog} className={styles.recipeDelete}>
                <button className="button greyButton colorBlack">Remove</button>
            </div>
        </div>
        {
            showDelete && <DeleteDialog onPerformDeleteClicked={onPerformDeleteClicked} onCancelDeleteClicked={onCancelDeleteClicked} type={"Recipe"} message={"Confirm that you want to delete this recipe."}  />
        }

    </>
}

export default RecipesItem;