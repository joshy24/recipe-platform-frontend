import { useState } from "react";
import { useRouter } from "next/router"
import styles from "../../styles/Dashboard.module.css"

const ProductCount = ({count = 0}) => {

    const router = useRouter()

    const navigateToProduct = () => {

        router.push("/products")
    }

    const [total, setTotal] = useState(81);

    return <div onClick={navigateToProduct} className={`whiteBox ${styles.productNumbersHolder}`}>
        <div className={styles.productNumbersHolderTitle}>
            <h3 className="colorPrimary">Product</h3>
        </div>
        <hr />
        <div className={styles.productNumbersHolderContent}>
            <h4>Total - {count}</h4>
        </div>
    </div>
}

export default ProductCount;
