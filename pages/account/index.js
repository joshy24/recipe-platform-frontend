
import AccountIndex from '../../component/account/index'

import withAuth from "../../utils/withAuthRefactored"

function Account() {

  return <div className="pageHolder">
      <AccountIndex />
  </div>
}

export default withAuth(Account);

/*
<MobileNav />
*/
