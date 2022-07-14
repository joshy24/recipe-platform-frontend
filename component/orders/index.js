
import React from 'react'
import OrdersList from './OrdersList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faPen, faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Orders.module.css"
import AddOrder from '../general/addorder'
import { useRouter } from "next/router"
import { useState } from "react"

const OrdersIndex = () => {

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const router = useRouter()
    const navigateToOrder = () => {

        router.push("/order")
    }

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const showAddOrder = () => {
        setShowAdd(true)
    }

    const closeAddOrder = () => {
        setShowAdd(false)
    }

    return ( <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Orders</h2>

                    <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                        What are Orders? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                    </h5>

                    {
                        whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                            <h6 className="whatIsContent tinyPadding">orders are popular Levantine dish consisting of meat cut into thin slices, stacked in a cone-like shape, and roasted on a slowly-turning vertical rotisserie or spit.</h6>
                            <Image style={{minWidth: "44px", minHeight: "44px"}} onClick={e => switchWhatIs(e)} className="whatIsContentCloseBtn" src="/images/closeorange.png" width={44} height={44} />
                        </div>
                    }
                </div>

                <div className="pageHolderContentTopCenter">
                    <div>
                        <h4>Total</h4>
                        <h5>3</h5>
                    </div>
                </div>

                <div className="pageHolderContentTopRight">
                    <button onClick={showAddOrder} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                    <button onClick={showAddOrder} className={`squareButtonPrimary ${styles.ordersButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="tabbedListTableHolder">
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="header" style={{marginBottom: "24px"}}>
                            <th style={{width: "28%"}}>Name</th>
                            <th style={{width: "18%"}}>Created</th>
                            <th style={{width: "18%"}}>Status</th>
                            <th style={{width: "18%"}}>Total cost</th>
                            <th style={{width: "18%"}}></th>
                        </tr>
                        <tr className="notHeader">
                            <td >Mr David's wedding</td>
                            <td >17-12-2022</td>
                            <td >Pending</td>
                            <td >#200,000</td>
                            <td className="tabbedListContentHorizontalTableContent">
                                <button onClick={navigateToOrder} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td >Folake's wedding</td>
                            <td >17-12-2022</td>
                            <td >Pending</td>
                            <td >#200,000</td>
                            <td className="tabbedListContentHorizontalTableContent">
                                <button onClick={navigateToOrder} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td>The Food Guys</td>
                            <td >17-12-2022</td>
                            <td >Pending</td>
                            <td >#200,000</td>
                            <td className="tabbedListContentHorizontalTableContent">
                                <button onClick={navigateToOrder} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>


        {
            showAdd && <AddOrder closeAddOrder={closeAddOrder} />
        }
        </>
    )
}

export default OrdersIndex;


           
            
           
