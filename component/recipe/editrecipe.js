
import { useState } from "react"

import { toUpperCase } from "../../utils/helper"

const EditRecipe = ({hideEditRecipe, editRecipe, aRecipe}) => {

    const [recipe, setRecipe] = useState({name: aRecipe.name, description: aRecipe.description})
    const [ayield, setYield] = useState({ amount: aRecipe.yield ? aRecipe.yield.amount : 0, unit: aRecipe.yield ? aRecipe.yield.unit : ""})

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setRecipe({...recipe, [name]:value});
    }

    const onYieldChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setYield({...ayield, [name]:value});
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
            <h3 className="pageTitle">{recipe.name.length>0 ? toUpperCase(recipe.name) : "New Recipe"}</h3>
            
            <div className="inputFieldHolder">
                <h4>Name</h4>

                <input className="ptInput" onChange={onChange} type="text" name="name" value={recipe.name} placeholder="Enter recipe name" />
            </div>

            <div className="inputFieldHolder">
                <h4>Description</h4>

                <input className="ptInput" onChange={onChange} type="text" name="description" value={recipe.description} placeholder="Enter recipe description" />
            </div>

            <div className="inputFieldHolder">
                <h4>Yield</h4>

                <input className="ptInput" onChange={onYieldChange} type="text" name="amount" value={ayield.amount} placeholder="Enter recipe description" />
            </div>

            <div className="inputFieldHolder">
                <h4>Unit</h4>

                <select style={{marginLeft: "0px", maxWidth: "100%"}} onChange={onYieldChange} name="unit" className="pageContentTopSelectField ptSearchInput">
                    {
                        aRecipe.units && aRecipe.units.map(aUnit => {
                            return <option key={aUnit._id} value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                        })
                    }
                </select>
            </div>

            <div className="popButtonHolder">
                <button onClick={e => editRecipe(e, {...recipe, yield: ayield})} className="colorWhite rectangleButtonPrimary">Save</button>
                <button onClick={hideEditRecipe} className="colorBlack rectangleButtonSecondary">Close</button>
            </div>
        </div>
    </div>
}

export default EditRecipe;