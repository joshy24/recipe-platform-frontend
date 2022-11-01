
import { useState } from 'react'

import { toUpperCase } from "../../utils/helper"


const EditProductMaterial = ({material, onPerformEditClicked, onCancelEditClicked, units}) => {
    console.log(material)
    const [quantity, setQuantity] = useState({quantity: material.quantity})

    const doEdit = () => {
        if(quantity !== material.quantity){
            onPerformEditClicked({...material, quantity: quantity})
        }
    }

    const onChange = (e) => {
        const value = e.target.value

        setQuantity(value);
    }

    return <div className="popUp">
                <div className="popUpInnerContent">
                    <h3 className="pageTitle">Edit {material.name.length > 0 && toUpperCase(material.name)}</h3>
                
                    <div className="inputFieldHolder">
                        <h4>Amount</h4>

                        <input className="ptInput" onChange={onChange} type="number" name="name" value={quantity} />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Unit</h4>

                        <select defaultValue={recipe.yield.unit._id} style={{margin: "0px", maxWidth: "100%"}} onChange={e => onChange(e)} name="unit" className="pageContentTopSelectField ptSearchInput">
                            {
                                units && units.map(aUnit => {
                                    return <option value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="popButtonHolder">
                        <button onClick={doEdit} className="colorWhite rectangleButtonPrimary">Save</button>
                        <button onClick={onCancelEditClicked} className="colorBlack rectangleButtonSecondary">Close</button>
                    </div>
                </div>
            </div>
}

export default EditProductMaterial;
