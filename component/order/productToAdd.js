
import {useState} from "react"

import { toUpperCase, getPriceOfQuantity, getAmount  } from "../../utils/helper"

const productToAdd = ({product, selectedProducts, addToSelected}) => {
    const [quantity, setQuantity] = useState(1)
    const [isAdded, setIsAdded] = useState(false)

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value)
    }

    const doAddToSelected = () => {
        product.quantity = quantity;

        setIsAdded(!isAdded)

        addToSelected(product)
    }
    
    return <tr className="notHeader">
        <td style={{paddingLeft: "30px"}}>{toUpperCase(product.name)}</td>
        <td style={{paddingLeft: "30px"}}>
            <input style={{width: "100px"}} type="number" name="quantity" placeholder="Enter quantity" value={quantity} onChange={e => onChange(e)} />
        </td>
        <td style={{paddingLeft: "30px"}} >
            <button onClick={doAddToSelected} className="rectangleButtonPrimary">{isAdded ? "Remove" : "Add"}</button>
        </td>
    </tr>
}

export default productToAdd;