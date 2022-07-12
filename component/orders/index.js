
import React from 'react'
import OrdersList from './OrdersList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faSearch, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
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
                    <div className="pageHolderContentTopRight">
                        <button onClick={showAddOrder} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                        <button onClick={showAddOrder} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
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


           
            
           
