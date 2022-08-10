import styles from "../../styles/Message.module.css"

const MessageDialog = ({title, message, onPerformClicked, onCancelClicked}) => {
    return <div className="popUp">
        <div className={`popUpInnerContent ${styles.messageHolder}`}>
            <h4 className={styles.titleText}>
                {
                    title ? title : "Confirmation"
                }
            </h4>
            <h4 className={styles.messageText}>
                {
                    message
                }
            </h4>
            <div className={`popButtonHolder ${styles.messageButtonHolder}`}>
                <button className="rectangleButtonPrimary" onClick={onPerformClicked}>Ok</button>
                <button className="rectangleButtonGrey" onClick={onCancelClicked}>Cancel</button>
            </div>
        </div>
    </div>
}

export default MessageDialog;