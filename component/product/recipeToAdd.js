
import {useState} from "react"

import { toUpperCase } from "../../utils/helper"

const recipeToAdd = ({recipe, selectedRecipes, addToSelected}) => {
    const [quantityUnit, setQuantityUnit] = useState({quantity: 1, unit: recipe.yield.unit._id})

    const [isAdded, setIsAdded] = useState(false)

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setQuantityUnit({...quantityUnit, [name]:value})
    }
    
    const doAddToSelected = () => {
        recipe.quantity = quantityUnit.quantity;
        recipe.unit = quantityUnit.unit

        setIsAdded(!isAdded)

        addToSelected(recipe)
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{toUpperCase(recipe.name)}</td>
        <td style={{paddingLeft: "30px"}}>{recipe.yield && recipe.yield.amount} {recipe.yield && recipe.yield.unit.abbreviation}</td>
        <td style={{paddingLeft: "30px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter yield" value={recipe.yield ? (quantityUnit.quantity > recipe.yield.amount ? recipe.yield.amount : quantityUnit.quantity) : quantityUnit.quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "30px"}}>
            <select defaultValue={recipe.yield.unit._id} style={{marginLeft: "0px"}} onChange={e => onChange(e)} name="unit" className="pageContentTopSelectField ptSearchInput">
                {
                    recipe && recipe.units && recipe.units.map(aUnit => {
                        return <option value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                    })
                }
            </select>
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{isAdded ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default recipeToAdd;