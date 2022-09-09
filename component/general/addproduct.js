
import { useState } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { checkValidProductToAdd } from "../../utils/helper"

const AddProduct = ({closeAdd, addProduct}) => {

    const [product, setProduct] = useState({name: "", labour_cost: 0, actual_selling_price:0, overhead_cost:0, profit_margin: 20})
    const [error, setError] = useState("")

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setProduct({...product, [name]:value});
    }

    const doAddProduct = (e, data) => {
        setError("")
        e.preventDefault()
        const checkValid = checkValidProductToAdd(data)

        if(!checkValid){
            setError("The name and profit margin fields are compulsory")
            return;
        }
        

        addProduct(data)
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
            <h3 className="pageTitle">{product.name.length>0 ? product.name : "New Product"}</h3>

            {
                error && error.length > 0 && <h5 style={{marginBottom: "12px"}} className="colorRed">{error}</h5>
            }
            
            <div className="inputFieldHolder">
                <h4>Name</h4>

                <input className="ptInput" onChange={onChange} type="text" name="name" value={product.name} placeholder="Enter Product name" />
            </div>

            <h5>You can add recipes and materials after saving the product.</h5>

            <div className="popButtonHolder">
                <button onClick={e => doAddProduct(e, product)} className="rectangleButtonPrimary">Save</button>
                <button onClick={closeAdd} className="rectangleButtonSecondary">Close</button>
            </div>
        </div>
    </div>
}

export default AddProduct;