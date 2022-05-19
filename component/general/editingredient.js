
import { useEffect, useState } from "react"

import { getAmount } from "../../utils/helper"

import EditIngredientProperties from "../../utils/EditableIngredientProperties"

const EditIngredient = ({ingredient, closeEditIngredient, editableIngredientProperties=[EditIngredientProperties.FULL]}) => {

    const [editedIngredient, setEditedIngredient] = useState({name: "", purchase_quantity: "", purchase_size: "", price: ""})

    useEffect(() => {
        setEditedIngredient({...ingredient})
    }, []);

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setEditedIngredient({...ingredient, [name]:value});
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
                <h3 className="pageTitle">Edit Ingredient</h3>

                <div className="inputFieldHolder">
                    <h4>Name</h4>

                    <input onChange={onChange} editable={editableIngredientProperties.includes(EditIngredientProperties.FULL) || editableIngredientProperties.includes(EditIngredientProperties.NAME_QUANTITY)} type="text" name="name" value={editedIngredient.name} placeholder="Enter ingredient name" />
                </div>

                <div className="inputFieldHolder">
                    <h4>Purchase Quanity</h4>
                    
                    <input onChange={onChange} editable={editableIngredientProperties.includes(EditIngredientProperties.FULL) || editableIngredientProperties.includes(EditIngredientProperties.NAME_QUANTITY)} type="number" name="purchase_quantity" value={editedIngredient.purchase_quantity} placeholder="Enter purchase quantity" />
                </div>

                <div className="inputFieldHolder">
                    <h4>Purchase Size</h4>
                    
                    <input onChange={onChange} editable={editableIngredientProperties.includes(EditIngredientProperties.FULL)} type="number" name="purchase_size" value={editedIngredient.purchase_size} placeholder="Enter purchase size" />
                </div>

                <div className="inputFieldHolder">
                    <h4>Price</h4>
                    
                    <input onChange={onChange} editable={editableIngredientProperties.includes(EditIngredientProperties.FULL)} type="number" name="price" value={editedIngredient.price} placeholder="Enter price" />
                    <h5 style={{marginLeft: "12px", marginTop: "8px"}}>{getAmount(editedIngredient.price)}</h5>
                </div>

                <div className="popButtonHolder">
                    <button onClick={closeEditIngredient} className="colorWhite secondaryButton">Save</button>
                    <button onClick={closeEditIngredient} className="colorBlack greyButton">Close</button>
                </div>
        </div>
    </div>
}

export default EditIngredient;