import SettingsIndex from '../../component/settings/index'

import styles from "../../styles/Settings.module.css"

function Settings() {

  return <div className={`pageHolder ${styles.settingsPageHolder}`}>
      <SettingsIndex />
  </div>
}

export default Settings;