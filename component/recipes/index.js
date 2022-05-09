
import React from 'react'
import RecipesList from './RecipesList'

import styles from "../../styles/Recipes.module.css"

const RecipesIndex = () => {


    return (
        <div className={styles.recipesIndex}>
            <div  className={styles.recipesTop}>
                <h2 className="pageTitle">Recipes</h2>
                <div>
                    <button className={styles.recipesButton}>Search</button>
                    <button className={styles.recipesButton}>Add Recipe</button>
                </div>
            </div>
            <div>
                <h4>Total - 100</h4>
            </div>


            <div className={styles.recipesListHolder}>
                <RecipesList />
            </div>

            
        </div>
    )
}

export default RecipesIndex;


           
            
           
