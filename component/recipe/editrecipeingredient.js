
import { useState } from 'react'

import { toUpperCase } from "../../utils/helper"


const EditRecipeIngredient = ({ingredient, onPerformEditClicked, onCancelEditClicked}) => {

    const [quantity, setQuantity] = useState(ingredient.quantity)

    const doEdit = () => {
        if(quantity !== ingredient.quantity){
            onPerformEditClicked({...ingredient, quantity: quantity})
        }
    }

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value);
    }

    return <div className="popUp">
                <div className="popUpInnerContent">
                    <h3 className="pageTitle">Edit {ingredient.name.length > 0 && toUpperCase(ingredient.name)}</h3>
                
                    <div className="inputFieldHolder">
                        <h4>Quantity</h4>

                        <input className="ptInput" onChange={onChange} type="number" name="name" value={quantity} />
                    </div>

                    <div className="popButtonHolder">
                        <button onClick={doEdit} className="colorWhite rectangleButtonPrimary">Save</button>
                        <button onClick={onCancelEditClicked} className="colorBlack rectangleButtonSecondary">Close</button>
                    </div>
                </div>
            </div>
}

export default EditRecipeIngredient;
