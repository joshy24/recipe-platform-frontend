import { useState } from "react"

const AddName = ({setName,moveCurrentUI, closeAddMaterial}) => {

    const [name,setAName] = useState("")
    
    function onChange(e){
        const value = e.target.value;
        
        setAName(value)
    }
    
    const continueClicked = () => {
        if(name.length > 0){
            setName(name)
            moveCurrentUI(2)
        }
    }

    return <div>
        <h3 className="pageTitle">What is the name of this new material?</h3>

        <input className="ptSearchInput" onChange={onChange} type="text" name="name" value={name} placeholder="Enter name" />     

        <div className="popButtonHolder">
            <button onClick={continueClicked} className="colorWhite rectangleButtonPrimary">Continue</button>
            <button onClick={closeAddMaterial} className="colorBlack rectangleButtonSecondary">Close</button>
        </div>       
    </div>
}

export default AddName;