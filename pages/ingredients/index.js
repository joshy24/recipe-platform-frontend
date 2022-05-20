
import IngredientsIndex from '../../component/ingredients/index'

import withAuth from "../../utils/withAuth"

function Ingredients() {

  return <div className="pageHolder">
      <IngredientsIndex />
  </div>
}

export default withAuth(Ingredients);