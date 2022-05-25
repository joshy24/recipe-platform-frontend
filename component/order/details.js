
import styles from "../../styles/Orders.module.css"

import {getDate, getAmount} from "../../utils/helper"

const OrderDetails = ({order}) => {
    
    return <div className={styles.orderDetailsHolder}>
            <div className={styles.detailsHolderTitles}>
                <h5>
                    Fulfilment Date
                </h5>
                <h5>
                    Date Created
                </h5>
                <h5>
                    Status
                </h5>
                <h5>
                    Labour cost
                </h5>
                <h5>
                    Profit
                </h5>
                <h5>
                    Total cost
                </h5>
            </div>
            <div className={styles.detailsHolderContent}>
                <h5>
                    {getDate(order.fulfillment_date)}
                </h5>
                <h5>
                    {getDate(order.created)}
                </h5>
                <h5>
                    {order.status}
                </h5>
                <h5>
                    {getAmount(order.labour_cost)}
                </h5>
                <h5>
                    {getAmount(order.profit)}
                </h5>
                <h5>
                    {getAmount(order.total_cost)}
                </h5>
            </div>
    </div>
}

export default OrderDetails;