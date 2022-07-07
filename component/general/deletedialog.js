
import styles from "../../styles/Delete.module.css"

const DeleteDialog = ({title, message, type, onPerformDeleteClicked, onCancelDeleteClicked}) => {
    return <div className="popUp">
        <div className={`popUpInnerContent ${styles.deleteHolder}`}>

            <h4 className={styles.titleText}>
                {
                    title ? title : "Are You Sure?"
                }
            </h4>

            <h4 className={styles.messageText}>
                {
                    message ? message : `Confirm that you want to delete this ${type}`
                }
            </h4>

            <div className={`popButtonHolder ${styles.deleteButtonHolder}`}>
                <button className="colorBlack" onClick={onPerformDeleteClicked}>Delete</button>
                <button className="greyButton colorBlack" onClick={onCancelDeleteClicked}>Cancel</button>
            </div>
        </div>
    </div>
}

export default DeleteDialog;