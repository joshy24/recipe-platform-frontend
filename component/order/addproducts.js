import { useEffect, useState, useContext } from "react"

import EmptyResult from "../general/emptyResult"

import ProductToAdd from "./productToAdd"

const BigTextStyle = {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "15px",
    color: "#4D4D4C"
}

const mediumTextStyle = {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "15px",
    color: "#4D4D4C",
    marginTop: "12px"
}

import { AppContext } from "../../pages/AppContext";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SearchInput from "../general/searchInput"

import { getRequest, putRequest } from "../../utils/api.requests"

import { PRODUCTS_TO_ADD_URL, ADD_PRODUCTS_TO_ORDER_URL } from "../../utils/api.endpoints"

import { getDate, defaultPaginationObject } from "../../utils/helper"

const AddProducts = ({hideAddProduct, loadOrderProducts, order}) => {

    const appContext = AppContext();
    
    const [products, setProducts] = useState([])

    const [selectedProducts, setSelectedProducts] = useState([])

    const [error, setError] = useState("")

    const [pagination, setPagination] = useState(defaultPaginationObject)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getProductsToAddSearch()
    }, [pagination.page])

    const onChange = (e, product) => {
        const value = e.target.value

        product.quantity = value

        const foundIndex = products.docs.findIndex(aProduct => aProduct._id == product._id)

        if(foundIndex != -1){
            const sm = selectedProducts

            sm.splice(foundIndex,1,product)

            setProducts({...products, docs: sm})
        }
    }

    const getProductsToAdd = async () => {
        setIsLoading(true)
        try{
            const result = await getRequest(PRODUCTS_TO_ADD_URL+"?id="+order._id)

            const new_result = result.response.map(product => {
                return {...product, quantity: 0}
            })

            setProducts(new_result)

            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log(err)
        }
    }

    const emptySearchAndGetProducts = async() => {
        setSearchTerm("")

        appContext.setLoading(true)

        try{
            const result = await getRequest(PRODUCTS_TO_ADD_URL+"?id="+order._id+"&search_term="+"&page="+pagination.page+"&limit="+pagination.limit)

            const new_result = result.response.docs.map(product => {
                return {...product, quantity: 0}
            })

            setProducts({...result.response, docs: new_result})

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const getProductsToAddSearch = async() => {
        appContext.setLoading(true)

        try{
            const result = await getRequest(PRODUCTS_TO_ADD_URL+"?id="+order._id+"&search_term="+searchTerm+"&page="+pagination.page+"&limit="+pagination.limit)

            const new_result = result.response.docs.map(product => {
                return {...product, quantity: 0}
            })

            setProducts({...result.response, docs: new_result})

            setPagination({...pagination, totalPagesCount: result.response.totalPages})

            appContext.setLoading(false)
        }
        catch(err){
            console.log(err)
            appContext.setLoading(false)
        }
    }

    const addProductToSelected = (product) => {
        setError("")
        
        const sm = selectedProducts;

        const foundIndex = selectedProducts.findIndex(aProduct => aProduct.product == product._id)

        if(foundIndex == -1){
            sm.push({
                product: product._id,
                quantity: product.quantity
            })
        }
        else{
            sm.splice(foundIndex, 1)
        }

        setSelectedProducts(sm)
    }

    const doAddProducts = async()=>{
        if(selectedProducts.length > 0){
            appContext.setBlockingLoading(true)

            setError("")
           
            try{
                const response = await putRequest(ADD_PRODUCTS_TO_ORDER_URL, {id: order._id, products: selectedProducts})

                appContext.setBlockingLoading(false)

                loadOrderProducts()

                hideAddProduct()
            }
            catch(err){
                console.log(err)
                appContext.setBlockingLoading(false)
            }
        }
        else{
            if(products.length > 0){
                setError("Add products to order by clicking/tapping the add button")
            }
        }
    }

    const onSearchChanged = (event) => {
        const value = event.target.value

        setSearchTerm(value)
    }

    const handlePageClick = async (event) => {
        setPagination({...pagination, page: event.selected})
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Products to Order</h4>
                    <h5 style={mediumTextStyle}>Select Products to add</h5>

                    <div style={{marginTop: "16px"}}>
                        <SearchInput search_value={searchTerm} searchClicked={getProductsToAddSearch} onSearchChanged={onSearchChanged} closeSearchClicked={emptySearchAndGetProducts} />
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <button onClick={doAddProducts} className="rectangleButtonPrimary">Save</button>
                    <button onClick={hideAddProduct} style={{marginLeft: "16px"}} className="rectangleButtonSecondary">Close</button>
                </div>
            </div>
            <div className="popUpAddInnerContentBottom">
                <h5 className="colorOrange">{error && error.length > 0 && error}</h5>
                {
                    !appContext.state.isLoading ? 
                        <table className="tabbedListTable" style={{width: "100%"}}>      
                            {
                                products && products.docs && products.docs.length > 0 ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "24%", paddingLeft: "20px"}}>Name</th>
                                    <th style={{width: "24%", paddingLeft: "20px"}}>Quantity To Add</th>
                                    <th style={{width: "28%", paddingLeft: "20px"}}></th>
                                </tr>
                                {
                                    products.docs.map(product => {
                                        return <ProductToAdd addToSelected={addProductToSelected} product={product} onChange={onChange} selectedProducts={selectedProducts} />
                                    })
                                }
                                </tbody>

                                : <EmptyResult  message={"No Products found to add. Add some products on the products page"} onEmptyButtonClicked={getProductsToAddSearch} emptyButtonText={"Try Again"} />
                            }
                        </table> : <Skeleton count={8} height={50} />   
                }
            </div>
        </div>
    </div>
}

export default AddProducts;