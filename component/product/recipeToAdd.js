
import {useEffect, useState} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

import { getAmount, toUpperCase } from "../../utils/helper"

const recipeToAdd = ({recipe, selectedRecipes, addToSelected}) => {
    const [quantity, setQuantity] = useState(1)
    const [isAdded, setIsAdded] = useState(false)

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value)
    }

    const doAddToSelected = () => {
        recipe.quantity = quantity;

        setIsAdded(!isAdded)

        addToSelected(recipe)
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{toUpperCase(recipe.name)}</td>
        <td style={{paddingLeft: "30px"}}>{recipe.yield && recipe.yield.amount} {recipe.yield && recipe.yield.unit}</td>
        <td style={{paddingLeft: "30px"}}>{getAmount(recipe.cost)}</td>
        <td style={{paddingLeft: "30px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter yield" value={recipe.yield ? (quantity > recipe.yield.amount ? recipe.yield.amount : quantity) : quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{isAdded ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default recipeToAdd;