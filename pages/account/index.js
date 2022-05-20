
import AccountIndex from '../../component/account/index'

import withAuth from "../../utils/withAuth"

function Account() {

  return <div className="pageHolder">
      <AccountIndex />
  </div>
}

export default withAuth(Account);

/*
<MobileNav />
*/
