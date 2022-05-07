
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css"

const RecipeNumbers = () => {

    const [numbers, setNumbers] = useState({pending: 0, fulfilled: 0, total: 0});

<<<<<<< HEAD
    return <div className={`recipeBox ${styles.recipesNumbersHolder}`}>
        <div className={styles.recipesNumbersHolderTitle}>
            <h3 className="colorPrimary">Recipes</h3>
        </div>
        <hr/>
        <div className={styles.recipesNumbersHolderContent}>
            <div className={styles.recipesNumbersHolderContentItem}>
                <h5>Pending</h5>
                <h4>{numbers.pending}</h4>
            </div>
            <div className={styles.recipesNumbersHolderContentItem}>
                <h5>Fulfilled</h5>
                <h4>{numbers.fulfilled}</h4>
            </div>
            <div className={styles.recipesNumbersHolderContentItem}>
=======
    return <div className={styles.recipesNumbersHolder}>
        <div>
            <h3>Recipes</h3>
        </div>
        <div>
            <div>
                <h5>Pending</h5>
                <h4>{numbers.pending}</h4>
            </div>
            <div>
                <h5>Fulfilled</h5>
                <h4>{numbers.fulfilled}</h4>
            </div>
            <div>
>>>>>>> mofe
                <h5>Total</h5>
                <h4>{numbers.total}</h4>
            </div>
        </div>
    </div>
}

export default RecipeNumbers;