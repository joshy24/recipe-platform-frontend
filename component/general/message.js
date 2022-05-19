
import styles from "../styles/Home.module.css"

const Message = ({message, setMessage}) => {

    const getBackgroundColor = () => {
        switch(message.type){
            case "ERROR":
                return "#E41F26";
            break;
            case "INFO":
                return "#FFFFFF";
            break;
            case "SUCCESS":
                return "#33A454";
            break;
        }
    }

    const getTextColor = () => {
        switch(message.type){
            case "ERROR":
                return "#FFFFFF";
            break;
            case "INFO":
                return "#111111";
            break;
            case "SUCCESS":
                return "#FFFFFF";
            break;
        }
    }

    const hideMessage = () => {
        setMessage({message: "", title: "", type: "", visible: false})
    }

    return <div className={styles.messageTop}>
        <div className={styles.messageContent} style={{backgroundColor: getBackgroundColor()}}>
            <h3 style={{color: getTextColor()}}>
                { (message.title && message.title.length) > 0 ? message.title : "Message"}
            </h3>

            <h5 style={{color: getTextColor()}}>
                {message.message}
            </h5>

            <button onClick={hideMessage} className={styles.greyButton}>
                Ok
            </button>

        </div>
    </div>

}

export default Message;