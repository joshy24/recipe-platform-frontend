import { useState, useContext } from "react"

import { toUpperCase, getAmount, downloadFile } from "../../utils/helper"

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import AppContext from "../../pages/AppContext";

import { PRODUCTS_PROFITABLE_URL } from "../../utils/api.endpoints"
import { useEffect } from "react"

const ProfitableApply = ({apply_details}) => {

    const value = useContext(AppContext);

    const details = JSON.parse(apply_details)

    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    },[])

    const loadProducts = async () => {
        value.setBlockingLoading(true)

        try{
            const result = await getRequest(PRODUCTS_PROFITABLE_URL+"?type="+details.type+"&changeList="+JSON.stringify(details.changeObject))

            console.log(result)

            setProducts(result.response)

            value.setBlockingLoading(false)
        }
        catch(err){
            console.log(err)
            value.setBlockingLoading(false)
        }
    }

    const applyChange = () => {
        console.log("Change Applied")
    }

    return <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft" style={topLeftStyle}> 
                    <h4 style={topLeftStyleText}>The following products will be affected if you apply a { getAmount(Object.values(details.changeObject)[0]) } {Object.values(details.changeObject)[0] < 0 ? "decrease" : "increase" } to the cost of {details.inventoryItem.name}</h4>
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
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>Old Cost</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>Old Cost With Profit</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>New Cost</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>New Cost with Profit</th>
                            <th style={{width: "14%", paddingLeft: "20px", fontSize: "14px"}}>Old selling Price</th>
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
            </div>
        </div>
    </>
}

export default ProfitableApply;

const topLeftStyle = {width: "100%", display: "flex", alignItems: "center", justifyContent:"left", flexDirection: "row"}

const topLeftStyleText = {margin: "0px"}