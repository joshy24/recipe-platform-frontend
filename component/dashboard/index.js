import React from 'react'
import IngredientCount from './IngredientCount'
import RecentRecipe from './RecentRecipe'
import RecentRecipes from './RecentRecipes'
import RecipeNumbers from './RecipeNumbers'

function DashboardIndex() {

    return (
        <div>
            <IngredientCount />
            <RecentRecipe />
            <RecentRecipes />
            <RecipeNumbers />
        </div>
    )
}

export default DashboardIndex;
