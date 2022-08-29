import RecipesIndex from '../../component/recipes/index'

import withAuth from "../../utils/withAuthRefactored"

function Recipes() {
  return <div className="pageHolder">
      <RecipesIndex />
  </div>
}

export default withAuth(Recipes);
