
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css"
import { useRouter } from "next/router"

const OrderNumbers = ({fulfilledOrdersCount, pendingOrdersCount}) => {

    const router = useRouter()

    const navigateToOrder = () => {

        router.push("/orders")
    }

    return <div onClick={navigateToOrder} className={`whiteBox ${styles.ordersNumbersHolder}`}>
        <div className={styles.ordersNumbersHolderTitle}>
            <h3 className="colorPrimary">Orders</h3>
        </div>
        <hr/>
        <div className={styles.ordersNumbersHolderContent}>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Pending</h5>
                <h4>{pendingOrdersCount}</h4>
            </div>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Fulfilled</h5>
                <h4>{fulfilledOrdersCount}</h4>
            </div>
            <div className={styles.ordersNumbersHolderContentItem}>
                <h5>Total</h5>
                <h4>{pendingOrdersCount + fulfilledOrdersCount}</h4>
            </div>
        </div>
    </div>
}

export default OrderNumbers;