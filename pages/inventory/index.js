
import InventoryIndex from '../../component/inventory/index'

import withAuth from "../../utils/withAuthRefactored"

function Inventory() {

  return <div className="pageHolder">
      <InventoryIndex />
  </div>
}

export default withAuth(Inventory);