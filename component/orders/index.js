
import React from 'react'
import OrdersList from './OrdersList'

import styles from "../../styles/Orders.module.css"
import AddOrder from '../general/addorder'

import { useState } from "react"

const OrdersIndex = () => {

    const [showAdd, setShowAdd] = useState(false)

    const showAddOrder = () => {
        setShowAdd(true)
    }

    const closeAddOrder = () => {
        setShowAdd(false)
    }

    return (
        <>
            <div className={styles.ordersIndex}>
                <div  className={styles.ordersTop}>
                    <h2 className="pageTitle">Orders</h2>
                    <div>
                        <h4>Total - 3</h4>
                    </div>
                    <div>
                        <button className={styles.ordersButton}>Search</button>
                        <button onClick={showAddOrder} className={styles.ordersButton}>Add Order</button>
                    </div>
                </div>
                
                <div>
                    <h4>what are orders? </h4>
                </div>


                <div className={styles.ordersListHolder}>
                    <OrdersList />
                </div>
                
            </div>

            {
                showAdd && <AddOrder closeAddOrder={closeAddOrder} />
            }
        </>
    )
}

export default OrdersIndex;


           
            
           
