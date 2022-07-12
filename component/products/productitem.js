import { useState } from "react"

import styles from "../../styles/Products.module.css"

import { useRouter } from "next/router"

import {getDate, getAmount} from "../../utils/helper"

import DeleteDialog from "../general/deletedialog"

const ProductItem = ({product}) => {

    const router = useRouter()

    const navigateToProduct = () => {

        router.push("/product")
    }

    const [showDelete, setShowDelete] = useState(false)

    const showDeleteDialog = () => {
        setShowDelete(true)
    }

    const onPerformDeleteClicked = () => {
        setShowDelete(false);
    }

    const onCancelDeleteClicked = () => {
        setShowDelete(false);
    }

    return <>
        <div className={`whiteBox ${styles.productItemHolder}`}>
            <div className={styles.productName}>
                <h5 className="colorSecondary">{product.name}</h5>
            </div>
            <div className={styles.productDate}>
                <h5>{getDate(product.created)}</h5>
            </div>
            <div className={styles.productTotalCost}>
                <h5>{getAmount(product.tcost)}</h5>
            </div>
            <div className={styles.productIngredientCount}>
                <h5>{product.ingredients}</h5>
            </div>
            <div onClick={navigateToProduct} className={styles.productIngredientView}>
                <button className="button secondaryButton colorWhite">
                    View
                </button>
            </div>
            <div onClick={showDeleteDialog} className={styles.productIngredientDelete}>
                <button className="button greyButton colorBlack ${styles.productIngredientDeleteButton">
                    Delete
                </button>
            </div>

        </div>
        {
            showDelete && <DeleteDialog onPerformDeleteClicked={onPerformDeleteClicked} onCancelDeleteClicked={onCancelDeleteClicked} type={"Product"} message={"Confirm that you want to delete this product. It will also be removed from all orders it is attached to."}  />
        }
    </>
}

export default ProductItem;