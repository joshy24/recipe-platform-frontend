
import { useState } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddOrder = ({closeAddOrder}) => {

    const [order, setOrder] = useState({name: "", fulfillment_date: "",  status: "", labour_cost: 0, profit: 20, total_cost: 0})

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

                <input onChange={onChange} type="text" name="name" value={order.name} placeholder="Enter order name" />
            </div>

            <div className="inputFieldHolder">
                <h4>Fulfillment Date</h4>
                
                <DatePicker minDate={new Date()} onChange={date => setOrder({...order, fulfillment_date:date})} selected={order.fulfillment_date} />
            </div>

            <div className="inputFieldHolder">
                <h4>Status</h4>
                
                <input onChange={onChange} type="text" name="status" value={order.status} placeholder="Enter Status" />
            </div>

            <div className="inputFieldHolder">
                <h4>Labour Cost</h4>
                
                <input onChange={onChange} type="number" name="labour_cost" value={order.labour_cost} />
            </div>

            <div className="inputFieldHolder">
                <h4>Profit Margin</h4>
                
                <input onChange={onChange} type="number" name="profit" value={order.profit} /> %
            </div>

            <h5>You can add recipes after saving order.</h5>

            <div className="popButtonHolder">
                <button onClick={closeAddOrder} className="colorWhite secondaryButton">Save</button>
                <button onClick={closeAddOrder} className="colorBlack greyButton">Close</button>
            </div>
        </div>
    </div>
}

export default AddOrder;