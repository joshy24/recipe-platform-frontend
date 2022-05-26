
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css"

const OrderNumbers = () => {

    const [numbers, setNumbers] = useState({pending: 3, fulfilled: 0, total: 3});
    
    return <div className={`whiteBox ${styles.ordersNumbersHolder}`}>
        <div className={styles.ordersNumbersHolderTitle}>
            <h3 className="colorPrimary">Orders</h3>
        </div>
        <hr/>
        <div className={styles.ordersNumbersHolderContent}>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Pending</h5>
                <h4>{numbers.pending}</h4>
            </div>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Fulfilled</h5>
                <h4>{numbers.fulfilled}</h4>
            </div>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Total</h5>
                <h4>{numbers.total}</h4>
            </div>
        </div>
    </div>
}

export default OrderNumbers;