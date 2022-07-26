
import { useState } from "react"

import { getAmount, toUpperCase } from "../../utils/helper"

const EditIngredient = ({closeEditIngredient, saveEditedInventory, inventoryToEdit, inventoryType}) => {

    const getType = () => {
        switch(inventoryType){
            case "materials":
                return "Material"
            break;
            case "ingredients":
                return "Ingredient"
            break;
        }
    }

    const [ingredient, setIngredient] = useState({type: getType(), name: inventoryToEdit.name, purchase_quantity: inventoryToEdit.purchase_quantity.amount, purchase_size: inventoryToEdit.purchase_quantity.unit, price: inventoryToEdit.price, quantity_in_stock: inventoryToEdit.quantity_in_stock, lowLevel: inventoryToEdit.lowLevel})

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setIngredient({...ingredient, [name]:value});
    }

    const toUpperCase = (aString) =>{
        return aString.charAt(0).toUpperCase() + aString.slice(1)
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
                <h3 className="pageTitle">Edit {ingredient.name ? toUpperCase(ingredient.name) : "New "+ingredient.type}</h3>
                
                <div className="inputFieldHolder">
                    <h4>Type</h4>

                    <h5>{getType()}</h5>
                </div>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Name</h4>

                        <input className="ptSearchInput" onChange={onChange} type="text" name="name" value={toUpperCase(ingredient.name)} placeholder={ `Enter ${inventoryType.toLowerCase()} name`} />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Purchase Quanity</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="text" name="purchase_quantity" value={ingredient.purchase_quantity} placeholder="Enter purchase quantity" />
                    </div>
                </div>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Purchase Size</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="text" name="purchase_size" value={ingredient.purchase_size} placeholder="Enter purchase size" />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Price</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="price" value={ingredient.price} />
                    </div>
                </div>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Quantity In Stock</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="quantity_in_stock" value={ingredient.quantity_in_stock} />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Low Threshold</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="lowLevel" value={ingredient.lowLevel && (ingredient.lowLevel > ingredient.quantity_in_stock ? ingredient.quantity_in_stock : ingredient.lowLevel )} />
                    </div>
                </div>

                <div className="popButtonHolder">
                    <button onClick={e => saveEditedInventory(e, ingredient)} className="colorWhite rectangleButtonPrimary">Save</button>
                    <button onClick={closeEditIngredient} className="colorBlack rectangleButtonSecondary">Close</button>
                </div>
        </div>
    </div>
}

export default EditIngredient;