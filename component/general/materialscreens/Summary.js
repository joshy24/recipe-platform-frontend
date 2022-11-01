
import { useState } from "react"

import { getAmount, toUpperCase } from "../../../utils/helper"

const Summary = ({saveMaterial, newMaterial, units, closeAddMaterial}) => {
    
    const [material, setMaterial] = useState(newMaterial)
    
    const onChange = (e) => {
        let value = e.target.value
        const name = e.target.name

        if(name === "purchase_unit"){
            value = units.filter(aUnit => aUnit._id == value).shift()
        }

        setMaterial({...material, [name]:value});
    }

    const doSaveMaterial = () => {
        if(!!material.name && !!material.purchase_quantity && !!material.purchase_unit && !!material.price && !!material.quantity_in_stock && !!material.lowLevel && !!material.pieces){
            saveMaterial(material)
            return;
        }
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
                <h3 className="pageTitle">{material.name}</h3>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Name</h4>

                        <input className="ptSearchInput" onChange={onChange} type="text" name="name" value={toUpperCase(material.name)} />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Purchase Quanity</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="text" name="purchase_quantity" value={material.purchase_quantity} placeholder="Enter purchase quantity" />
                    </div>
                </div>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Purchase Unit</h4>
                        
                        <select style={{marginLeft: "0px"}} onChange={onChange} name="purchase_unit" className="pageContentTopSelectField ptSearchInput">
                            {
                                units.map(aUnit => {
                                    return <option value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Price</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="price" value={material.price} />
                    </div>
                </div>

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Quantity In Stock</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="quantity_in_stock" value={material.quantity_in_stock} />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Low Threshold</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="lowLevel" value={material.lowLevel} />
                    </div>
                </div>

                

                <div className="inputHorizontalHolder">
                    <div className="inputFieldHolder">
                        <h4>Pieces per Packet/Carton</h4>
                        
                        <input className="ptSearchInput" onChange={onChange} type="number" name="pieces" value={material.pieces} />
                    </div>
                </div>


                <div className="popButtonHolder">
                    <button onClick={doSaveMaterial} className="colorWhite rectangleButtonPrimary">Save</button>
                    <button onClick={closeAddMaterial} className="colorBlack rectangleButtonSecondary">Close</button>
                </div>
        </div>
    </div>
}

export default Summary;