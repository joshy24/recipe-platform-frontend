import '../styles/globals.css'
import LoadingComponent from "../component/general/loading"
import BlockingLoadingComponent from "../component/general/blockingloading"
import AppContext from "./AppContext";
import { useState } from "react"

const MyApp = ({ Component, pageProps }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isBlockingLoading, setBlockingLoading] = useState(false)

    return <div>
        <AppContext.Provider
          value={{
              state: {
                 isLoading: isLoading,
                 isBlockingLoading: isBlockingLoading
              },
              setLoading: setIsLoading,
              setBlockingLoading: setBlockingLoading
          }}
        >
          <Component {...pageProps} />
      </AppContext.Provider>
      
      {
          isLoading && <LoadingComponent visible={isLoading} />
      }

      {
          isBlockingLoading && <BlockingLoadingComponent visible={isBlockingLoading} />
      }

    </div>
}

export default MyApp
