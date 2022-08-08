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

import AppContext from "../../pages/AppContext";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest, putRequest } from "../../utils/api.requests"

import { BASE_URL, PRODUCTS_TO_ADD_URL, ADD_PRODUCTS_TO_ORDER_URL } from "../../utils/api.endpoints"

const AddProducts = ({hideAddProduct, loadOrderProducts, order}) => {

    const value = useContext(AppContext);
    
    const [products, setProducts] = useState([])

    const [selectedProducts, setSelectedProducts] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState("")

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
            value.setBlockingLoading(true)

            setError("")
           
            try{
                const response = await putRequest(ADD_PRODUCTS_TO_ORDER_URL, {id: order._id, products: selectedProducts})

                value.setBlockingLoading(false)

                loadOrderProducts()

                hideAddProduct()
            }
            catch(err){
                console.log(err)
                value.setBlockingLoading(false)
            }
        }
        else{
            if(products.length > 0){
                setError("Add products to order by clicking/tapping the add button")
            }
        }
    }

    return <div className="popUpAdd">
        <div className="popUpAddInnerContent">
            <div className="popUpAddInnerContentTop">
                <div>
                    <h4 style={BigTextStyle}>Add Products to Order</h4>
                    <h5 style={mediumTextStyle}>Select Products to add</h5>
                </div>

                <div style={{display: "flex"}}>
                    <button onClick={doAddProducts} className="rectangleButtonPrimary">Save</button>
                    <button onClick={hideAddProduct} style={{marginLeft: "16px"}} className="rectangleButtonSecondary">Close</button>
                </div>
            </div>
            <div className="popUpAddInnerContentBottom">
                <h5 className="colorOrange">{error && error.length > 0 && error}</h5>
                <table className="tabbedListTable" style={{width: "100%"}}>      
                {
                    !isLoading ? 
                        <>
                            {
                                products && products.length > 0 ? <tbody>
                                <tr className="header" style={{marginBottom: "24px"}}>
                                    <th style={{width: "24%", paddingLeft: "20px"}}>Name</th>
                                    <th style={{width: "24%", paddingLeft: "20px"}}>Quantity To Add</th>
                                    <th style={{width: "24%", paddingLeft: "20px"}}>Total Cost</th>
                                    <th style={{width: "28%", paddingLeft: "20px"}}></th>
                                </tr>
                                {
                                    products.map(product => {
                                        return <ProductToAdd addToSelected={addProductToSelected} product={product} onChange={onChange} selectedProducts={selectedProducts} />
                                    })
                                }
                                </tbody>

                                : <EmptyResult  message={"No Products found to add. Add some products on the products page"} onEmptyButtonClicked={getProductsToAdd} emptyButtonText={"Try Again"} />
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