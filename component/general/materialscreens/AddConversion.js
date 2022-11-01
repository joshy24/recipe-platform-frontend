import { useState } from "react"

const AddConversion = ({setConversion,moveCurrentUI,closeAddMaterial}) => {
    
    const [conversion,setAConversion] = useState(0)

    function onChange(e){
        const value = e.target.value;
        
        setAConversion(value)
    }
    
    const continueClicked = () => {
        if(conversion > 0){
            setConversion(conversion)
            moveCurrentUI(3)
        }
    }

    return <div>
        <h3 style={{lineHeight: "25px"}} className="pageTitle">How many pieces are within a packet/carton?</h3>

        <input className="ptSearchInput" onChange={onChange} type="number" name="conversion" value={conversion} placeholder="Enter number" />     

        <div className="popButtonHolder">
            <button onClick={continueClicked} className="colorWhite rectangleButtonPrimary">Continue</button>
            <button onClick={closeAddMaterial} className="colorBlack rectangleButtonSecondary">Close</button>
        </div>       
    </div>
}

export default AddConversion;