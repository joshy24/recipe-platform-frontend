
import {useEffect, useState} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPen, faAdd, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

const productToAdd = ({product, selectedProducts, addToSelected}) => {
    const [quantity, setQuantity] = useState(1)

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value)
    }

    const doAddToSelected = () => {
        product.quantity = quantity;

        addToSelected(product)
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{product.name}</td>
        <td style={{paddingLeft: "30px"}}>{product.purchase_quantity && product.purchase_quantity.amount}</td>
        <td style={{paddingLeft: "30px"}}>{product.purchase_size}</td>
        <td style={{paddingLeft: "30px"}}>₦{product.price}</td>
        <td style={{paddingLeft: "30px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter quantity" value={quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "30px"}} >
            ₦{quantity * product.price}
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{selectedProducts.includes({product: product._id, quantity: quantity}) ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default productToAdd;