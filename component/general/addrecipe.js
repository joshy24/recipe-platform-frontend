
import { useState } from "react"

import { toUpperCase } from "../../utils/helper"


const AddRecipe = ({closeAddRecipe, addRecipe}) => {

    const [recipe, setRecipe] = useState({name: "", description: ""})

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setRecipe({...recipe, [name]:value});
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

        
            <h5>You can add ingredients and set the yield after saving the recipe.</h5>

            <div className="popButtonHolder">
                <button onClick={e => addRecipe(e, recipe)} className="colorWhite rectangleButtonPrimary">Save</button>
                <button onClick={closeAddRecipe} className="colorBlack rectangleButtonSecondary">Close</button>
            </div>
        </div>
    </div>
}

export default AddRecipe;