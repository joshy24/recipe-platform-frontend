
import {useState} from "react"

import { getAmount, toUpperCase, getMaterialUnit, getMaterialQuantityCost } from "../../utils/helper"

const materialToAdd = ({material, addToSelected, units}) => {
    const [quantity, setQuantity] = useState(1)
    const [isAdded, setIsAdded] = useState(false)
    const [unit, setUnit] = useState(units[0]._id)

    const onUnitChange = (e) => {
        const value = e.target.value

        setUnit(value)
    }

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value)
    }

    const doAddToSelected = () => {
        material.quantity = quantity;
        material.unit = unit;

        setIsAdded(!isAdded)

        addToSelected(material)
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{toUpperCase(material.name)}</td>
        <td style={{paddingLeft: "30px"}}>{material.purchase_quantity && material.purchase_quantity.amount}</td>
        <td style={{paddingLeft: "16px", paddingRight: "16px"}}>
            { material.purchase_quantity && material.purchase_quantity.unit.name }
            ({ material.purchase_quantity && material.purchase_quantity.unit.abbreviation })
        </td>
        <td style={{paddingLeft: "30px"}}>{getAmount(material.price)}</td>
        <td style={{paddingLeft: "16px", paddingRight: "16px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter quantity" value={quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "16px", paddingRight: "16px"}}>
            <select style={{marginLeft: "0px", maxWidth: "100%"}} onChange={onUnitChange} name="unit" className="pageContentTopSelectField ptSearchInput">
                {
                    units && units.map(aUnit => {
                        return <option value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                    })
                }
            </select>
        </td>
        <td style={{paddingLeft: "30px"}} >
            {getAmount(getMaterialQuantityCost(material.purchase_quantity.unit, getMaterialUnit(units, unit), material, quantity))}
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{isAdded ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default materialToAdd;