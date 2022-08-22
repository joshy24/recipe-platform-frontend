
import AppContext from "../../pages/AppContext";

import { useEffect, useState, useContext } from "react"

import EmptyResult from "../general/emptyResult"

import { toUpperCase, getAmount } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import { ORDER_SHOPPING_LIST_URL } from "../../utils/api.endpoints"

const ShoppingList = ({id}) => {

    const value = useContext(AppContext);

    const [order,setOrder] = useState({})

    const [inventory, setInventory] = useState([])

    const [filters, setFilters] = useState({type: "materials", status: "All", searchTerm: ""})

    useEffect(() => {
        loadShoppingList()
    }, [])

    const loadShoppingList = async() => {
        value.setBlockingLoading(true)

        try{
            const result = await getRequest(ORDER_SHOPPING_LIST_URL+"?id="+id)

            value.setBlockingLoading(false)

            setOrder(result.response)

            setInventory(result.response.materials)
        }
        catch(err){
            value.setBlockingLoading(false)
            console.log(err)
        }
    }

    async function onFieldChanged(event){
        event.preventDefault()
        const target = event.target;
        const aVal = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFilters({...filters, [name]:aVal})

        if(name=="type"){
            switch(aVal){
                case "materials":
                     if(order && order.materials)
                        setInventory(order.materials)
                break;
                case "ingredients":
                    if(order && order.ingredients)
                        setInventory(order.ingredients)
                break;
            }
        }
    }

    return <>
        <div className="pageHolderContent">
            <div className="pageHolderContentTop">
                <div className="pageHolderContentTopLeft">
                    <h2 className="pageTitle">Shopping List</h2>
                    <h4><strong>Order</strong> - <span className="pageTitleContentHeader">{order && order.name && toUpperCase(order.name)}</span></h4>
                    <h5><strong>Status</strong> - {order && order.status}</h5>
                </div>

                <div className="pageHolderContentTopCenter">
                    <div>
                        <h4>Materials</h4>
                        <h4>{order && order.materials && order.materials.length}</h4>
                    </div>

                    <div>
                        <h4>Ingredients</h4>
                        <h4>{order && order.ingredients && order.ingredients.length}</h4>
                    </div>
                </div>
                
                <div className="pageHolderContentTopRight">
                    <select onChange={onFieldChanged} name="type" className="pageContentTopSelectField">
                        <option value="materials">Materials</option>
                        <option value="ingredients">Ingredients</option>
                    </select>
                    <select onChange={onFieldChanged} name="status" className="pageContentTopSelectField">
                        <option>All</option>
                        <option>Low</option>
                        <option>Normal</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="pageHolderContentTopMobile">
            <div className="pageHolderContentTopTopOther">
                <h2 className="pageTitle">Shopping List</h2>
                <h4><strong>Order</strong> - <span className="pageTitleContentHeader">{order && order.name && toUpperCase(order.name)}</span></h4>
                <h5><strong>Status</strong> - {order && order.status}</h5>
            </div>

            <div className="pageHolderContentMiddle">
                <div style={{display: "flex"}}>
                    <select onChange={onFieldChanged} name="type" className="pageContentTopSelectField">
                        <option value="materials">Materials</option>
                        <option value="ingredients">Ingredients</option>
                    </select>
                    <select onChange={onFieldChanged} name="status" className="pageContentTopSelectField">
                        <option>All</option>
                        <option>Low</option>
                        <option>Normal</option>
                    </select>
                </div>
            </div>
            
            <div className="pageHolderContentTopBottom">
                <div className="pageHolderContentTopBottomItem">
                    <h4>Materials</h4>
                    <span>-</span>
                    <h4>{order && order.materials && order.materials.length}</h4>
                </div>
                <div className="pageHolderContentTopBottomItem">
                    <h4>Ingredients</h4>
                    <span>-</span>
                    <h4>{order && order.ingredients && order.ingredients.length}</h4>
                </div>
            </div>
        </div>

        <div className="tabbedListMainHolder">
            <div className="tabbedListTableHolder">
                
                <table className="tabbedListTable" style={{width: "100%"}}>
                    <tr className="header" style={{marginBottom: "24px"}}>
                        <th style={thStyleFirst}>Name</th>
                        <th style={thStyle}>Purchase Size</th>
                        <th style={thStyle}>Purchase Price</th>
                        <th style={thStyle}>Cost</th>
                        <th style={thStyle}>Low Level</th>
                        <th style={thStyle}>Quantity Required</th>
                        <th style={thStyle}>Quantity In Stock</th>
                        <th style={thStyle}>Outstanding Quantity Required</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                    {
                        inventory && inventory.length > 0 && inventory.map(invent => {
                            return (filters.status == "All" || (invent.status.toLowerCase() === filters.status.toLowerCase())) && <tr className="notHeader">
                            <td style={tdStyle}>{invent && toUpperCase(invent.name)}</td>
                            <td style={tdStyle}>{invent && invent.purchase_size}</td>
                            <td style={tdStyle}>{invent && getAmount(invent.price)}</td>
                            <td style={tdStyle}>{invent && getAmount(invent.cost)}</td>
                            <td style={tdStyle}>{invent && invent.lowLevel}</td>
                            <td style={tdStyle}>{invent && invent.quantity}</td>
                            <td style={tdStyle}>{invent && invent.quantity_in_stock}</td>
                            <td style={tdStyle}>{invent && invent.quantityToFulfill}</td>
                            <td style={tdStyle}>{invent && invent.status}</td>
                        </tr>
                        })
                    }
                </table>

                {
                    inventory && inventory.length == 0 && !value.state.loading && !value.state.isBlockingLoading && <EmptyResult message="No products were found for this order." onEmptyButtonClicked={loadShoppingList} emptyButtonText="Try Again" />
                }

            </div>
        </div>
    </>
}

export default ShoppingList;


const thStyle = {width: "11%", fontSize: "14px", paddingLeft: "16px", fontWeight: "700"}

const thStyleFirst = {width: "12%", fontSize: "14px", paddingLeft: "16px", fontWeight: "700"}

const tdStyle = {fontSize: "14px", paddingLeft: "16px"}

