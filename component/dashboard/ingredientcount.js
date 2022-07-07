
import { useState } from "react";
import { useRouter } from "next/router"
import styles from "../../styles/Dashboard.module.css"

const IngredientCount = () => {

    const router = useRouter()

    const navigateToIngredient = () => {

        router.push("/ingredients")
    }

    const [total, setTotal] = useState(81);

    return <div onClick={navigateToIngredient} className={`whiteBox ${styles.ingredientsNumbersHolder}`}>
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