import SettingsIndex from '../../component/settings/index'

import styles from "../../styles/Settings.module.css"

import withAuth from "../../utils/withAuth"

function Settings() {

  return <div className={`pageHolder ${styles.settingsPageHolder}`}>
      <SettingsIndex />
  </div>
}

export default withAuth(Settings);