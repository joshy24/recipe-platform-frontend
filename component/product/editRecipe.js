
import { useState } from 'react'

import { toUpperCase } from "../../utils/helper"


const EditProductRecipe = ({recipe, onPerformEditClicked, onCancelEditClicked}) => {

    const [recipeYield, setRecipeYield] = useState({amount: recipe.yield.amount, unit: recipe.yield.unit._id})

    const doEdit = () => {
        if(quantity !== recipe.yield.amount){
            onPerformEditClicked({...recipe, yield: recipeYield})
        }
    }

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setRecipeYield({...recipeYield, [name]:value});
    }

    return <div className="popUp">
                <div className="popUpInnerContent">
                    <h3 className="pageTitle">Edit {recipe.name.length > 0 && toUpperCase(recipe.name)}</h3>
                
                    <div className="inputFieldHolder">
                        <h4>Amount</h4>

                        <input className="ptInput" onChange={onChange} type="number" name="amount" value={recipeYield.amount} />
                    </div>

                    <div className="inputFieldHolder">
                        <h4>Unit</h4>

                        <select defaultValue={recipe.yield.unit._id} style={{margin: "0px", maxWidth: "100%"}} onChange={e => onChange(e)} name="unit" className="pageContentTopSelectField ptSearchInput">
                            {
                                recipe && recipe.units && recipe.units.map(aUnit => {
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

export default EditProductRecipe;
