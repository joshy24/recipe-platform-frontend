import GeneralUI from '../component/general/generalUI';
import '../styles/globals.css'
import AppProvider from "./AppContext";

const MyApp = ({ Component, pageProps }) => {
    return (
        <AppProvider>
            <Component {...pageProps} />
            <GeneralUI />
        </AppProvider>
    )
}

export default MyApp
