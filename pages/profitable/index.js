import ProfitableIndex from '../../component/profitable/index'

import withAuth from "../../utils/withAuth"

function Profitable() {
  return <div className="pageHolder">
      <ProfitableIndex />
  </div>
}

export default withAuth(Profitable);
