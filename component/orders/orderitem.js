import styles from "../../styles/Orders.module.css"

import { useRouter } from "next/router"

import {getDate, getAmount} from "../../utils/helper"

const OrderItem = ({order}) => {

    const router = useRouter()

    const navigateToOrder = () => {

        router.push("/order")
    }
    return <div onClick={navigateToOrder} className={`whiteBox ${styles.orderItemHolder}`}>
        <div className={styles.orderName}>
            <h5 className="colorSecondary">{order.name}</h5>
        </div>
        <div className={styles.orderDate}>
            <h5>{getDate(order.created)}</h5>
        </div>
        <div className={styles.orderStatus}>
            <h5>{order.status}</h5>
        </div>
        <div className={styles.orderTotalCost}>
            <h5>{getAmount(order.tcost)}</h5>
        </div>
        <div className={styles.orderFulfilled}>
            <h5>{getDate(order.date)}</h5>
        </div>
        <div className={styles.orderLabourCost}>
            <h5>{getAmount(order.lcost)}</h5>
        </div>
        <div className={styles.orderRecipeCount}>
            <h5>{order.recipes}</h5>
        </div>
        <div className={styles.orderRecipeDelete}>
            <button className="button greyButton colorBlack">Delete</button>
        </div>

    </div>
}

export default OrderItem;