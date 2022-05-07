
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css"

const IngredientCount = () => {

    const [total, setTotal] = useState(0);

    return <div className={`recipeBox ${styles.ingredientsNumbersHolder}`}>
        <div className={styles.ingredientsNumbersHolderTitle}>
            <h3 className="colorPrimary">Ingredients</h3>
        </div>
        <hr />
        <div className={styles.ingredientsNumbersHolderContent}>
            <h4>Total - {total}</h4>
        </div>
    </div>
}

export default IngredientCount;