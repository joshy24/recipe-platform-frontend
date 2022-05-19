
import React from 'react'
import RecipesList from './RecipesList'

import styles from "../../styles/Recipes.module.css"
import AddRecipe from '../general/addrecipe'

import { useState } from "react"

const RecipesIndex = () => {

    const [showAdd, setShowAdd] = useState(false)

    const showAddRecipe = () => {
        setShowAdd(true)
    }

    const closeAddRecipe = () => {
        setShowAdd(false)
    }

    return (
        <>
            <div className={styles.recipesIndex}>
                <div  className={styles.recipesTop}>
                    <h2 className="pageTitle">Recipes</h2>
                    <div>
                        <button className={styles.recipesButton}>Search</button>
                        <button onClick={showAddRecipe} className={styles.recipesButton}>Add Recipe</button>
                    </div>
                </div>
                <div>
                    <h4>Total - 100</h4>
                </div>


                <div className={styles.recipesListHolder}>
                    <RecipesList />
                </div>

                
            </div>

            {
                showAdd && <AddRecipe closeAddRecipe={closeAddRecipe} />
            }
        </>
    )
}

export default RecipesIndex;


           
            
           
