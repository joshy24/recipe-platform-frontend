import DashboardIndex from '../../component/dashboard/index'

import withAuth from "../../utils/withAuthRefactored"

function Dashboard() {

  return <div className="pageHolder">
      <DashboardIndex />
  </div>
}

export default withAuth(Dashboard);