
import {useEffect, useState} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

const materialToAdd = ({material, selectedMaterials, addToSelected}) => {
    const [quantity, setQuantity] = useState(1)

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value)
    }

    const doAddToSelected = () => {
        material.quantity = quantity;

        addToSelected(material)
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{material.name}</td>
        <td style={{paddingLeft: "30px"}}>{material.purchase_quantity && material.purchase_quantity.amount}</td>
        <td style={{paddingLeft: "30px"}}>{material.purchase_size}</td>
        <td style={{paddingLeft: "30px"}}>₦{material.price}</td>
        <td style={{paddingLeft: "30px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter quantity" value={quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "30px"}} >
            ₦{quantity * material.price}
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{selectedMaterials.includes({material: material._id, quantity: quantity}) ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default materialToAdd;