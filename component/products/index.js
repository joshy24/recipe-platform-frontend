
import React from 'react'
//import OrdersList from './ProductsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faPen, faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Products.module.css"
//import AddProduct from '../general/addproduct'

import { useState } from "react"
import { useRouter } from "next/router"



const ProductsIndex = () => {

    const router = useRouter()

    const navigateToProduct = () => {

        router.push("/product")
    }

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)

    const switchWhatIs = (e) => {
        e.preventDefault();
        setWhatIsOpen(!whatIsOpen)
    }

    const showAddProduct = () => {
        setShowAdd(true)
    }

    const closeAddProduct = () => {
        setShowAdd(false)
    }



    /*
    New functions
    */

    const showSearchProduct = () => {

    }

    const closeSearchProduct = () => {

    }

    const searchProduct = async () => {

    }

    const addProduct = async () => {

    }

    const loadProducts = () => {

    }

    const showProducts = () => {

    }

    const showDeleteProduct = () => {

    }

    const closeDeleteProduct = () => {

    }

    const deleteProduct = async () => {

    }

    const showProductLoading = () => {

    }

    const showSkeletonLoading = () => {
        
    }




    return ( <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Products</h2>

                    <h5 onClick={e => switchWhatIs(e)} className="whatIsHolder">
                        What are Products? <span className="whatIsCaret"><FontAwesomeIcon icon={whatIsOpen ?faCaretDown : faCaretUp } /></span>
                    </h5>

                    {
                        whatIsOpen && <div className="whatIsContentHolder whiteBox tinyPadding">
                            <h6 className="whatIsContent tinyPadding">products are objects, or systems, or services made available for consumer use to satisfy the desire or need of a customer.</h6>
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
                    <button onClick={showAddProduct} className={`squareButtonPrimary ${styles.productsButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                    <button onClick={showAddProduct} className={`squareButtonPrimary ${styles.productsButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="tabbedListTableHolder">
                    <table className="tabbedListTable" style={{width: "100%"}}>
                        <tr className="header" style={{marginBottom: "24px"}}>
                            <th style={{width: "31%"}}>Name</th>
                            <th style={{width: "23%"}}>Created</th>
                            <th style={{width: "23%"}}>Total cost</th>
                            <th style={{width: "23%"}}></th>
                        </tr>
                        <tr className="notHeader">
                            <td >Salt</td>
                            <td >17-12-2022</td>
                            <td >#200,000</td>
                            <td className="tabbedListContentHorizontalTableContent">
                                <button onClick={navigateToProduct} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td >Mayonnaise</td>
                            <td >17-12-2022</td>
                            <td >#200,000</td>
                            <td className="tabbedListContentHorizontalTableContent">
                                <button onClick={navigateToProduct} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                        <tr className="notHeader">
                            <td>Beef</td>
                            <td >17-12-2022</td>
                            <td >#200,000</td>
                            <td className="tabbedListContentHorizontalTableContent">
                                <button onClick={navigateToProduct} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>


        {
            showAdd && <AddProduct closeAddProduct={closeAddProduct} />
        }
        </>
    )
}

export default ProductsIndex;


           
            
           
