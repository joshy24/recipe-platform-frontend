import { useState } from 'react'

import { toUpperCase } from "../../utils/helper"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditOrder = ({hideEditOrder, editOrder, aOrder}) => {

    const [order, setOrder] = useState({name: aOrder.name, status: aOrder.status, fulfillment_date: aOrder.fulfillment_date})

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setOrder({...order, [name]:value});
    }

    return (
        <div className="popUp">
            <div className="popUpInnerContent">
                <h3 className="pageTitle">{order.name.length > 0 ? toUpperCase(order.name) : "New Order"}</h3>
            
                <div className="inputFieldHolder">
                    <h4>Name</h4>

                    <input className="ptInput" onChange={onChange} type="text" name="name" value={order.name} placeholder="Enter order name" />
                </div>

                {/*<div className="inputFieldHolder">
                    <h4>Description</h4>

                    <input className="ptInput" onChange={onChange} type="text" name="description" value={order.description} placeholder="Enter order description" />
                </div>*/}

                <div className="inputFieldHolder">
                    <h4>Fulfillment date</h4>

                    <DatePicker className="ptInput" minDate={new Date()} onChange={date => setOrder({...order, fulfillment_date:date})} selected={new Date(order.fulfillment_date)} />

                    {/*<input className="ptInput" onChange={onChange} type="text" name="fulfillment_date" value={getDate(aOrder.fulfillment_date)} placeholder="Enter order description" />*/}
                </div>

                {/*<div className="inputFieldHolder">
                    <h4>Fulfillment Date</h4>
                
                    <DatePicker className="ptInput" minDate={new Date()} onChange={date => setOrder({...order, fulfillment_date:date})} selected={order.fulfillment_date} />
            </div>*/}


                <div className="popButtonHolder">
                    <button onClick={e => editOrder(e, order)} className="colorWhite rectangleButtonPrimary">Save</button>
                    <button onClick={hideEditOrder} className="colorBlack rectangleButtonSecondary">Close</button>
                </div>
            </div>
        </div>
    )
}

export default EditOrder
