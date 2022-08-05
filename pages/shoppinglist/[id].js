
import ShoppingListIndex from '../../component/order/shoppinglist'

import withAuth from "../../utils/withAuth"

export async function getServerSideProps(context) {
    const {
       id
    } = context.query;
  
    return {
        props: { id }
    }
}

function ShoppingList({id}) {
  return <div className="pageHolder">
      <ShoppingListIndex id={id} />
  </div>
}

export default withAuth(ShoppingList);
