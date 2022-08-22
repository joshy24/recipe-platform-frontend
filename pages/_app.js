import '../styles/globals.css'
import LoadingComponent from "../component/general/loading"
import BlockingLoadingComponent from "../component/general/blockingloading"
import AppContext from "./AppContext";
import Message from "../component/general/message"
import { useState } from "react"

const MyApp = ({ Component, pageProps }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isBlockingLoading, setBlockingLoading] = useState(false)
    const [message, setMessage] = useState({visible: false, message: "", title: "", type: ""})

    return (
        <AppContext.Provider
          value={{
              state: {
                 isLoading: isLoading,
                 isBlockingLoading: isBlockingLoading
              },
              setLoading: setIsLoading,
              setBlockingLoading: setBlockingLoading,
              setMessage: setMessage
          }}
        >
          <Component {...pageProps} />
        {
            isLoading && <LoadingComponent visible={isLoading} />
        }

        {
            isBlockingLoading && <BlockingLoadingComponent visible={isBlockingLoading} />
        }

        {
            message.visible && <Message setMessage={setMessage} message={message} />
        }
      </AppContext.Provider>
    )
}

export default MyApp
