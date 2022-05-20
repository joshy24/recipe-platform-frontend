import styles from "../../styles/Ingredients.module.css"

import IngredientIndex from "../../component/ingredient/index"

import withAuth from "../../utils/withAuth"

const Ingredient = ({ingredient}) => {
    return <div className="pageHolder">
        <IngredientIndex ingredient={ingredient} />
    </div>
}

export default withAuth(Ingredient);