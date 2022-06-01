
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css"
import { useRouter } from "next/router"

const RecipeCount = () => {

    const router = useRouter()

    const navigateToRecipe = () => {

        router.push("/recipes")
    }

    const [total, setTotal] = useState(9);

    return <div onClick={navigateToRecipe} className={`whiteBox ${styles.recipesNumbersHolder}`}>
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