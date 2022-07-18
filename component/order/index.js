
import { useState } from "react";
import styles from "../../styles/Orders.module.css"

import Image from "next/image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'


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

    const DetailsTab = "Details"
    const IngredientsTab = "Ingredients"

    const [showAddIngredients, setShowAddIngredients] = useState(false)
    const [selectedTab, setSelectedTab] = useState(DetailsTab)
    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const switchSelected = (e,num) => {
        e.preventDefault();
        setSelected(num)
    }

    const showAddIngredientsModal = () => {
        setShowAddIngredients(true)
    }

    const hideAddIngredientsModal = () => {
        setShowAddIngredients(false)
    }

    const switchSelectedTab = (e, tab) => {
        e.preventDefault()
        setSelectedTab(tab)
    }



    /*
    New functions
    */

    const loadOrder = () => {

    }

    const loadOrderProducts = () => {

    }

    /*const loadProductMaterials = () => {

    }*/

    const showSkeletonLoaders = () => {

    }

    const hideSkeletonLoaders = () => {

    }

    const showEditOrder = () => {

    }

    const hideEditOrder = () => {

    }

    const editOrder = async () => {

    }

    const showAddProduct = () => {

    }

    const hideAddProduct = () => {

    }

    const addProduct = async () => {

    }

    const showDeleteOrder = () => {

    }

    const hideDeleteOrder = () => {

    }

    const deleteOrder = async () => {

    }

    const showEditOrderProduct = () => {

    }

    const hideEditOrderProduct = () => {

    }

    const editOrderProduct = async () => {

    }

    const showConfirmFulfilled = () => {

    }

    const hideConfirmFulfilled = () => {

    }

    return <div className="pageHolderContent">
        <div className="pageHolderContentTop">
            <div className="pageHolderContentTopLeft">
                <h2 className="pageTitle">Order - <span className="pageTitleContentHeader">Dele Momodu</span></h2>

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
                    <h4>Products</h4>
                    <h5>10</h5>
                </div>
            </div>

            <div className="pageHolderContentTopRight">
                <button className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                <button onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faAdd} /></button>
                <button className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTabsHolder">
                <div onClick={e => switchSelectedTab(e, DetailsTab)} className={`${selectedTab == DetailsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Details</h5>
                </div>
                <div onClick={e => switchSelectedTab(e, IngredientsTab)} className={`${selectedTab == IngredientsTab ? "selected" : ""} tabbedListTabsItem`}>
                    <h5>Products</h5>
                </div>
            </div>

            <div className="tabbedListTableHolder"> 
                {
                    selectedTab == DetailsTab ? 
                    <table className={styles.tabbedListTable} style={{width: "100%"}}>
                        <tr style={{marginBottom: "24px"}}>
                            <th style={{width: "20%"}}>Name</th>
                            <th style={{width: "80%"}}>Dele Momodu</th>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>17-12-2022</td>
                        </tr>
                        <tr>
                            <td>Order status</td>
                            <td className="tabbedListContentHorizontalTableContent"> 
                                Pending
                                <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="rectangleButtonPrimary">Fulfill</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Fulfillment date</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total selling price</td>
                            <td>#30,000</td>
                        </tr>
                    </table> : <table className={styles.tabbedListTable} style={{width: "100%"}}>
                                    <tr style={{marginBottom: "24px"}}>
                                        <th style={{width: "25%"}}>Name</th>
                                        <th style={{width: "25%"}}>Quantity</th>
                                        <th style={{width: "25%"}}>Total Cost</th>
                                        <th style={{width: "25%"}}></th>
                                    </tr>
                                    <tr>
                                        <td>Shawarma</td>
                                        <td>1</td>
                                        
                                        <td>#800</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kebab</td>
                                        <td>1</td>
                                        <td>#150</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Giz Dodo</td>
                                        <td>1</td>
                                        
                                        <td>#400</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Milk Bar</td>
                                        <td>1</td>
                                        
                                        <td>#600</td>
                                        <td className="tabbedListContentHorizontalTableContent">
                                            <button style={{marginLeft: "16px"}} onClick={showAddIngredientsModal} className="squareButtonPrimary"><FontAwesomeIcon icon={faPen} /></button>
                                            <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                </table>
                }
            </div>

        </div>

        {
            showAddIngredients && <AddIngredients hideAddIngredientsModal={hideAddIngredientsModal} />
        }

    </div>
}

export default OrderIndex;