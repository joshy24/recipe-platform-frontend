
import { useState } from "react"

import { toUpperCase } from "../../utils/helper"


const AddRecipe = ({closeAddRecipe, addRecipe, units}) => {

    const [recipe, setRecipe] = useState({name: "", description: ""})
    const [ayield, setYield] = useState({ amount: 0, unit: units[0]._id})

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
                        units && units.map(aUnit => {
                            return <option value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                        })
                    }
                </select>
            </div>

        
            <h5>You can add ingredients after saving the recipe.</h5>

            <div className="popButtonHolder">
                <button onClick={e => addRecipe(e, {...recipe, yield: ayield})} className="colorWhite rectangleButtonPrimary">Save</button>
                <button onClick={closeAddRecipe} className="colorBlack rectangleButtonSecondary">Close</button>
            </div>
        </div>
    </div>
}

export default AddRecipe;