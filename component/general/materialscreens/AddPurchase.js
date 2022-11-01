import { useState } from "react"

const AddPurchase = ({setPurchase,moveCurrentUI, units, closeAddMaterial}) => {

    
    const [purchase, setAPurchase] = useState({amount:0, price:0, unit:units[0]._id})

    function onChange(e){
        const value = e.target.value;
        const name = e.target.name
        
        setAPurchase({...purchase, [name]:value})
    }

    const continueClicked = () => {
        if(!!purchase.amount && !!purchase.price && !!purchase.unit){
            setPurchase(purchase)
            moveCurrentUI(4)
        }
    }

    return <div>
        <h3 style={{lineHeight: "25px"}} className="pageTitle">How much did you purchase the quantity you bought?</h3>

        <div style={{display: "flex", alignItems: "center"}}>
            <h5 style={{...marginRightStyle, whiteSpace: "nowrap"}}>I bought </h5>
            <input style={marginRightStyle} className="ptSearchInput" onChange={onChange} type="number" name="amount" value={purchase.amount} placeholder="Enter name" />
            <select style={marginRightStyle} onChange={onChange} name="unit" className="pageContentTopSelectField ptSearchInput">
                {
                    units.map(aUnit => {
                        return <option key={aUnit._id} value={aUnit._id}>{aUnit.name} ({aUnit.abbreviation})</option>
                    })
                }
            </select>
            <h5 style={{...marginRightStyle, whiteSpace: "nowrap"}}>at ₦</h5>
            <input className="ptSearchInput" onChange={onChange} type="number" name="price" value={purchase.price} placeholder="Enter name" />
        </div>     

        <div className="popButtonHolder">
            <button onClick={continueClicked} className="colorWhite rectangleButtonPrimary">Continue</button>
            <button onClick={closeAddMaterial} className="colorBlack rectangleButtonSecondary">Close</button>
        </div>       
    </div>
}

export default AddPurchase;


const marginRightStyle = {
    marginRight: "8px"
}