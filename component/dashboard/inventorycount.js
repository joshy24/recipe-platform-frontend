import { useState } from "react";
import { useRouter } from "next/router"
import styles from "../../styles/Dashboard.module.css"

const InventoryCount = ({count}) => {

    const router = useRouter()

    const navigateToInventory = () => {

        router.push("/inventory")
    }

    const [total, setTotal] = useState(81);

    return <div onClick={navigateToInventory} className={`whiteBox ${styles.inventoryNumbersHolder}`}>
        <div className={styles.inventoryNumbersHolderTitle}>
            <h3 className="colorPrimary">Inventory</h3>
        </div>
        <hr />
        <div className={styles.inventoryNumbersHolderContent}>
            <h4>Total - {count}</h4>
        </div>
    </div>
}

export default InventoryCount;
