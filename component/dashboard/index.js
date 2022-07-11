import React from 'react'
import InventoryCount from './InventoryCount'
import RecentOrders from './RecentOrders'
import OrderNumbers from './OrderNumbers'
import ProductCount from './ProductCount'
import RecipeCount from './RecipeCount'

import styles from "../../styles/Dashboard.module.css"

function DashboardIndex() {

    return (
        <div className={styles.dashboardIndex}>
            <div>
                <h2 className="pageTitle">Dashboard</h2>
            </div>
            <div className={styles.ordersRecipesInventoryCountHolder}>
                <OrderNumbers />
                <ProductCount />
                <RecipeCount />
                <InventoryCount />
                    
            </div>
             
            <div className={styles.recentOrdersHolder}>
                <RecentOrders />
            </div>
             
        </div>
    )
}

export default DashboardIndex;


           
            
           
