
import { useState } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddProduct = ({closeAdd, addProduct}) => {

    const [product, setProduct] = useState({name: "", labour_cost: 0, actual_selling_price:0, overhead_cost:0, profit_margin: 20})

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setProduct({...product, [name]:value});
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
            <h3 className="pageTitle">{product.name.length>0 ? product.name : "New Product"}</h3>
            
            <div className="inputFieldHolder">
                <h4>Name</h4>

                <input onChange={onChange} type="text" name="name" value={product.name} placeholder="Enter Product name" />
            </div>

            <div className="inputFieldHolder">
                <h4>Labour Cost</h4>
                
                <input onChange={onChange} type="number" name="labour_cost" value={product.labour_cost} />
            </div>

            <div className="inputFieldHolder">
                <h4>Overhead Cost</h4>
                
                <input onChange={onChange} type="number" name="overhead_cost" value={product.overhead_cost} />
            </div>

            <div className="inputFieldHolder">
                <h4>Actual Selling Price</h4>
                
                <input onChange={onChange} type="number" name="actual_selling_price" value={product.actual_selling_price} />
            </div>

            <div className="inputFieldHolder">
                <h4>Profit Margin</h4>
                
                <input onChange={onChange} type="number" name="profit_margin" value={product.profit_margin} /> %
            </div>

            <h5>You can add recipes and materials after saving the product.</h5>

            <div className="popButtonHolder">
                <button onClick={e => addProduct(e, product)} className="colorWhite secondaryButton">Save</button>
                <button onClick={closeAdd} className="colorBlack greyButton">Close</button>
            </div>
        </div>
    </div>
}

export default AddProduct;