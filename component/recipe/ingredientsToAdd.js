
import {useState} from "react"

import { getAmount, toUpperCase, getPriceOfQuantity } from "../../utils/helper"

const ingredientToAdd = ({ingredient, selectedIngredients, addToSelected}) => {
    const [quantity, setQuantity] = useState(1)
    const [isAdded, setIsAdded] = useState(false)

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value)
    }

    const doAddToSelected = () => {
        ingredient.quantity = quantity;

        setIsAdded(!isAdded)

        addToSelected(ingredient)
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{toUpperCase(ingredient.name)}</td>
        <td style={{paddingLeft: "30px"}}>{ingredient.purchase_quantity && ingredient.purchase_quantity.amount}</td>
        <td style={{paddingLeft: "30px"}}>{ingredient.purchase_size}</td>
        <td style={{paddingLeft: "30px"}}>{getAmount(ingredient.price)}</td>
        <td style={{paddingLeft: "30px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter quantity" value={quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "30px"}} >
            {getAmount(getPriceOfQuantity(ingredient.price, ingredient.purchase_quantity.amount, quantity))}
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{isAdded ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default ingredientToAdd;