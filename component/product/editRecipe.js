
import { useState } from 'react'

import { toUpperCase } from "../../utils/helper"


const EditProductRecipe = ({recipe, onPerformEditClicked, onCancelEditClicked}) => {

    const [quantity, setQuantity] = useState(recipe.yield.amount)

    const doEdit = () => {
        if(quantity !== recipe.yield.amount){
            onPerformEditClicked({...recipe, yield: { amount: quantity}})
        }
    }

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value);
    }

    return <div className="popUp">
                <div className="popUpInnerContent">
                    <h3 className="pageTitle">Edit {recipe.name.length > 0 && toUpperCase(recipe.name)}</h3>
                
                    <div className="inputFieldHolder">
                        <h4>Amount</h4>

                        <input className="ptInput" onChange={onChange} type="number" name="name" value={quantity} />
                    </div>

                    <div className="popButtonHolder">
                        <button onClick={doEdit} className="colorWhite rectangleButtonPrimary">Save</button>
                        <button onClick={onCancelEditClicked} className="colorBlack rectangleButtonSecondary">Close</button>
                    </div>
                </div>
            </div>
}

export default EditProductRecipe;
