
import OrderIndex from '../../component/order/index'

import withAuth from "../../utils/withAuth"

export async function getServerSideProps(context) {
  const {
     id
  } = context.query;

  return {
      props: { id }
  }
}

function Order({id}) {
  return <div className="pageHolder">
      <OrderIndex id={id} />
  </div>
}

export default withAuth(Order);


