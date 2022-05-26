
import { useState } from "react"

const AddIngredient = ({closeAddIngredient}) => {

    const [ingredient, setIngredient] = useState({name: "", purchase_quantity: "", purchase_size: "", price: 0})
    
    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setIngredient({...ingredient, [name]:value});
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
                <h3 className="pageTitle">{ingredient.name ? ingredient.name : "New Ingredient"}</h3>
                
                <div className="inputFieldHolder">
                    <h4>Name</h4>

                    <input onChange={onChange} type="text" name="name" value={ingredient.name} placeholder="Enter ingredient name" />
                </div>

                <div className="inputFieldHolder">
                    <h4>Purchase Quanity</h4>
                    
                    <input onChange={onChange} type="text" name="purchase_quantity" value={ingredient.purchase_quantity} placeholder="Enter purchase quantity" />
                </div>

                <div className="inputFieldHolder">
                    <h4>Purchase Size</h4>
                    
                    <input onChange={onChange} type="text" name="purchase_size" value={ingredient.purchase_size} placeholder="Enter purchase size" />
                </div>

                <div className="inputFieldHolder">
                    <h4>Price</h4>
                    
                    <input onChange={onChange} type="number" name="price" value={ingredient.price} />
                </div>

                <div className="popButtonHolder">
                    <button onClick={closeAddIngredient} className="colorWhite secondaryButton">Save</button>
                    <button onClick={closeAddIngredient} className="colorBlack greyButton">Close</button>
                </div>
        </div>
    </div>
}

export default AddIngredient;