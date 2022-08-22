import ProfitableIndex from '../../component/profitable/index'

import withAuth from "../../utils/withAuthRefactored"

function Profitable() {
  return <div className="pageHolder">
      <ProfitableIndex />
  </div>
}

export default withAuth(Profitable);
