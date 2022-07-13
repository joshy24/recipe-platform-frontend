
import ProductIndex from '../../component/product/index'

import withAuth from "../../utils/withAuth"

function Product() {
  return <div className="pageHolder">
      <ProductIndex />
  </div>
}

export default withAuth(Product);


