
import InventoryIndex from '../../component/inventory/index'

import withAuth from "../../utils/withAuth"

function Inventory() {

  return <div className="pageHolder">
      <InventoryIndex />
  </div>
}

export default withAuth(Inventory);