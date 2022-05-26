
import styles from "../../styles/Dashboard.module.css"

import RecentOrder from "./recentorder"

const today = new Date();

const orders = [{
    name: "Local",
    created: "December 17, 2022 03:24:00",
    status: "pending", 
    ingredients: 3,
    cost: 500
},{
    name: "International",
    created: "December 17, 2022 03:24:00",
    status: "pending", 
    ingredients: 12,
    cost: 40000
},{
    name: "Special",
    created: "December 17, 2022 03:24:00",
    status: "pending", 
    ingredients: 8,
    cost: 25000
}]

const RecentOrders = () => {
    return <div className={styles.recentOrdersHolder}>
        <h2 className="colorPrimary">Recent Orders</h2>

        <div className={styles.recentOrderHolderTitle}>
            <div className={styles.orderName}>
                <h5>Name</h5>
            </div>
            <div className={styles.orderDate}>
                <h5>Created</h5>
            </div>
            <div className={styles.orderStatus}>
                <h5>Status</h5>
            </div>
            <div className={styles.orderRecipe}>
                <h5>Recipes</h5>
            </div>
            <div className={styles.orderCost}>
                <h5>Total Cost</h5>
            </div>
        </div>

        {
            orders && orders.map(order => { 
                return <RecentOrder key={order.name} order={order} />
            })
        }
        
    </div>
}

export default RecentOrders;

/*
{
    orders && orders.map(order => {
        return <RecentOrder key={order.name} order={order} />
    })
}
*/
