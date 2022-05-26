
import { useState } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddRecipe = ({closeAddRecipe}) => {

    const [recipe, setRecipe] = useState({name: "", labour_cost: 0, total_cost: 0})

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setRecipe({...recipe, [name]:value});
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
            <h3 className="pageTitle">{recipe.name.length>0 ? recipe.name : "New Recipe"}</h3>
            
            <div className="inputFieldHolder">
                <h4>Name</h4>

                <input onChange={onChange} type="text" name="name" value={recipe.name} placeholder="Enter recipe name" />
            </div>

            <div className="inputFieldHolder">
                <h4>Total cost</h4>
                
                <input onChange={onChange} type="number" name="labour_cost" value={recipe.total_cost} />
            </div>

            <h5>You can add ingredients after saving recipe.</h5>

            <div className="popButtonHolder">
                <button onClick={closeAddRecipe} className="colorWhite secondaryButton">Save</button>
                <button onClick={closeAddRecipe} className="colorBlack greyButton">Close</button>
            </div>
        </div>
    </div>
}

export default AddRecipe;