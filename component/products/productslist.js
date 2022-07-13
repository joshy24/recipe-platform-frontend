
import styles from "../../styles/Products.module.css"

import ProductItem from "./productitem"

const today = new Date();

const products = [{
    name: "Shawarma",
    created: "December 17, 2022 03:24:00",
    tcost: 1000,
    ingredients: 9
},{
    name: "Spag",
    created: "December 17, 2022 03:24:00",
    tcost: 500,
    ingredients: 8
},{
    name: "Meatpie",
    created: "December 17, 2022 03:24:00",
    tcost: 900,
    ingredients: 7
}]

const ProductsList = () => {
    return <div className={styles.productsListHolder}>

        <div className={styles.productsListHolderTitle}>
            <div className={styles.productName}>
                <h5>Name</h5>
            </div>
            <div className={styles.productDate}>
                <h5>Date<br />Created</h5>
            </div>
            
            <div className={styles.productTotalCost}>
                <h5>Total<br />cost</h5>
            </div>
            <div className={styles.productIngredientCount}>
                <h5>Ingredient<br />count</h5>
            </div>
            <div className={styles.productIngredientView}>
                
            </div>
            <div className={styles.productIngredientDelete}>
                
            </div>

        </div>

        {
            products && products.map(product => { 
                return <ProductItem key={product.name} product={product} />
            })
        }


    </div>
}

export default ProductsList;