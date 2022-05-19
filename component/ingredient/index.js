import { useState } from "react"
import styles from "../../styles/Ingredients.module.css"
import DeleteDialog from "../general/deletedialog"

import EditIngredient from "../general/editingredient"

import IngredientRecipes from "./ingredientrecipes"

const IngredientIndex = ({ingredient}) => {

    const [showEdit, setShowEdit] = useState(false)

    const [showDelete, setShowDelete] = useState(false)

    const showEditIngredient = () => {
        setShowEdit(true)
    }

    const closeEditIngredient = () => {
        setShowEdit(false)
    }

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
     <div className={"pageHolderContent"}>
        <div className={`pageHolderContentTop ${styles.ingredientpageHolderTopContent}`}>
            <div>
                <h2 className="pageTitle">Salt</h2>
            </div>
            
            <div className={styles.ingredientTopCenterContent}> 
                 <div className={`whiteBox ${styles.ingredientTopCenterContentItem}`}>
                     <h5>Purchase Quantity</h5>
                     <h4>1</h4>
                 </div>
                 <div className={`whiteBox ${styles.ingredientTopCenterContentItem}`}>
                     <h5>Purchase Size</h5>
                     <h4>kg</h4>
                 </div>
                 <div className={`whiteBox ${styles.ingredientTopCenterContentItem}`}>
                     <h5>Price</h5>
                     <h4>4,000</h4>
                 </div>
            </div>

            <div>
                <button onClick={showEditIngredient} className="secondaryButton colorWhite">
                    Edit
                </button>
                <button onClick={showDeleteDialog} className="greyButton">
                    Delete
                </button>
            </div>
        </div>
    </div>

    <IngredientRecipes />

    {
        showEdit && <EditIngredient ingredient={ingredient} closeEditIngredient={closeEditIngredient} />
    }

    {
            showDelete && <DeleteDialog onPerformDeleteClicked={onPerformDeleteClicked} onCancelDeleteClicked={onCancelDeleteClicked} type={"Ingredient"} message={"Confirm that you want to delete this ingredient. It will also be removed from all recipes it is attached to"}  />
    }

    </>
}

export default IngredientIndex;