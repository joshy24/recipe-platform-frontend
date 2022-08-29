
import ProductIndex from '../../component/product/index'

import withAuth from "../../utils/withAuthRefactored"

export async function getServerSideProps(context) {
  const {
     id
  } = context.query;

  return {
      props: { id }
  }
}

function Product({id}) {
  return <div className="pageHolder">
      <ProductIndex id={id} />
  </div>
}

export default withAuth(Product);


