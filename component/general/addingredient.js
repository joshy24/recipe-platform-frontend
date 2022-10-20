
import { useState } from "react"

import { getAmount, toUpperCase } from "../../utils/helper"

const AddIngredient = ({closeAddIngredient, addInventory, units}) => {
    const [ingredient, setIngredient] = useState({type: "Material",name: "", purchase_quantity: "", purchase_size: "", price: 0, quantity_in_stock: 0, lowLevel: 0})
    
    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        
        setIngredient({...ingredient, [name]:value});
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
                <h3 className="pageTitle">{ingredient.name ? toUpperCase(ingredient.name) : "New "+ingredient.type}</h3>
                
                <div className="inputFieldHolder">
                    <h4>Type</h4>

                    <select style={{marginLeft: "0px", width:"100%"}} onChange={onChange} name="type" className="pageContentTopSelectField">
                        <option value="Material">
                            Material
                        </option>
                        <option value="Ingredient">
                            Ingredient
                        </option>
                    </select>
                </div>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Name</h4>

                        <input className="ptSearchInput" onChange={onChange} type="text" name="name" value={toUpperCase(ingredient.name)} placeholder={ `Enter ${ingredient.type.toLowerCase()} name`} />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Purchase Quanity</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="text" name="purchase_quantity" value={ingredient.purchase_quantity} placeholder="Enter purchase quantity" />
                    </div>
                </div>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Purchase Unit</h4>
                        
                        <select style={{marginLeft: "0px"}} onChange={onChange} name="purchase_size" className="pageContentTopSelectField ptSearchInput">
                            {
                                units.map(aUnit => {
                                    return <option value={aUnit.name}>{aUnit.name} ({aUnit.abbreviation})</option>
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

                <div className="popButtonHolder">
                    <button onClick={e => addInventory(e, ingredient)} className="colorWhite rectangleButtonPrimary">Save</button>
                    <button onClick={closeAddIngredient} className="colorBlack rectangleButtonSecondary">Close</button>
                </div>
        </div>
    </div>
}

export default AddIngredient;