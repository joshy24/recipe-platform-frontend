
import RecipeIndex from '../../component/recipe/index'

import withAuth from "../../utils/withAuth"

export async function getServerSideProps(context) {
  const {
     id
  } = context.query;

  return {
      props: { id }
  }
}

function Recipe({id}) {
  
  return <div className="pageHolder">
      <RecipeIndex id={id} />
  </div>
}

export default withAuth(Recipe);
