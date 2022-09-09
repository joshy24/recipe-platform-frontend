
import React, {useEffect, useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from "next/image"

import { faAdd, faTrash, faSearch, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/Products.module.css"

import AddProduct from '../general/addproduct'

import SearchInput from "../general/searchInput"

import Pagination from "../general/pagination"

import { useRouter } from "next/router"

import { getAmount, getDate, defaultPaginationObject } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import EmptyResult from "../general/emptyResult"

import { AppContext } from "../../pages/AppContext";

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, GET_ALL_PRODUCTS, ADD_PRODUCT, SEARCH_PRODUCTS_URL } from "../../utils/api.endpoints"

const get_products_url = BASE_URL + GET_ALL_PRODUCTS

const add_product_url = BASE_URL + ADD_PRODUCT

const ProductsIndex = () => {

    const appContext = AppContext()

    const router = useRouter()
    const navigateToProduct = (e, id) => {
        e.preventDefault()
        router.push("/product/"+id)
    }

    const [showAdd, setShowAdd] = useState(false)
    const [whatIsOpen, setWhatIsOpen] = useState(false)
    const [products, setProducts] = useState({})
    
    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)

    useEffect(() => {
        loadProducts()
    }, [pagination.page])

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

        loadProducts()
    }

    const searchProducts = async () => {
        if(searchTerm && searchTerm.length > 0){
            try{
                appContext.setLoading(true)
                const result = await getRequest(SEARCH_PRODUCTS_URL+"?searchTerm="+searchTerm+"&page="+(pagination.page+1)+"&limit="+pagination.limit)
                appContext.setLoading(false)

                setProducts(result.response)
            }
            catch(err){
                appContext.setLoading(false)
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    const addProduct = async (data) => {
        appContext.setBlockingLoading(true)

        try{
            const result = await postRequest(add_product_url, data)

            closeAddProduct()

            appContext.setBlockingLoading(false)

            router.push("/product/"+result.response._id)
        }
        catch(err){
            appContext.setBlockingLoading(false)
        }
    }

    const loadProducts = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(get_products_url+"?limit="+pagination.limit+"&page="+(pagination.page+1))

            setProducts(result.response)

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)
        }
        catch(err){
            appContext.setLoading(false)
        }
    }

    const handlePageClick = async (event) => {
        setPagination({...pagination, page: event.selected})
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
                            <h6 className="whatIsContent tinyPadding">A product is a sellable item made from a combination of recipes and materials e.g 6 inches buttercream cake.</h6>
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

            <div className="pageHolderContentTopMobile">
                <div className="pageHolderContentTopTop">
                    <h2 className="pageTitle">Products</h2>

                    <div style={{display: "flex"}}>
                    {
                        isSearchOpen ? <SearchInput searchClicked={searchProducts} onSearchChanged={onSearchChanged} closeSearchClicked={closeSearchProducts} /> :
                        <div style={{display: "flex"}}>
                            <button onClick={showSearchProducts} className={`squareButtonPrimary ${styles.productsButton}`}><FontAwesomeIcon icon={faSearch} /></button>
                            <button onClick={showAddProduct} className={`squareButtonPrimary ${styles.productsButton}`}><FontAwesomeIcon icon={faAdd} /></button>
                        </div>
                    }
                    </div>
                </div>

                <div className="pageHolderContentMiddle">
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
                
                <div className="pageHolderContentTopBottom">
                    <div className="pageHolderContentTopBottomItem">
                        <h4>Total</h4>
                        <span>-</span>
                        <h5>{products ? products.totalDocs : 0}</h5>
                    </div>
                </div>
            </div>

            <div className="tabbedListMainHolder">
                <div className="tabbedListTableHolder">

                    <div className="largeTopMargin">
                        {
                            products && products.docs && <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick} currentPage={pagination.page} />
                        }
                    </div>

                    {
                        !appContext.state.isLoading ? <table className="tabbedListTable" style={{width: "100%"}}> 
                                <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "31%"}}>Name</th>
                                    <th style={{width: "23%"}}>Created</th>
                                    <th style={{width: "23%"}}>Total cost</th>
                                    <th style={{width: "23%"}}>Actual Selling Price</th>
                                </tr>
                                
                                {
                                    products && products.docs && products.docs.length > 0 && products.docs.map(product => {
                                        return <tr key={product._id} onClick={e => navigateToProduct(e, product._id)} className="notHeader">
                                            <td >{product.name}</td>
                                            <td >{getDate(product.created)}</td>
                                            <td >{getAmount(product.totalCost)}</td>
                                            <td >{getAmount(product.actual_selling_price)}</td>
                                        </tr>
                                    }) 
                                }
                            </tbody> 
                        </table> : <div className="skeletonHolder">
                            <Skeleton count={8} height={50} />
                        </div>
                    }

                    {             
                        (products && products.docs && products.docs.length==0) && !appContext.state.isLoading && <EmptyResult message="No products found" onEmptyButtonClicked={loadProducts} emptyButtonText="Reload" />    
                    }
                </div>

                {
                    products && products.docs && <Pagination pageCount={pagination.totalPagesCount} handlePageClick={handlePageClick} currentPage={pagination.page} />
                }

            </div>
        </div>
        {
            showAdd && <AddProduct addProduct={addProduct} closeAdd={closeAddProduct} />
        }
        </>
    )
}

export default ProductsIndex;


           
            
           
