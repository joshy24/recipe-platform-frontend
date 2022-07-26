import { useEffect, useState } from "react"

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

const dataState = {
    
}



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest } from "../../utils/api.requests"

import { BASE_URL, PRODUCTS_TO_ADD, ADD_PRODUCTS_TO_PRODUCT } from "../../utils/api.endpoints"

const products_to_add_url = BASE_URL + PRODUCTS_TO_ADD

const add_products_url = BASE_URL + ADD_PRODUCTS_TO_PRODUCT

const productObject = {
    product: null,
    quantity: 1
}

const AddProducts = ({hideAddProduct, loadProductProducts, order}) => {
    
    const [products, setProducts] = useState([])

    const [selectedProducts, setSelectedProducts] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProductsToAdd()
    }, [])

    const onChange = (e, product) => {
        const value = e.target.value

        product.quantity = value

        const foundIndex = products.findIndex(aProduct => aProduct._id == product._id)

        if(foundIndex != -1){
            const sm = selectedProducts

            sm.splice(foundIndex,1,product)

            setProducts(sm)
        }
    }

    const getProductsToAdd = async() => {
        try{
            const result = await getRequest(products_to_add_url+"?product_id="+order._id)

            console.log(result)

            const new_result = result.response.map(product => {
                return {...product, quantity: 0}
            })

            setProducts(new_result)

            setIsLoading(false)
        }
        catch(err){
            console.log(err)
        }
    }

    const addProductToSelected = (product) => {
        const sm = selectedProducts;

        const foundIndex = selectedProducts.findIndex(aProduct => aProduct.product == product._id)

        if(foundIndex == -1){
            productObject.product = product._id
            productObject.quantity = product.quantity

            sm.push(productObject)
        }
        else{
            sm.splice(foundIndex, 1)
        }

        console.log(sm)

        setSelectedProducts(sm)
    }

    const doAddProducts = async()=>{
        if(selectedProducts.length > 0){
            try{
                const response = await postRequest(add_products_url, {id: product._id, products: selectedProducts})

                console.log(response)

                loadProductProducts()

                hideAddProduct()
            }
            catch(err){
                console.log(err)
            }
        }
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    {/*<h4 style={BigTextStyle}>Add Products to {product.name}</h4>*/}
                    <h5 style={mediumTextStyle}>Select Products to add - {selectedProducts.length}</h5>
                </div>

                <div style={{display: "flex"}}>
                    
                    <button onClick={doAddProducts} className="rectangleButtonPrimary">Continue</button>
                    <button onClick={hideAddProduct} style={{marginLeft: "16px"}} className="rectangleButtonSecondary">Close</button>
                </div>
            </div>
            <div className="popUpAddInnerContentBottom">
                <table className="tabbedListTable" style={{width: "100%"}}>      
                {
                    !isLoading ? 
                        <>
                            {
                                products && products.length > 0 ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Name</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Quantity</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Purchase Size</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Price</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Quantity To Add</th>
                                    <th style={{width: "12%", paddingLeft: "20px"}}>Total Cost</th>
                                    <th style={{width: "16%", paddingLeft: "20px"}}></th>
                                </tr>
                                {
                                    products.map(product => {
                                        return <ProductToAdd addToSelected={addProductToSelected} product={product} onChange={onChange} selectedProducts={selectedProducts} />
                                    })
                                }
                            </tbody>

                            : <EmptyResult  message={"No Products found to add. You may want to add products"} onEmptyButtonClicked={loadProductProducts} emptyButtonText={"Try Again"} />
                            }
                        </>
                    : <Skeleton count={8} height={40} />
                }
                </table>
            </div>
        </div>
    </div>
}

export default AddProducts;