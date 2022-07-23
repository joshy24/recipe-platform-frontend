
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css"
import { useRouter } from "next/router"

const OrderNumbers = ({count}) => {

    const router = useRouter()

    const navigateToOrder = () => {

        router.push("/orders")
    }

    const [numbers, setNumbers] = useState({pending: 3, fulfilled: 0, total: 3});
    
    return <div onClick={navigateToOrder} className={`whiteBox ${styles.ordersNumbersHolder}`}>
        <div className={styles.ordersNumbersHolderTitle}>
            <h3 className="colorPrimary">Orders</h3>
        </div>
        <hr/>
        <div className={styles.ordersNumbersHolderContent}>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Pending</h5>
                <h4>{count}</h4>
            </div>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Fulfilled</h5>
                <h4>{numbers.fulfilled}</h4>
            </div>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Total</h5>
                <h4>{count}</h4>
            </div>
        </div>
    </div>
}

export default OrderNumbers;