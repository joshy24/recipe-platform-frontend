
import { useState } from "react"

import { toUpperCase } from "../../utils/helper"


const AddRecipe = ({closeAddRecipe, addRecipe}) => {

    const [recipe, setRecipe] = useState({name: "", description: ""})
    const [ayield, setYield] = useState({ amount: 0, unit: ""})

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

                <input onChange={onChange} type="text" name="name" value={recipe.name} placeholder="Enter recipe name" />
            </div>

            <div className="inputFieldHolder">
                <h4>Description</h4>

                <input onChange={onChange} type="text" name="description" value={recipe.description} placeholder="Enter recipe description" />
            </div>

            <div className="inputFieldHolder">
                <h4>Yield</h4>

                <input onChange={onYieldChange} type="text" name="amount" value={ayield.amount} placeholder="Enter recipe description" />
            </div>

            <div className="inputFieldHolder">
                <h4>Unit</h4>

                <input onChange={onYieldChange} type="text" name="unit" value={ayield.description} placeholder="Enter recipe unit" />
            </div>

        
            <h5>You can add ingredients and set the yield after saving the recipe.</h5>

            <div className="popButtonHolder">
                <button onClick={e => addRecipe(e, {...recipe, yield: ayield})} className="colorWhite rectangleButtonPrimary">Save</button>
                <button onClick={closeAddRecipe} className="colorBlack rectangleButtonSecondary">Close</button>
            </div>
        </div>
    </div>
}

export default AddRecipe;