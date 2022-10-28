
import {useEffect, useState} from "react"

import { getAmount, toUpperCase, getPriceOfQuantity, getChildQuantityFromParentQuantity } from "../../utils/helper"

const ingredientToAdd = ({ingredient, selectedIngredients, addToSelected}) => {
    const [quantity, setQuantity] = useState(1)
    const [unit, setUnit] = useState(ingredient.units[0]._id)
    const [isAdded, setIsAdded] = useState(false)

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value)
    }

    const onUnitChange = (e) => {
        const value = e.target.value

        setUnit(value)
    }

    const doAddToSelected = () => {
        ingredient.quantity = quantity;
        ingredient.unit = unit

        setIsAdded(!isAdded)

        addToSelected(ingredient)
    }

    const getUnitAmountFromId = () => {
        return ingredient.units.filter(aUnit => aUnit._id == unit).shift().amount
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{toUpperCase(ingredient.name)}</td>
        <td style={{paddingLeft: "30px"}}>{ingredient.purchase_quantity && ingredient.purchase_quantity.amount}</td>
        <td style={{paddingLeft: "16px", paddingRight: "16px"}}>{ingredient.purchase_quantity.unit.abbreviation}</td>
        <td style={{paddingLeft: "30px"}}>{getAmount(ingredient.price)}</td>
        <td style={{paddingLeft: "16px", paddingRight: "16px"}}>
            <select style={{marginLeft: "0px", maxWidth: "100%"}} onChange={onUnitChange} name="unit" className="pageContentTopSelectField ptSearchInput">
                {
                    ingredient.units && ingredient.units.map(aUnit => {
                        return <option value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                    })
                }
            </select>
        </td>
        <td style={{paddingLeft: "16px", paddingRight: "16px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter quantity" value={quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "30px"}} >
            {getAmount(getPriceOfQuantity(ingredient.price, ingredient.purchase_quantity.amount, getChildQuantityFromParentQuantity(quantity, ingredient.purchase_quantity.unit.amount, getUnitAmountFromId())))}
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{isAdded ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default ingredientToAdd;