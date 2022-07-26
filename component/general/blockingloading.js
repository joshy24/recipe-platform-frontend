import { TailSpin } from  'react-loader-spinner'

import styles from "../../styles/Loading.module.css"


const BlockingLoadingComponent  = ({visible}) => {

    return <>
        {
            visible && <div className={styles.blockingLoadingHolder}>
                <div className={`${styles.blockingLoadingInnerContent} whiteBox`}>
                    <TailSpin
                        height="50"
                        width="50"
                        color="#BD5BFC"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={visible}
                    />
                    <h5>Please Wait...</h5>
                </div>
            </div>
        }
    </>
}

export default BlockingLoadingComponent;