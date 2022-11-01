
import { useState } from "react"

import { getAmount, toUpperCase } from "../../utils/helper"

const EditIngredient = ({closeEditIngredient, saveEditedInventory, inventoryToEdit, inventoryType, units}) => {

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

    const [ingredient, setIngredient] = useState({type: getType(), name: inventoryToEdit.name, purchase_quantity: inventoryToEdit.purchase_quantity.amount, purchase_unit: inventoryToEdit.purchase_quantity.unit, price: inventoryToEdit.price, quantity_in_stock: inventoryToEdit.quantity_in_stock, lowLevel: inventoryToEdit.lowLevel, pieces: inventoryToEdit.pieces})

    const onChange = (e) => {
        let value = e.target.value
        const name = e.target.name

        if(name === "purchase_unit"){
            value = units.filter(aUnit => aUnit._id == value).shift()
        }

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
                        <h4>Purchase Unit</h4>
                        
                        <select defaultValue={ingredient.purchase_unit} style={{marginLeft: "0px"}} onChange={onChange} name="purchase_unit" className="pageContentTopSelectField ptSearchInput">
                            {
                                units.map(aUnit => {
                                    return <option value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                                })
                            }
                        </select>
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
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="lowLevel" value={ingredient.lowLevel} />
                    </div>
                </div>

                {
                    ingredient.type == "Material" && <div className="inputHorizontalHolder">
                        <div className="inputFieldHolder">
                            <h4>Pieces</h4>
                            
                            <input className="ptSearchInput" onChange={onChange} type="number" name="pieces" value={ingredient.pieces} />
                        </div>
                    </div>
                }

                <div className="popButtonHolder">
                    <button onClick={e => saveEditedInventory(e, ingredient)} className="colorWhite rectangleButtonPrimary">Save</button>
                    <button onClick={closeEditIngredient} className="colorBlack rectangleButtonSecondary">Close</button>
                </div>
        </div>
    </div>
}

export default EditIngredient;