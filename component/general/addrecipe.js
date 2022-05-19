
import { useState } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddRecipe = ({closeAddRecipe}) => {

    const [recipe, setRecipe] = useState({name: "", fulfillment_date: "",  status: "", labour_cost: 0, profit: "", total_cost: 0})

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
                <h4>Fulfillment Date</h4>
                
                <DatePicker minDate={new Date()} onChange={date => setRecipe({...recipe, fulfillment_date:date})} selected={recipe.fulfillment_date} />
            </div>

            <div className="inputFieldHolder">
                <h4>Status</h4>
                
                <input onChange={onChange} type="text" name="status" value={recipe.status} placeholder="Enter Status" />
            </div>

            <div className="inputFieldHolder">
                <h4>Labour Cost</h4>
                
                <input onChange={onChange} type="number" name="labour_cost" value={recipe.labour_cost} />
            </div>

            <div className="inputFieldHolder">
                <h4>Profit Margin</h4>
                
                <input onChange={onChange} type="number" name="profit" value={recipe.profit} /> %
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