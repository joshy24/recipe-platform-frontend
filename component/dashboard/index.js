import React, { useEffect, useState } from 'react'
import InventoryCount from './InventoryCount'
import OrderNumbers from './OrderNumbers'
import ProductCount from './ProductCount'
import RecipeCount from './RecipeCount'

import styles from "../../styles/Dashboard.module.css"

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, GET_ENTITIES_COUNT} from "../../utils/api.endpoints"

const entities_count_url = BASE_URL + GET_ENTITIES_COUNT

function DashboardIndex() {

    const [entitiesCount, setEntitiesCount] = useState({})

    useEffect(() => {
        loadEntitiesCount();
    }, [])

    const loadEntitiesCount = async () => {
        try{
            const result = await getRequest(entities_count_url)
            
            setEntitiesCount(result.response)
        }
        catch(err){

        }
    }

    return (
        <div className={styles.dashboardIndex}>
            <div>
                <h2 className="pageTitle">Dashboard</h2>
            </div>
            <div className={styles.ordersRecipesInventoryCountHolder}>
                <OrderNumbers count={entitiesCount.ordersCount} />
                <ProductCount count={entitiesCount.productCount} />
                <RecipeCount count={entitiesCount.recipesCount} />
                <InventoryCount count={entitiesCount.inventoryCount} />
                    
            </div>

            <div className={styles.launchProfitTableHolder}>
                <div className={styles.launchProfitTableDetail}>To see how changes prices of ingrdients and materials affects your products, orders and recipes.
                </div>
                <div>
                    <button className="colorWhite primaryButton">
                        Launch Profitable
                    </button>
                </div>
            </div>


            <div className="tabbedListMainHolder">
                <div className="tabbedListTabsHolder">
                    <div className={styles.recentOrders}>
                        <h2>Recent Orders</h2>
                    </div>
                </div>
                <div className="tabbedListTableHolder">
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="header" style={{marginBottom: "24px"}}>
                            <th style={{width: "36%"}}>Name</th>
                            <th style={{width: "13%"}}>Created</th>
                            <th style={{width: "13%"}}>Status</th>
                            <th style={{width: "13%"}}>Recipe</th>
                            <th style={{width: "13%"}}>Total cost</th>
                        </tr>
                        <tr className="notHeader">
                            <td >Mr David's wedding</td>
                            <td >17-12-2022</td>
                            <td >Pending</td>
                            <td >3</td>
                            <td >#200,000</td>
                        </tr>
                        <tr className="notHeader">
                            <td >Folake's wedding</td>
                            <td >17-12-2022</td>
                            <td >Pending</td>
                            <td >3</td>
                            <td >#200,000</td>
                        </tr>
                        <tr className="notHeader">
                            <td>The Food Guys</td>
                            <td >17-12-2022</td>
                            <td >Pending</td>
                            <td >3</td>
                            <td >#200,000</td>
                        </tr>
                    </table>
                </div>
            </div>
             
        </div>
    )
}

export default DashboardIndex;

/*
<div className={styles.recentOrdersHolder}>      
    <RecentOrders />
</div>
*/
            
           
