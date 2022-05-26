
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css"

const RecipeCount = () => {

    const [total, setTotal] = useState(9);

    return <div className={`whiteBox ${styles.recipesNumbersHolder}`}>
        <div className={styles.recipesNumbersHolderTitle}>
            <h3 className="colorPrimary">Recipes</h3>
        </div>
        <hr />
        <div className={styles.recipesNumbersHolderContent}>
            <h4>Total - {total}</h4>
        </div>
    </div>
}

export default RecipeCount;