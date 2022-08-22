import ProductsIndex from '../../component/products/index'

import withAuth from "../../utils/withAuthRefactored"

function Products() {
  return <div className="pageHolder">
      <ProductsIndex />
  </div>
}

export default withAuth(Products);
