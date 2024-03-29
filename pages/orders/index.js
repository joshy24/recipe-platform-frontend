import OrdersIndex from '../../component/orders/index'

import withAuth from "../../utils/withAuthRefactored"

function Orders() {
  return <div className="pageHolder">
      <OrdersIndex />
  </div>
}

export default withAuth(Orders);
