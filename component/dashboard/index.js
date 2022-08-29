import React, { useEffect, useState } from 'react'
import InventoryCount from './inventorycount'
import OrderNumbers from './ordernumbers'
import ProductCount from './productcount'
import RecipeCount from './recipecount'

import styles from "../../styles/Dashboard.module.css"

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, GET_ENTITIES_COUNT, RECENT_ORDERS_URL} from "../../utils/api.endpoints"

import { useRouter } from "next/router"

import { getDate, toUpperCase } from "../../utils/helper"

const entities_count_url = BASE_URL + GET_ENTITIES_COUNT

function DashboardIndex() {

    const router = useRouter()

    const [entitiesCount, setEntitiesCount] = useState({})
    const [recentOrders, setRecentOrders] = useState([])

    useEffect(() => {
        loadEntitiesCount();

        loadRecentOrders()
    }, [])

    const loadRecentOrders = async() => {
        try{
            const result = await getRequest(RECENT_ORDERS_URL)

            setRecentOrders(result.response)
        }
        catch(err){
            console.log(err)
        }
    }

    const loadEntitiesCount = async () => {
        try{
            const result = await getRequest(entities_count_url)
            
            setEntitiesCount(result.response)
        }
        catch(err){

        }
    }

    const goToOrder = (e, id) => {
        e.preventDefault()
        router.push("/order/"+id)
    }

    const goToProfitable = () => {
        router.push("/profitable")
    }

    return (
        <div className={styles.dashboardIndex}>
            <div>
                <h2 className="pageTitle">Dashboard</h2>
            </div>
            <div className={styles.ordersRecipesInventoryCountHolder}>
                <OrderNumbers count={entitiesCount.ordersCount} />
                <ProductCount count={entitiesCount.productsCount} />
                <RecipeCount count={entitiesCount.recipesCount} />
                <InventoryCount count={entitiesCount.inventoryCount} />
                    
            </div>

            <div className={styles.launchProfitTableHolder}>
                <div className={styles.launchProfitTableDetail}>
                    <span style={proitableTextStyle}>To see how changes in prices of ingrdients and materials affects your products, orders and recipes.</span>
                </div>
                <div>
                    <button onClick={goToProfitable} className="colorWhite primaryButton">
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
                            <th style={{width: "37%"}}>Name</th>
                            <th style={{width: "21%"}}>Status</th>
                            <th style={{width: "21%"}}>Fulfillment Date</th>
                            <th style={{width: "21%"}}>Created</th>
                        </tr>
                        {
                            recentOrders && recentOrders.length > 0 && recentOrders.map(recentOrder => {
                                return  <tr onClick={e => goToOrder(e, recentOrder._id)} className="notHeader">
                                            <td >{toUpperCase(recentOrder.name)}</td>
                                            <td >{recentOrder.status}</td>
                                            <td >{getDate(recentOrder.fulfillment_date)}</td>
                                            <td >{getDate(recentOrder.created)}</td>
                                        </tr>
                            })
                        }
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
            

const proitableTextStyle = {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#4D4D4C"
}
           
