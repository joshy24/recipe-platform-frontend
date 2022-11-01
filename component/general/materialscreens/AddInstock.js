import { useState } from "react"

const AddInStock = ({setInStock, moveCurrentUI, material_name, unit_name, closeAddMaterial}) => {
    
    const [inStockObj, setInStockObj] = useState({inStock:0, lowLevel: 0})

    function onChange(e){
        const value = e.target.value;
        const name = e.target.name
        
        setInStockObj({...inStockObj, [name]:value})
    }

    const continueClicked = () => {
        if(inStockObj.inStock > 0 && inStockObj.lowLevel > 0){
            setInStock(inStockObj)
            moveCurrentUI(5)
        }
    }

    return <div>
        <h3 style={{lineHeight: "25px"}} className="pageTitle">How many {unit_name} of {material_name} do you have in stock?</h3>

        <input className="ptSearchInput" onChange={onChange} type="number" name="inStock" value={inStockObj.inStock} placeholder="Enter number" />     

        <h3 style={{lineHeight: "25px", marginTop: "50px"}} className="pageTitle">At what level would you need to restock?</h3>

        <input className="ptSearchInput" onChange={onChange} type="number" name="lowLevel" value={inStockObj.lowLevel} placeholder="Enter number" />     

        <div className="popButtonHolder">
            <button onClick={continueClicked} className="colorWhite rectangleButtonPrimary">Continue</button>
            <button onClick={closeAddMaterial} className="colorBlack rectangleButtonSecondary">Close</button>
        </div>       
    </div>
}

export default AddInStock;