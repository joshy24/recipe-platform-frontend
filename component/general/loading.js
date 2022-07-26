import { TailSpin } from  'react-loader-spinner'

import styles from "../../styles/Loading.module.css"


const LoadingComponent  = ({visible}) => {

    return <>
        {
            visible && <div className={styles.loadingHolder}>
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
                
            </div>
        }
    </>
}

export default LoadingComponent;