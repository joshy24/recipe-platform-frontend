
import { useState } from "react";
import styles from "../../styles/Orders.module.css"

import RecipeList from "./recipelist"

import OrderDetails from "./details"

const order = {
    name: "Fufu",
    fulfillment_date: "December 17, 2022 03:24:00",
    created: "December 10, 2022 03:24:00",
    status: "pending",
    labour_cost: 3000,
    profit: 500,
    total_cost: 8000
}

const OrderIndex = () => {

    const [selected, setSelected] = useState(1)

    const switchSelected = (e,num) => {
        e.preventDefault();
        setSelected(num)
    }

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div>
                <h2 className="pageTitle">Order</h2>
                
            </div>
            
            <div>
                <h4>Total cost of order - 500</h4>
            </div>
            <div>
                <button className="colorWhite secondaryButton">Edit</button>
                <button className="colorWhite primaryButton">Add Recipe</button>
                <button className="greyButton">Delete</button>
            </div>
        </div>
        <div className={styles.orderDescriptionDetails}>
            <h4 className={styles.orderDescriptionDetail}>Description </h4>
            <h4 className={styles.orderDescriptionDetail}>-</h4>
            <h4> huhuh gi hyg jug fugi gkhjgkhg ujhuhuh uh uhg iu gig i ugjvkgkygiiygiygy giy giy giy gi yg iyg iyg iuyg iuygi yg iygii giygiyug iyg iuyg iyg iyugi ugh iygiy gi ygiu giy giy gi u ghi ugi ughi uhg kiuhkj hi gi ghiu </h4>
        </div>
        <div className={styles.orderDescriptionDetails}>
            <h4>what are orders?</h4>
        </div>
        
        <div className={styles.orderContentHolder}>
            <div className={styles.orderContentHolderTopContent}>
                <div onClick={e => switchSelected(e, 1)} className={`${styles.orderContentHolderTopContentDetails} ${selected == 1 ? styles.selected : ""}`}>
                    <h4>Details</h4>
                </div>
                <div onClick={e => switchSelected(e, 2)} className={selected == 2 ? styles.selected : ""}>
                    <h4>Recipes</h4>
                </div>
            </div>
        </div>

        <div className="pageHolderContent">
            {
                (selected == 1) ? <div className={styles.orderDetails}>
                                    <OrderDetails order={order} />
                                </div>
                              : <div className={styles.orderRecipes}>
                                    <RecipeList />
                                </div>
            }
        </div>
    </div>
}

export default OrderIndex;