
import RecipeIndex from '../../component/recipe/index'

import withAuth from "../../utils/withAuth"

function Recipe() {
  return <div className="pageHolder">
      <RecipeIndex />
  </div>
}

export default withAuth(Recipe);
