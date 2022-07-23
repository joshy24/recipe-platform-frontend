
import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Products.module.css"

import AddProduct from '../general/addproduct'

import SearchInput from "../general/searchInput"

import { useRouter } from "next/router"

import { getDate } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import EmptyResult from "../general/emptyResult"

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, GET_ALL_PRODUCTS, ADD_PRODUCT, SEARCH_PRODUCTS_URL } from "../../utils/api.endpoints"

const get_products_url = BASE_URL + GET_ALL_PRODUCTS

const add_product_url = BASE_URL + ADD_PRODUCT

const ProductsIndex = () => {

    const router = useRouter()

    const navigateToProduct = (e, id) => {
        e.preventDefault()
        router.push("/product/"+id)
    }

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [products, setProducts] = useState({})
    
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPagination] = useState({offset:0, limit: 30})

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        loadProducts()
    }, [])

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

    const showSearchProducts = () => {
        setIsSearchOpen(true)
    }

    const closeSearchProducts = () => {
        setIsSearchOpen(false)

        setSearchResult([])
    }

    const searchProducts = async () => {
        if(searchTerm && searchTerm.length > 0){
            try{
                setIsLoading(true)
                const result = await getRequest(SEARCH_PRODUCTS_URL+"?searchTerm="+searchTerm+"&offset="+pagination.offset+"&limit="+pagination.limit)
                setIsLoading(false)
                console.log(result)

                setSearchResult(result.response)
            }
            catch(err){
                console.log(err)
                setIsLoading(false)
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    const addProduct = async (e, data) => {
        e.preventDefault()
        setIsLoading(true)

        try{
            const result = await postRequest(add_product_url, data)

            closeAddProduct()

            loadProducts()
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
        }
    }

    const loadProducts = async() => {
        setIsLoading(true)

        try{
            const result = await getRequest(get_products_url+"?limit="+pagination.limit+"&offset="+pagination.offset)

            console.log(result)

            setProducts(result.response)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
        }
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
                        <h5>{products ? products.totalDocs : 0}</h5>
                    </div>
                </div>

                <div className="pageHolderContentTopRight">
                    {
                        isSearchOpen ? <SearchInput searchClicked={searchProducts} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchProducts} /> :
                        <div style={{display: "flex"}}>
                            <button onClick={showSearchProducts} className={`squareButtonPrimary ${styles.productsButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                            <button onClick={showAddProduct} className={`squareButtonPrimary ${styles.productsButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                        </div>
                    }
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="tabbedListTableHolder">
                    <table className="tabbedListTable" style={{width: "100%"}}> 
                        <tbody>
                            <tr className="header" style={{marginBottom: "24px"}}>
                                <th style={{width: "31%"}}>Name</th>
                                <th style={{width: "23%"}}>Created</th>
                                <th style={{width: "23%"}}>Total cost</th>
                                <th style={{width: "23%"}}></th>
                            </tr>
                            
                            {
                                !isLoading ? <>
                                    {
                                        searchResult && searchResult.length > 0 ? searchResult.map(product => {
                                            return <tr className="notHeader">
                                                <td >{product.name}</td>
                                                <td >{getDate(product.created)}</td>
                                                <td >₦0</td>
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button onClick={e => navigateToProduct(e, product._id)} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                                    <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                        }) :
                                        products && products.docs && products.docs.length > 0 && products.docs.map(product => {
                                            return <tr className="notHeader">
                                                <td >{product.name}</td>
                                                <td >{getDate(product.created)}</td>
                                                <td >₦0</td>
                                                <td className="tabbedListContentHorizontalTableContent">
                                                    <button onClick={e => navigateToProduct(e, product._id)} style={{marginLeft: "16px"}} className="squareButtonPrimary"><FontAwesomeIcon icon={faUpRightFromSquare} /></button>
                                                    <button style={{marginLeft: "16px"}} className="squareButtonSecondary"><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                        }) 
                                    }
                                </>
                                : <tr className="notHeader">
                                    <td ><Skeleton height={60} count={6} /></td>
                                    <td ><Skeleton height={60} count={6} /></td>
                                    <td ><Skeleton height={60} count={6} /></td>
                                    <td className="tabbedListContentHorizontalTableContent">
                                        <Skeleton height={60} count={6} />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>

                    {             
                        (products && products.docs && products.docs.length==0) && !isLoading && <EmptyResult message="No products found" onEmptyButtonClicked={loadProducts} emptyButtonText="Reload" />    
                    }
                </div>
            </div>
        </div>
        {
            showAdd && <AddProduct addProduct={addProduct} closeAdd={closeAddProduct} />
        }
        </>
    )
}

export default ProductsIndex;


           
            
           
