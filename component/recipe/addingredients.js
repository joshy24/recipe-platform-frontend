


const AddIngredients = () => {

    const [ingredients, setIngredients] = useState([])

    return <div className="popUp">
        <div className="popUpInnerContent">
            <div className="popUpInnerContentTop">
                <h3 className="pageTitle">{ingredient.name ? ingredient.name : "New Ingredient"}</h3>

                <button className={ingredients.length > 0 ? "primaryButton" : "greyButton"}>
                    Add Selected
                </button>
            </div>
            
        </div>
    </div>

}

export default AddIngredients;