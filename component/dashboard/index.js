import React from 'react'
import IngredientCount from './IngredientCount'
import RecentRecipes from './RecentRecipes'
import RecipeNumbers from './RecipeNumbers'

import styles from "../../styles/Dashboard.module.css"

function DashboardIndex() {

    return (
        <div className={styles.dashboardIndex}>
            <div>
                <h2 className="pageTitle">Dashboard</h2>
            </div>
            <div className={styles.recipesIngredientsCountHolder}>
                <RecipeNumbers />
                <IngredientCount />    
            </div>
             
            <div className={styles.recentRecipesHolder}>
                <RecentRecipes />
            </div>
             
        </div>
    )
}

export default DashboardIndex;


           
            
           