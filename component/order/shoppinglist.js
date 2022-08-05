
import AppContext from "../../pages/AppContext";

import { useEffect, useState, useContext } from "react"

import EmptyResult from "../general/emptyResult"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash, faSearch, faFileExport, faAdd, faPen } from '@fortawesome/free-solid-svg-icons'

import { toUpperCase, getAmount, downloadFile } from "../../utils/helper"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { postRequest, getRequest, putRequest, deleteRequest } from "../../utils/api.requests"

import { ORDER_SHOPPING_LIST } from "../../utils/api.endpoints"

const ShoppingList = ({id}) => {

    const value = useContext(AppContext);

    const [order,setOrder] = useState({})

    useEffect(() => {
        loadShoppingList()
    }, [])

    const loadShoppingList = async() => {
        value.setBlockingLoading(true)

        try{
            const result = await getRequest(ORDER_SHOPPING_LIST+"?id="+id)

            console.log(result)

            value.setBlockingLoading(false)
        }
        catch(err){
            value.setBlockingLoading(false)
            console.log(err)
        }
    }

    return <>

    </>
}

export default ShoppingList;