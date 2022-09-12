
import { useState } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { checkValidProductToAdd, checkValidLabourCost, checkValidOverheadCost } from "../../utils/helper"

const EditProduct = ({productToEdit, closeEdit, editProduct, proposedSellingPrice}) => {

    const [product, setProduct] = useState({name: productToEdit.name, labour_cost: productToEdit.labour_cost, actual_selling_price: productToEdit.actual_selling_price, overhead_cost:productToEdit.overhead_cost, profit_margin: productToEdit.profit_margin})
    const [error, setError] = useState("")

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setProduct({...product, [name]:value});
    }

    const doEditProduct = () => {
        setError("")

        if(!checkValidProductToAdd(product)){
            setError("The name field is required")
            return;
        }

        if(!checkValidLabourCost(product)){
            setError("The labour cost needs to be set before saving")
            return;
        }


        if(!checkValidOverheadCost(product)){
            setError("The overhead cost needs to be set before saving")
            return;
        }
    
        
        editProduct(product)
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
            <h3 className="pageTitle">Edit {product.name.length>0 ? product.name : "New Product"}</h3>

            {
                error && error.length > 0 && <h5 style={{marginBottom: "12px"}} className="colorRed">{error}</h5>
            }
            
            <div className="inputFieldHolder">
                <h4>Name</h4>

                <input className="ptInput" onChange={onChange} type="text" name="name" value={product.name} placeholder="Enter Product name" />
            </div>

            <div className="inputFieldHolder">
                <h4>Labour Cost</h4>
                
                <input className="ptInput" onChange={onChange} type="number" name="labour_cost" value={product.labour_cost} />
            </div>

            <div className="inputFieldHolder">
                <h4>Overhead Cost</h4>
                
                <input className="ptInput" onChange={onChange} type="number" name="overhead_cost" value={product.overhead_cost} />
            </div>

            <div className="inputFieldHolder">
                <h4>Profit Margin</h4>
                
                <input className="ptInput" onChange={onChange} type="number" name="profit_margin" value={product.profit_margin} />
            </div>

            <div className="inputFieldHolder">
                <h4>Proposed Selling Price</h4>
                
                <h5>{proposedSellingPrice}</h5>
            </div>

            <div className="inputFieldHolder">
                <h4>Actual Selling Price</h4>
                
                <input className="ptInput" onChange={onChange} type="number" name="actual_selling_price" value={product.actual_selling_price} />
            </div>

            <div className="popButtonHolder">
                <button onClick={doEditProduct} className="rectangleButtonPrimary">Save</button>
                <button onClick={closeEdit} className="rectangleButtonSecondary">Close</button>
            </div>
        </div>
    </div>
}

export default EditProduct;