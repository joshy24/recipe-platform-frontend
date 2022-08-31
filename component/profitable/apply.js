import { useState, useContext } from "react"

import { toUpperCase, getAmount, downloadFile } from "../../utils/helper"

import EmptyResult from "../general/emptyResult"

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import { AppContext } from "../../pages/AppContext";

import { useRouter } from "next/router"

import { PRODUCTS_PROFITABLE_URL, APPLY_PROFITABLE_CHANGES_URL } from "../../utils/api.endpoints"
import { useEffect } from "react"

const ProfitableApply = ({apply_details}) => {

    const router = useRouter()

    const appContext = AppContext();

    const details = JSON.parse(apply_details)

    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    },[])

    const loadProducts = async () => {
        appContext.setBlockingLoading(true)

        try{
            const result = await getRequest(PRODUCTS_PROFITABLE_URL+"?type="+details.type+"&changeList="+JSON.stringify(details.changeObject))

            setProducts(result.response)

            appContext.setBlockingLoading(false)
        }
        catch(err){
            appContext.setBlockingLoading(false)
        }
    }

    const applyChange = async () => {
        appContext.setBlockingLoading(true)

        try{
            let url = APPLY_PROFITABLE_CHANGES_URL
            
            await postRequest(url, {type: details.type, id: details.inventoryItem._id, change: Object.values(details.changeObject)[0]})

            appContext.setBlockingLoading(false)

            router.push("/profitable")
        }
        catch(err){
            console.log(`An error occurred applying changes to ${changeDetails.inventoryItem._id} with error ${err}`)
            appContext.setBlockingLoading(false)
        }
    }

    return <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft" style={topLeftStyle}> 
                    <h4 style={topLeftStyleText}>The following products will be affected if you change the price of {details.inventoryItem.name} from {getAmount(details.inventoryItem.price)} to { getAmount(Object.values(details.changeObject)[0]) } </h4>
                    <button onClick={applyChange} className="rectangleButtonPrimary">Apply</button>
                </div>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTableHolder">
                <table className="tabbedListTable" style={{width: "100%"}}>
                    <tbody>
                        <tr className="header" style={{marginBottom: "24px"}}>
                            <th style={{width: "16%", paddingLeft: "20px", fontSize: "14px"}}>Name</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>Old Total Cost</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>Old Total Cost With Profit</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>New Total Cost</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>New Total Cost with Profit</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>Actual Selling Price</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>Profit Margin</th>
                        </tr>
                        {
                            products && products.length > 0 && products.map(product => {
                                return product && <tr className="notHeader">
                                    <td style={{paddingLeft: "16px"}}>{toUpperCase(product.name)}</td>
                                    <td style={{paddingLeft: "14px"}}>{getAmount(product.totalCostWithoutProfitMargin)}</td>
                                    <td style={{paddingLeft: "14px"}}>{getAmount(product.totalCostWithProfitMargin)}</td>
                                    <td style={{paddingLeft: "14px"}}>{getAmount(product.totalCostWithIncrease)}</td>
                                    <td style={{paddingLeft: "14px"}}>{getAmount(product.newProposedCostPriceWithIncreaseAndProfitMargin)}</td>
                                    <td style={{paddingLeft: "14px"}}>{getAmount(product.actual_selling_price)}</td>
                                    <td style={{paddingLeft: "14px"}}>{product.profit_margin}%</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {
                    (!appContext.state.isLoading && !appContext.state.isBlockingLoading && (products.length == 0 || !products)) && <EmptyResult message="No products were found." onEmptyButtonClicked={loadProducts} emptyButtonText="Try Again" />
                }
            </div>
        </div>
    </>
}

export default ProfitableApply;

const topLeftStyle = {width: "100%", display: "flex", alignItems: "center", justifyContent:"left", flexDirection: "row"}

const topLeftStyleText = {margin: "0px"}