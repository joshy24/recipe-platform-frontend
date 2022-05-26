
import OrderIndex from '../../component/order/index'

import withAuth from "../../utils/withAuth"

function Order() {
  return <div className="pageHolder">
      <OrderIndex />
  </div>
}

export default withAuth(Order);
