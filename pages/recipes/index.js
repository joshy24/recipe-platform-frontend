import RecipesIndex from '../../component/recipes/index'

import withAuth from "../../utils/withAuth"

function Recipes() {
  return <div className="pageHolder">
      <RecipesIndex />
  </div>
}

export default withAuth(Recipes);
