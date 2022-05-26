import React from 'react'
import IngredientCount from './IngredientCount'
import RecentOrders from './RecentOrders'
import OrderNumbers from './OrderNumbers'
import RecipeCount from './RecipeCount'

import styles from "../../styles/Dashboard.module.css"

function DashboardIndex() {

    return (
        <div className={styles.dashboardIndex}>
            <div>
                <h2 className="pageTitle">Dashboard</h2>
            </div>
            <div className={styles.ordersRecipesIngredientsCountHolder}>
                <OrderNumbers />
                <RecipeCount />
                <IngredientCount />    
            </div>
             
            <div className={styles.recentOrdersHolder}>
                <RecentOrders />
            </div>
             
        </div>
    )
}

export default DashboardIndex;


           
            
           
