
import { useState } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddOrder = ({closeAdd, addOrder}) => {

    const [order, setOrder] = useState({name: "", fulfillment_date: ""})

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setOrder({...order, [name]:value});
    }

    return <div className="popUp">
        <div className="popUpInnerContent">
            <h3 className="pageTitle">{order.name.length>0 ? order.name : "New Order"}</h3>
            
            <div className="inputFieldHolder">
                <h4>Name</h4>

                <input onChange={onChange} type="text" name="name" value={order.name} placeholder="Enter Order name" />
            </div>

            <div className="inputFieldHolder">
                <h4>Fulfillment Date</h4>
                
                <DatePicker minDate={new Date()} onChange={date => setOrder({...order, fulfillment_date:date})} selected={order.fulfillment_date} />
            </div>

            <h5>You can add products after saving the order.</h5>

            <div className="popButtonHolder">
                <button onClick={e => addOrder(e, order)} className="colorWhite secondaryButton">Save</button>
                <button onClick={closeAdd} className="colorBlack greyButton">Close</button>
            </div>
        </div>
    </div>
}

export default AddOrder;